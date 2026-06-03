from pydantic import BaseModel
from typing import List

class GitHubRequest(BaseModel):
    username: str

class GitHubRepoSummary(BaseModel):
    name: str
    language: str
    stars: int
    url: str

class GitHubReportResponse(BaseModel):
    username: str
    developer_score: int
    top_languages: List[str]
    total_repos: int
    total_stars: int
    suggestions: List[str]
    repos: List[GitHubRepoSummary]
