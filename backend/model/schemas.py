"""Pydantic schemas for API payloads and responses."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


# ============================================================================
# Base Configuration
# ============================================================================

class ORMModel(BaseModel):
    """Base model for ORM-enabled schemas."""
    model_config = ConfigDict(from_attributes=True)


class EmailNormalizationMixin:
    """Mixin for email normalization validation."""
    @staticmethod
    def _normalize_email(value: str) -> str:
        """Normalize email to lowercase and strip whitespace."""
        return value.strip().lower() if value else value


# ============================================================================
# System & Health Schemas
# ============================================================================

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


# ============================================================================
# Authentication Schemas
# ============================================================================

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


# ============================================================================
# Query & Execution Schemas
# ============================================================================

class QueryRequest(BaseModel):
    """Query request schema."""
    session_id: str = Field(min_length=3, max_length=120)
    query: str = Field(min_length=1, max_length=2000)
    project_id: Optional[str] = Field(default=None, max_length=120)
    sources: List[str] = Field(default_factory=lambda: ["SQL", "RAG", "INSIGHT"])

    @field_validator("query", mode="before")
    @classmethod
    def normalize_query(cls, value: str) -> str:
        return value.strip() if value else value

    @field_validator("sources", mode="before")
    @classmethod
    def normalize_sources(cls, value: List[str]) -> List[str]:
        return [item.strip().upper() for item in value if item and isinstance(item, str) and item.strip()]


class ToolTrace(BaseModel):
    """Execution trace for a tool."""
    tool: str
    observation: str
    metadata: Dict[str, Any] = Field(default_factory=dict)


class QueryResponse(BaseModel):
    """Query response with answer and trace."""
    answer: str
    execution_trace: List[ToolTrace] = Field(default_factory=list)
    chart_url: Optional[str] = None
    confidence: float = 0.0
    status: str = "complete"
    session_id: str
    project_id: Optional[str] = None
    query_log_id: Optional[int] = None


# ============================================================================
# Project Schemas
# ============================================================================

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


# ============================================================================
# History & Analytics Schemas
# ============================================================================

class HistoryItem(ORMModel):
    """Single history item."""
    id: int
    query: str
    answer: str
    date: str
    time: str
    project: Optional[str] = None
    type: str = "Hybrid"
    status: str
    latency_ms: Optional[int] = None


class HistoryResponse(BaseModel):
    """History items response with pagination."""
    items: List[HistoryItem]
    page: int
    page_size: int
    total: int


class MetricCard(BaseModel):
    """Single metric card."""
    key: str
    label: str
    value: Any
    delta: Optional[str] = None
    unit: Optional[str] = None


class SourceMixItem(BaseModel):
    """Source mix data point."""
    name: str
    value: float


class TimeSeriesPoint(BaseModel):
    """Single time series data point."""
    label: str
    value: float
    timestamp: Optional[datetime] = None


class AnalyticsTelemetry(BaseModel):
    """Complete analytics telemetry."""
    cards: List[MetricCard]
    source_mix: List[SourceMixItem]
    series: Dict[str, List[TimeSeriesPoint]]
    status_breakdown: Dict[str, int]
    generated_at: datetime


class AnalyticsSeriesResponse(BaseModel):
    """Analytics series response."""
    series_name: str
    points: List[TimeSeriesPoint]


# ============================================================================
# Alert Rule Schemas with Consolidated Validation
# ============================================================================

class OperatorValidationMixin:
    """Mixin for operator validation."""
    VALID_OPERATORS = {"<", ">", "=", "<=", ">="}
    
    @staticmethod
    def _validate_operator(value: Optional[str]) -> Optional[str]:
        """Validate and normalize operator."""
        if value is None:
            return value
        normalized = value.strip()
        if normalized not in OperatorValidationMixin.VALID_OPERATORS:
            raise ValueError(f"operator must be one of {', '.join(OperatorValidationMixin.VALID_OPERATORS)}")
        return normalized


class AlertRuleCreate(BaseModel):
    """Create alert rule request."""
    metric: str = Field(min_length=1, max_length=120)
    operator: str = Field(min_length=1, max_length=10)
    threshold: float
    notification_type: str = Field(default="email", max_length=50)
    quiet_hours_start: Optional[str] = Field(default=None, max_length=5)
    quiet_hours_end: Optional[str] = Field(default=None, max_length=5)
    is_active: bool = True
    project_id: Optional[int] = None

    @field_validator("operator", mode="before")
    @classmethod
    def validate_operator(cls, value: str) -> str:
        return OperatorValidationMixin._validate_operator(value)


class AlertRuleUpdate(BaseModel):
    """Update alert rule request."""
    metric: Optional[str] = Field(default=None, max_length=120)
    operator: Optional[str] = Field(default=None, max_length=10)
    threshold: Optional[float] = None
    notification_type: Optional[str] = Field(default=None, max_length=50)
    quiet_hours_start: Optional[str] = Field(default=None, max_length=5)
    quiet_hours_end: Optional[str] = Field(default=None, max_length=5)
    is_active: Optional[bool] = None
    project_id: Optional[int] = None

    @field_validator("operator", mode="before")
    @classmethod
    def validate_operator(cls, value: Optional[str]) -> Optional[str]:
        return OperatorValidationMixin._validate_operator(value)


class AlertRuleRead(ORMModel):
    """Alert rule read model."""
    id: int
    user_id: int
    project_id: Optional[int] = None
    metric: str
    operator: str
    threshold: float
    notification_type: str
    quiet_hours_start: Optional[str]
    quiet_hours_end: Optional[str]
    is_active: bool
    last_triggered_at: Optional[datetime] = None
    last_triggered_value: Optional[float] = None
    created_at: datetime
    updated_at: datetime


# ============================================================================
# Notification Schemas
# ============================================================================

class NotificationLogRead(ORMModel):
    """Notification log read model."""
    id: int
    rule_id: int
    user_id: int
    project_id: Optional[int] = None
    triggered_value: float
    status: str
    channel: str
    message: str
    is_read: bool
    read_at: Optional[datetime] = None
    created_at: datetime


class NotificationRulesResponse(BaseModel):
    """Notification rules response."""
    rules: List[AlertRuleRead]
    total: int


class NotificationLogsResponse(BaseModel):
    """Notification logs response."""
    logs: List[NotificationLogRead]
    total: int


class NotificationUnreadResponse(BaseModel):
    """Unread notifications count."""
    unread_count: int
