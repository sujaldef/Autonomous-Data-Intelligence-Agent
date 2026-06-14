"""Alert rules and notification schemas."""

from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator

from .base_schemas import ORMModel, OperatorValidationMixin


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
