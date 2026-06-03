from datetime import datetime
from pydantic import BaseModel
from typing import Any, Dict, List, Optional


class ActivityHistoryItem(BaseModel):
    action: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime


class AnalyticsSummaryItem(BaseModel):
    action: str
    count: int


class AnalyticsResponse(BaseModel):
    summary: List[AnalyticsSummaryItem]
    history: List[ActivityHistoryItem]
