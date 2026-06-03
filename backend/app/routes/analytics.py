from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.crud.analytics import get_activity_history, get_activity_summary
from app.models.analytics import AnalyticsResponse
from app.models.user import UserInDB

router = APIRouter()


@router.get("/", response_model=AnalyticsResponse)
async def analytics_overview(current_user: UserInDB = Depends(get_current_user)):
    summary = await get_activity_summary(current_user.email)
    history = await get_activity_history(current_user.email, limit=20)
    return {"summary": summary, "history": history}
