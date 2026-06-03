from fastapi import APIRouter, HTTPException
from fastapi import status
import requests

from app.models.user import UserCreate, UserLogin, GoogleLogin, Token
from app.core.security import get_password_hash, verify_password, create_access_token
from app.crud.users import get_user_by_email, create_user, create_or_update_google_user
from app.core.config import settings

router = APIRouter()


@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    existing = await get_user_by_email(user.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    created = await create_user(user, hashed_password)
    access_token = create_access_token(subject=created.email)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    user = await get_user_by_email(credentials.email)
    if not user or not user.hashed_password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(subject=user.email)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/google", response_model=Token)
async def google_login(payload: GoogleLogin):
    token_info_url = f"https://oauth2.googleapis.com/tokeninfo?id_token={payload.id_token}"
    resp = requests.get(token_info_url)
    if resp.status_code != 200:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Google token")

    profile = resp.json()
    if profile.get("aud") != settings.GOOGLE_OAUTH_CLIENT_ID:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Google client ID")

    email = profile.get("email")
    full_name = profile.get("name") or ""
    picture = profile.get("picture") or ""
    user = await create_or_update_google_user(email=email, full_name=full_name, picture=picture)
    access_token = create_access_token(subject=user.email)
    return {"access_token": access_token, "token_type": "bearer"}
