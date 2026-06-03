from fastapi import APIRouter, Depends
from app.models.roadmap import RoadmapRequest, RoadmapResponse
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.models.user import UserInDB
from app.services.roadmap_service import generate_learning_roadmap

router = APIRouter()


@router.post("/generate", response_model=RoadmapResponse)
async def generate_roadmap(request: RoadmapRequest, current_user: UserInDB = Depends(get_current_user)):
    ai_data = generate_learning_roadmap(request.career_goal)
    if isinstance(ai_data, dict) and 'plan' in ai_data:
        plan = ai_data['plan']
    else:
        plan = [
            {"week": 1, "focus": "Core concepts", "resources": ["Official docs"], "milestone": "Foundation established"},
            {"week": 2, "focus": "Hands-on projects", "resources": ["Project tutorials"], "milestone": "Portfolio work started"},
        ]
    await log_activity(current_user.email, "roadmap_generated", {"career_goal": request.career_goal})
    return {"career_goal": request.career_goal, "plan": plan}
