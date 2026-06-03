from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.services.firebase_storage import upload_resume_file
from app.models.user import UserInDB

router = APIRouter()


@router.post("/resume")
async def upload_resume(file: UploadFile = File(...), current_user: UserInDB = Depends(get_current_user)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    url = upload_resume_file(file, current_user.email)
    await log_activity(current_user.email, "resume_uploaded", {"filename": file.filename})
    return {"url": url, "filename": file.filename}
