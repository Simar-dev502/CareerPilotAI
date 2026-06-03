from fastapi import APIRouter, Depends, HTTPException
from app.models.linkedin import LinkedInRequest, LinkedInReportResponse
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.models.user import UserInDB
from app.services.linkedin_service import analyze_linkedin_profile

router = APIRouter()


@router.post("/analyze", response_model=LinkedInReportResponse)
async def linkedin_analyze(request: LinkedInRequest, current_user: UserInDB = Depends(get_current_user)):
    report = analyze_linkedin_profile(request.profile_url)
    if not report:
        raise HTTPException(status_code=500, detail="Unable to analyze LinkedIn profile at this time")
    await log_activity(current_user.email, "linkedin_analyzed", {"profile_url": request.profile_url})
    return report
