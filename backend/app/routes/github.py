from fastapi import APIRouter, Depends, HTTPException
from app.models.github import GitHubRequest, GitHubReportResponse
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.models.user import UserInDB
from app.services.github_service import analyze_github_username

router = APIRouter()


@router.post("/analyze", response_model=GitHubReportResponse)
async def github_analyze(request: GitHubRequest, current_user: UserInDB = Depends(get_current_user)):
    report = analyze_github_username(request.username)
    if not report:
        raise HTTPException(status_code=404, detail="GitHub user not found or API error")
    await log_activity(current_user.email, "github_analyzed", {"username": request.username})
    return report
