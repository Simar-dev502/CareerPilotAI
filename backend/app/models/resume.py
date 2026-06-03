from pydantic import BaseModel
from typing import List, Optional, Dict

class ResumeAnalysisResponse(BaseModel):
    ats_score: int
    missing_skills: List[str]
    suggestions: List[str]
    weak_sections: List[str]
    strengths: List[str]
    keywords_found: Dict[str, int]
    summary: str
    text_snippet: str

class ResumeAnalyzePayload(BaseModel):
    role: Optional[str] = None
    skills: Optional[List[str]] = []
