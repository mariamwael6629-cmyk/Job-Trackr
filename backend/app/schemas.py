from datetime import date, datetime
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator

ApplicationStatus = Literal["applied", "reviewing", "interview", "rejected", "offer", "hired"]
WorkType = Literal["remote", "hybrid", "onsite"]


# ---- Auth ----

class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    location: str = Field(default="", max_length=120)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    location: str
    plan: str
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ---- Applications ----

class ApplicationBase(BaseModel):
    company: str = Field(min_length=1, max_length=120)
    role: str = Field(min_length=1, max_length=160)
    status: ApplicationStatus = "applied"
    type: WorkType = "remote"
    location: str = Field(default="Not specified", max_length=160)
    sal_min: int = Field(default=0, ge=0)
    sal_max: int = Field(default=0, ge=0)
    notes: str = ""
    url: str = ""

    @field_validator("sal_max")
    @classmethod
    def max_not_below_min(cls, v, info):
        sal_min = info.data.get("sal_min", 0)
        if v and sal_min and v < sal_min:
            raise ValueError("sal_max must be greater than or equal to sal_min")
        return v


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(BaseModel):
    company: Optional[str] = Field(default=None, min_length=1, max_length=120)
    role: Optional[str] = Field(default=None, min_length=1, max_length=160)
    status: Optional[ApplicationStatus] = None
    type: Optional[WorkType] = None
    location: Optional[str] = Field(default=None, max_length=160)
    sal_min: Optional[int] = Field(default=None, ge=0)
    sal_max: Optional[int] = Field(default=None, ge=0)
    notes: Optional[str] = None
    url: Optional[str] = None


class ApplicationOut(BaseModel):
    id: int
    company: str
    role: str
    status: ApplicationStatus
    type: WorkType
    location: str
    sal_min: int
    sal_max: int
    applied_date: date
    notes: str
    url: str

    class Config:
        from_attributes = True


# ---- AI ----

AIToolType = Literal["resume", "match", "cover", "interview", "keywords", "salary"]


class AIRunResponse(BaseModel):
    type: AIToolType
    title: str
    text: str
    source: Literal["claude", "fallback"]
