"""Project dashboard and workspace schemas."""

from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

from .base_schemas import ORMModel


class ProjectSummary(ORMModel):
    """Project summary information."""
    id: int
    route_id: str
    name: str
    description: str
    status: str
    sources: List[str] = Field(default_factory=list)
    last_activity_at: Optional[datetime] = None
    last_activity_label: Optional[str] = None


class ProjectDetail(ProjectSummary):
    """Project details with additional fields."""
    owner_id: int
    is_archived: bool


class ProjectListResponse(BaseModel):
    """List of projects response."""
    projects: List[ProjectSummary]


class ProjectDetailResponse(BaseModel):
    """Single project detail response."""
    project: ProjectDetail


class SourceOption(BaseModel):
    """Source option with description."""
    name: str
    description: str


class SourceListResponse(BaseModel):
    """List of available sources."""
    sources: List[SourceOption]
