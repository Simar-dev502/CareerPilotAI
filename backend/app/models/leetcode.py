from pydantic import BaseModel

class LeetCodeRequest(BaseModel):
    username: str

class LeetCodeStatsResponse(BaseModel):
    username: str
    solved: int
    easy: int
    medium: int
    hard: int
    rating: int
    streak: int
    topic_progress: dict
