from typing import Optional
from app.db.mongodb import db

from app.models.user import UserCreate, UserInDB

USER_COLLECTION = "users"


def _prepare_user_doc(user_doc: dict) -> dict:
    if not user_doc:
        return user_doc
    user_doc["_id"] = str(user_doc["_id"])
    return user_doc


async def get_user_by_email(email: str) -> Optional[UserInDB]:
    if db is None:
        return None
    user_doc = await db[USER_COLLECTION].find_one({"email": email})
    if not user_doc:
        return None
    return UserInDB(**_prepare_user_doc(user_doc))


async def create_user(user: UserCreate, hashed_password: str) -> UserInDB:
    user_doc = user.dict()
    user_doc["hashed_password"] = hashed_password
    user_doc.pop("password", None)
    result = await db[USER_COLLECTION].insert_one(user_doc)
    user_doc["_id"] = str(result.inserted_id)
    return UserInDB(**user_doc)


async def create_or_update_google_user(email: str, full_name: str, picture: str = "") -> UserInDB:
    existing = await get_user_by_email(email)
    if existing:
        update_data = {"full_name": full_name, "picture": picture}
        await db[USER_COLLECTION].update_one({"email": email}, {"$set": update_data})
        updated = await db[USER_COLLECTION].find_one({"email": email})
        return UserInDB(**_prepare_user_doc(updated))

    user_doc = {
        "email": email,
        "full_name": full_name,
        "picture": picture,
        "hashed_password": "",
        "provider": "google",
    }
    result = await db[USER_COLLECTION].insert_one(user_doc)
    user_doc["_id"] = str(result.inserted_id)
    return UserInDB(**user_doc)
