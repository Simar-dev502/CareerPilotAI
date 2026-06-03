from pydantic import BaseModel
from typing import Optional

class CoverLetterRequest(BaseModel):
    company_name: str
    role: str
    resume_text: Optional[str] = None

class CoverLetterResponse(BaseModel):
    cover_letter: str
