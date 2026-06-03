from pydantic import BaseModel
from typing import List

class JobRecommendationRequest(BaseModel):
    resume_text: str
    skills: List[str]
    experience_years: int

class JobRecommendation(BaseModel):
    title: str
    company: str
    match_score: int
    required_skills: List[str]
    missing_skills: List[str]

class JobRecommendationsResponse(BaseModel):
    recommendations: List[JobRecommendation]
