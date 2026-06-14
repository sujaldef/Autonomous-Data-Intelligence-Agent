"""System and health schemas."""

from __future__ import annotations

from typing import Optional
from pydantic import BaseModel


class AppInfo(BaseModel):
    """Application information."""
    name: str
    version: str
    status: str


class SystemHealthResponse(BaseModel):
    """System health check response."""
    status: str
    database: str
    scheduler: str
    agent: str
    vector_store: str


class ReadinessResponse(BaseModel):
    """Readiness check response."""
    ready: bool
    database: str
    scheduler: str
    message: str


class GenericErrorResponse(BaseModel):
    """Generic error response."""
    detail: str
    error_code: Optional[str] = None
