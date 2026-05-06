"""Pydantic schemas for API payloads and responses."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


class AppInfo(BaseModel):
    name: str
    version: str
    status: str


class SystemHealthResponse(BaseModel):
    status: str
    database: str
    scheduler: str
    agent: str
    vector_store: str


class ReadinessResponse(BaseModel):
    ready: bool
    database: str
    scheduler: str
    message: str


class GenericErrorResponse(BaseModel):
    detail: str
    error_code: Optional[str] = None


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    role: str
    is_active: bool
    created_at: datetime


class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=8, max_length=255)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class LoginRequest(BaseModel):
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=8, max_length=255)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead


class CurrentUserResponse(BaseModel):
    user: UserRead


class QueryRequest(BaseModel):
    session_id: str = Field(min_length=3, max_length=120)
    query: str = Field(min_length=1, max_length=2000)
    project_id: Optional[str] = Field(default=None, max_length=120)
    sources: List[str] = Field(default_factory=lambda: ["SQL", "RAG", "INSIGHT"])

    @field_validator("query")
    @classmethod
    def normalize_query(cls, value: str) -> str:
        return value.strip()

    @field_validator("sources")
    @classmethod
    def normalize_sources(cls, value: List[str]) -> List[str]:
        return [item.strip().upper() for item in value if item and item.strip()]


class ToolTrace(BaseModel):
    tool: str
    observation: str
    metadata: Dict[str, Any] = Field(default_factory=dict)


class QueryResponse(BaseModel):
    answer: str
    execution_trace: List[ToolTrace] = Field(default_factory=list)
    chart_url: Optional[str] = None
    confidence: float = 0.0
    status: str = "complete"
    session_id: str
    project_id: Optional[str] = None
    query_log_id: Optional[int] = None


class ProjectSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    route_id: str
    name: str
    description: str
    status: str
    sources: List[str] = Field(default_factory=list)
    last_activity_at: Optional[datetime] = None
    last_activity_label: Optional[str] = None


class ProjectDetail(ProjectSummary):
    owner_id: int
    is_archived: bool


class ProjectListResponse(BaseModel):
    projects: List[ProjectSummary]


class ProjectDetailResponse(BaseModel):
    project: ProjectDetail


class SourceOption(BaseModel):
    name: str
    description: str


class SourceListResponse(BaseModel):
    sources: List[SourceOption]


class HistoryItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

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
    items: List[HistoryItem]
    page: int
    page_size: int
    total: int


class MetricCard(BaseModel):
    key: str
    label: str
    value: Any
    delta: Optional[str] = None
    unit: Optional[str] = None


class SourceMixItem(BaseModel):
    name: str
    value: float


class TimeSeriesPoint(BaseModel):
    label: str
    value: float
    timestamp: Optional[datetime] = None


class AnalyticsTelemetry(BaseModel):
    cards: List[MetricCard]
    source_mix: List[SourceMixItem]
    series: Dict[str, List[TimeSeriesPoint]]
    status_breakdown: Dict[str, int]
    generated_at: datetime


class AnalyticsSeriesResponse(BaseModel):
    series_name: str
    points: List[TimeSeriesPoint]


class AlertRuleCreate(BaseModel):
    metric: str = Field(min_length=1, max_length=120)
    operator: str = Field(min_length=1, max_length=10)
    threshold: float
    notification_type: str = Field(default="email", max_length=50)
    quiet_hours_start: Optional[str] = Field(default=None, max_length=5)
    quiet_hours_end: Optional[str] = Field(default=None, max_length=5)
    is_active: bool = True
    project_id: Optional[int] = None

    @field_validator("operator")
    @classmethod
    def normalize_operator(cls, value: str) -> str:
        normalized = value.strip()
        if normalized not in {"<", ">", "=", "<=", ">="}:
            raise ValueError("operator must be one of <, >, =, <=, >=")
        return normalized


class AlertRuleUpdate(BaseModel):
    metric: Optional[str] = Field(default=None, max_length=120)
    operator: Optional[str] = Field(default=None, max_length=10)
    threshold: Optional[float] = None
    notification_type: Optional[str] = Field(default=None, max_length=50)
    quiet_hours_start: Optional[str] = Field(default=None, max_length=5)
    quiet_hours_end: Optional[str] = Field(default=None, max_length=5)
    is_active: Optional[bool] = None
    project_id: Optional[int] = None

    @field_validator("operator")
    @classmethod
    def normalize_operator(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        normalized = value.strip()
        if normalized not in {"<", ">", "=", "<=", ">="}:
            raise ValueError("operator must be one of <, >, =, <=, >=")
        return normalized


class AlertRuleRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

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


class NotificationLogRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

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
    rules: List[AlertRuleRead]
    total: int


class NotificationLogsResponse(BaseModel):
    logs: List[NotificationLogRead]
    total: int


class NotificationUnreadResponse(BaseModel):
    unread_count: int
