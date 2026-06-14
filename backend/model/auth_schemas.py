"""Authentication schemas."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator

from .base_schemas import ORMModel, EmailNormalizationMixin


class UserRead(ORMModel):
    """User information read model."""
    id: int
    name: str
    email: str
    role: str
    is_active: bool
    created_at: datetime


class SignupRequest(BaseModel):
    """User signup request."""
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=8, max_length=255)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return EmailNormalizationMixin._normalize_email(value)


class LoginRequest(BaseModel):
    """User login request."""
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=8, max_length=255)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return EmailNormalizationMixin._normalize_email(value)


class AuthResponse(BaseModel):
    """Authentication response with token and user info."""
    access_token: str
    token_type: str = "bearer"
    user: UserRead


class CurrentUserResponse(BaseModel):
    """Current user response."""
    user: UserRead
