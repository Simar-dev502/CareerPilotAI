from typing import Any, Dict, List, Optional
from datetime import datetime

from app.db.mongodb import db

ANALYTICS_COLLECTION = "analytics"


def _prepare_activity_doc(activity_doc: dict) -> dict:
    if not activity_doc:
        return activity_doc
    activity_doc["_id"] = str(activity_doc["_id"])
    return activity_doc


async def log_activity(email: str, action: str, details: Optional[Dict[str, Any]] = None):
    if db is None:
        return
    await db[ANALYTICS_COLLECTION].insert_one(
        {
            "email": email,
            "action": action,
            "details": details or {},
            "timestamp": datetime.utcnow(),
        }
    )


async def get_activity_summary(email: str) -> List[Dict[str, Any]]:
    if db is None:
        return []

    pipeline = [
        {"$match": {"email": email}},
        {"$group": {"_id": "$action", "count": {"$sum": 1}}},
        {"$project": {"action": "$_id", "count": 1, "_id": 0}},
        {"$sort": {"count": -1}},
    ]
    cursor = db[ANALYTICS_COLLECTION].aggregate(pipeline)
    return [doc async for doc in cursor]


async def get_activity_history(email: str, limit: int = 20) -> List[Dict[str, Any]]:
    if db is None:
        return []

    cursor = db[ANALYTICS_COLLECTION].find({"email": email}).sort("timestamp", -1).limit(limit)
    return [ _prepare_activity_doc(doc) async for doc in cursor ]
