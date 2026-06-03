from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConfigurationError
from app.core.config import settings

client = None
db = None

def init_db():
    global client, db
    mongo_uri = settings.MONGODB_URI or "mongodb://127.0.0.1:27017/careerpilot"
    client = AsyncIOMotorClient(mongo_uri)
    try:
        db = client.get_default_database()
    except ConfigurationError:
        db = client["careerpilot"]
    return db
