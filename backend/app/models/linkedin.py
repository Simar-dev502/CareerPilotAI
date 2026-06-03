from pydantic import BaseModel
from typing import List, Optional

class LinkedInRequest(BaseModel):
    profile_url: str

class LinkedInReportResponse(BaseModel):
    headline: Optional[str]
    summary: Optional[str]
    skills: List[str]
    activity_insights: List[str]
    suggestions: List[str]
