from pydantic import BaseModel
from typing import List, Optional

class InterviewRequest(BaseModel):
    role: str
    experience_level: str
    skills: List[str]

class InterviewQuestion(BaseModel):
    category: str
    question: str

class InterviewQuestionsResponse(BaseModel):
    questions: List[InterviewQuestion]

class InterviewEvaluationRequest(BaseModel):
    question: str
    answer: str

class InterviewEvaluationResponse(BaseModel):
    communication_score: int
    confidence_score: int
    technical_accuracy: int
    improvement_suggestions: List[str]
