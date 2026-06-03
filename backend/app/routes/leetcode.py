from fastapi import APIRouter, Depends, HTTPException
from app.models.leetcode import LeetCodeRequest, LeetCodeStatsResponse
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.models.user import UserInDB
from app.services.leetcode_service import fetch_leetcode_stats

router = APIRouter()


@router.post("/stats", response_model=LeetCodeStatsResponse)
async def leetcode_stats(request: LeetCodeRequest, current_user: UserInDB = Depends(get_current_user)):
    stats = fetch_leetcode_stats(request.username)
    if not stats:
        raise HTTPException(status_code=404, detail="Unable to retrieve LeetCode stats")
    await log_activity(current_user.email, "leetcode_stats", {"username": request.username})
    return stats
