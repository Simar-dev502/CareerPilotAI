from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleLogin(BaseModel):
    id_token: str

class UserInDB(BaseModel):
    id: str = Field(..., alias="_id")
    email: EmailStr
    full_name: Optional[str] = None
    hashed_password: Optional[str] = None
    provider: Optional[str] = "local"
    picture: Optional[str] = None

    class Config:
        allow_population_by_field_name = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
