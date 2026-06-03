from pydantic import BaseModel
from typing import List

class RoadmapRequest(BaseModel):
    career_goal: str

class RoadmapItem(BaseModel):
    week: int
    focus: str
    resources: List[str]
    milestone: str

class RoadmapResponse(BaseModel):
    career_goal: str
    plan: List[RoadmapItem]
