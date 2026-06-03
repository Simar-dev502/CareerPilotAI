from fastapi import APIRouter, Depends
from app.models.cover_letter import CoverLetterRequest, CoverLetterResponse
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.models.user import UserInDB
from app.services.cover_letter_service import generate_cover_letter

router = APIRouter()


@router.post("/generate", response_model=CoverLetterResponse)
async def generate_cover_letter_endpoint(request: CoverLetterRequest, current_user: UserInDB = Depends(get_current_user)):
    cover_letter = generate_cover_letter(request.company_name, request.role, request.resume_text or "")
    await log_activity(current_user.email, "cover_letter_generated", {"company": request.company_name, "role": request.role})
    return {"cover_letter": cover_letter}
