"""Pydantic schemas for API payloads and responses.

This module acts as a unified entry point, re-exporting schemas defined
in specialized sub-modules within the model folder.
"""

from __future__ import annotations

from .base_schemas import (
    ORMModel,
    EmailNormalizationMixin,
    OperatorValidationMixin,
)
from .system_schemas import (
    AppInfo,
    SystemHealthResponse,
    ReadinessResponse,
    GenericErrorResponse,
)
from .auth_schemas import (
    UserRead,
    SignupRequest,
    LoginRequest,
    AuthResponse,
    CurrentUserResponse,
)
from .query_schemas import (
    QueryRequest,
    ToolTrace,
    QueryResponse,
)
from .project_schemas import (
    ProjectSummary,
    ProjectDetail,
    ProjectListResponse,
    ProjectDetailResponse,
    SourceOption,
    SourceListResponse,
)
from .history_schemas import (
    HistoryItem,
    HistoryResponse,
)
from .analytics_schemas import (
    MetricCard,
    SourceMixItem,
    TimeSeriesPoint,
    AnalyticsTelemetry,
    AnalyticsSeriesResponse,
)
from .notification_schemas import (
    AlertRuleCreate,
    AlertRuleUpdate,
    AlertRuleRead,
    NotificationLogRead,
    NotificationRulesResponse,
    NotificationLogsResponse,
    NotificationUnreadResponse,
)
