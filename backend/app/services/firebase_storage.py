import json
import firebase_admin
from firebase_admin import credentials, storage
from app.core.config import settings
from fastapi import UploadFile

_app = None


def init_firebase():
    global _app
    if _app is not None:
        return _app
    if not settings.FIREBASE_STORAGE_BUCKET:
        raise RuntimeError("Firebase storage bucket is missing")

    if settings.FIREBASE_CREDENTIALS_JSON:
        try:
            credentials_data = json.loads(settings.FIREBASE_CREDENTIALS_JSON)
        except json.JSONDecodeError as exc:
            raise RuntimeError("Invalid FIREBASE_CREDENTIALS_JSON") from exc
        cred = credentials.Certificate(credentials_data)
    elif settings.FIREBASE_CREDENTIALS_PATH:
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
    else:
        raise RuntimeError("Firebase credentials are missing")

    _app = firebase_admin.initialize_app(cred, {"storageBucket": settings.FIREBASE_STORAGE_BUCKET})
    return _app


def upload_resume_file(file: UploadFile, user_email: str) -> str:
    init_firebase()
    bucket = storage.bucket()
    destination = f"resumes/{user_email}/{file.filename}"
    blob = bucket.blob(destination)
    contents = file.file.read()
    blob.upload_from_string(contents, content_type=file.content_type)
    blob.make_public()
    return blob.public_url
