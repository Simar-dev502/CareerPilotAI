from fastapi import APIRouter, Depends
from app.models.interview import InterviewRequest, InterviewQuestionsResponse, InterviewEvaluationRequest, InterviewEvaluationResponse
from app.core.security import get_current_user
from app.crud.analytics import log_activity
from app.models.user import UserInDB
from app.services.interview_service import generate_interview_questions, evaluate_interview_answer

router = APIRouter()


@router.post("/questions", response_model=InterviewQuestionsResponse)
async def interview_questions(request: InterviewRequest, current_user: UserInDB = Depends(get_current_user)):
    questions = generate_interview_questions(request.role, request.experience_level, request.skills)
    await log_activity(current_user.email, "interview_questions", {"role": request.role})
    return {"questions": questions}


@router.post("/evaluate", response_model=InterviewEvaluationResponse)
async def interview_evaluate(request: InterviewEvaluationRequest, current_user: UserInDB = Depends(get_current_user)):
    result = evaluate_interview_answer(request.question, request.answer)
    await log_activity(current_user.email, "interview_evaluated", {"question": request.question})
    return {
        "communication_score": int(result.get("communication_score", 75)),
        "confidence_score": int(result.get("confidence_score", 75)),
        "technical_accuracy": int(result.get("technical_accuracy", 75)),
        "improvement_suggestions": result.get("improvement_suggestions", ["Try to include more specific technical examples."]),
    }
