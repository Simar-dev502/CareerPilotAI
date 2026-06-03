from fastapi import APIRouter, Depends
from app.models.jobs import JobRecommendationRequest, JobRecommendationsResponse
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.models.user import UserInDB
from app.services.jobs_service import recommend_jobs

router = APIRouter()


@router.post("/recommend", response_model=JobRecommendationsResponse)
async def recommend_jobs_endpoint(request: JobRecommendationRequest, current_user: UserInDB = Depends(get_current_user)):
    job_data = recommend_jobs(request.resume_text, request.skills, request.experience_years)
    await log_activity(current_user.email, "job_recommendations", {"experience_years": request.experience_years})
    return {"recommendations": job_data}
