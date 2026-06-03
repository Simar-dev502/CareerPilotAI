from fastapi import APIRouter, UploadFile, File, HTTPException, Form, Depends
from typing import Optional
import io

from app.services.resume_analyzer import extract_resume_text, analyze_resume_text
from app.models.resume import ResumeAnalysisResponse
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.models.user import UserInDB

router = APIRouter()


@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(
    file: UploadFile = File(...),
    role: Optional[str] = Form(None),
    skills: Optional[str] = Form(None),
    current_user: UserInDB = Depends(get_current_user),
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    contents = await file.read()
    file_stream = io.BytesIO(contents)
    text = ""
    try:
        text = extract_resume_text(file_stream)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to parse resume PDF: {exc}")

    parsed_skills = [item.strip() for item in skills.split(",")] if skills else []
    ats_score, missing_skills, suggestions, weak_sections, strengths, keywords_found, summary = analyze_resume_text(
        text=text, role=role or "", skills=parsed_skills
    )

    await log_activity(
        current_user.email,
        "resume_analyzed",
        {"role": role or "", "skill_count": len(parsed_skills)},
    )

    return ResumeAnalysisResponse(
        ats_score=ats_score,
        missing_skills=missing_skills,
        suggestions=suggestions,
        weak_sections=weak_sections,
        strengths=strengths,
        keywords_found=keywords_found,
        summary=summary,
        text_snippet=text[:500],
    )
