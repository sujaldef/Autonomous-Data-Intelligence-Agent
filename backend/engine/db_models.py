"""SQLAlchemy ORM models for ADIA."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, List, Optional

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Index, Integer, JSON, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship, declarative_base


Base = declarative_base()


def utcnow() -> datetime:
    """Get current UTC time."""
    return datetime.now(timezone.utc)


class TimestampMixin:
    """Mixin for automatic timestamp tracking."""
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False, index=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False, index=True
    )


class User(TimestampMixin, Base):
    """User model with authentication and project ownership."""
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="user", nullable=False, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)

    projects: Mapped[List["Project"]] = relationship(back_populates="owner", cascade="all, delete-orphan")
    query_logs: Mapped[List["QueryLog"]] = relationship(back_populates="user")
    alert_rules: Mapped[List["AlertRule"]] = relationship(back_populates="user")
    sessions: Mapped[List["ConversationSession"]] = relationship(back_populates="user")


class Project(TimestampMixin, Base):
    """Project model for organizing queries and analytics."""
    __tablename__ = "projects"
    __table_args__ = (Index("ix_projects_owner_archived", "owner_id", "is_archived"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    route_id: Mapped[str] = mapped_column(String(120), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Idle", nullable=False, index=True)
    source_tags: Mapped[list[str]] = mapped_column(JSON, default=list, nullable=False)
    last_activity_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True, index=True)
    is_archived: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)

    owner: Mapped[User] = relationship(back_populates="projects")
    query_logs: Mapped[List["QueryLog"]] = relationship(back_populates="project")
    alert_rules: Mapped[List["AlertRule"]] = relationship(back_populates="project")
    sessions: Mapped[List["ConversationSession"]] = relationship(back_populates="project")
    metrics: Mapped[List["SystemMetric"]] = relationship(back_populates="project")


class ConversationSession(TimestampMixin, Base):
    """Conversation session tracking user interactions."""
    __tablename__ = "conversation_sessions"
    __table_args__ = (Index("ix_sessions_user_last_msg", "user_id", "last_message_at"),)

    session_id: Mapped[str] = mapped_column(String(120), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    project_id: Mapped[Optional[int]] = mapped_column(ForeignKey("projects.id", ondelete="SET NULL"), index=True)
    summary: Mapped[str] = mapped_column(Text, default="", nullable=False)
    recent_turns: Mapped[list[dict[str, Any]]] = mapped_column(JSON, default=list, nullable=False)
    last_message_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True, index=True)

    user: Mapped[User] = relationship(back_populates="sessions")
    project: Mapped[Optional[Project]] = relationship(back_populates="sessions")


class QueryLog(TimestampMixin, Base):
    """Query log tracking user questions and answers."""
    __tablename__ = "query_logs"
    __table_args__ = (
        Index("ix_query_logs_user_created", "user_id", "created_at"),
        Index("ix_query_logs_project_status", "project_id", "status"),
        Index("ix_query_logs_session_id", "session_id"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    project_id: Mapped[Optional[int]] = mapped_column(ForeignKey("projects.id", ondelete="SET NULL"), index=True)
    session_id: Mapped[Optional[str]] = mapped_column(
        ForeignKey("conversation_sessions.session_id", ondelete="SET NULL")
    )
    query_text: Mapped[str] = mapped_column(Text, nullable=False)
    answer_text: Mapped[str] = mapped_column(Text, default="", nullable=False)
    status: Mapped[str] = mapped_column(String(40), default="complete", nullable=False, index=True)
    sources: Mapped[list[str]] = mapped_column(JSON, default=list, nullable=False)
    execution_trace: Mapped[list[dict[str, Any]]] = mapped_column(JSON, default=list, nullable=False)
    chart_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    confidence: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    latency_ms: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    user: Mapped[User] = relationship(back_populates="query_logs")
    project: Mapped[Optional[Project]] = relationship(back_populates="query_logs")


class AlertRule(TimestampMixin, Base):
    """Alert rules for notifications and monitoring."""
    __tablename__ = "alert_rules"
    __table_args__ = (Index("ix_alert_rules_user_active", "user_id", "is_active"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    project_id: Mapped[Optional[int]] = mapped_column(ForeignKey("projects.id", ondelete="SET NULL"), index=True)
    metric: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    operator: Mapped[str] = mapped_column(String(10), nullable=False)
    threshold: Mapped[float] = mapped_column(Float, nullable=False)
    notification_type: Mapped[str] = mapped_column(String(50), default="email", nullable=False)
    quiet_hours_start: Mapped[Optional[str]] = mapped_column(String(5), nullable=True)
    quiet_hours_end: Mapped[Optional[str]] = mapped_column(String(5), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    last_triggered_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True, index=True)
    last_triggered_value: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    user: Mapped[User] = relationship(back_populates="alert_rules")
    project: Mapped[Optional[Project]] = relationship(back_populates="alert_rules")
    notification_logs: Mapped[List["NotificationLog"]] = relationship(back_populates="rule")


class NotificationLog(TimestampMixin, Base):
    """Log of sent and received notifications."""
    __tablename__ = "notification_logs"
    __table_args__ = (Index("ix_notification_logs_user_read", "user_id", "is_read"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    rule_id: Mapped[int] = mapped_column(ForeignKey("alert_rules.id", ondelete="CASCADE"), index=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    project_id: Mapped[Optional[int]] = mapped_column(ForeignKey("projects.id", ondelete="SET NULL"), index=True)
    triggered_value: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[str] = mapped_column(String(40), default="queued", nullable=False, index=True)
    channel: Mapped[str] = mapped_column(String(50), default="email", nullable=False)
    message: Mapped[str] = mapped_column(Text, default="", nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)
    read_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    rule: Mapped[AlertRule] = relationship(back_populates="notification_logs")


class SystemMetric(TimestampMixin, Base):
    """System metrics and performance measurements."""
    __tablename__ = "system_metrics"
    __table_args__ = (Index("ix_system_metrics_project_observed", "project_id", "observed_at"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    metric_name: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    metric_value: Mapped[float] = mapped_column(Float, nullable=False)
    unit: Mapped[str] = mapped_column(String(30), default="", nullable=False)
    source: Mapped[str] = mapped_column(String(80), default="system", nullable=False, index=True)
    observed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, index=True, nullable=False)
    project_id: Mapped[Optional[int]] = mapped_column(ForeignKey("projects.id", ondelete="SET NULL"), index=True)

    project: Mapped[Optional[Project]] = relationship(back_populates="metrics")


class DocumentChunk(TimestampMixin, Base):
    """Document chunks for RAG retrieval."""
    __tablename__ = "document_chunks"
    __table_args__ = (
        UniqueConstraint("source_name", "chunk_index", name="uq_document_chunk_source_index"),
        Index("ix_document_chunks_source_created", "source_name", "created_at"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source_name: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    chunk_index: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column("metadata", JSON, default=dict, nullable=False)
    embedding: Mapped[list[float]] = mapped_column(JSON, default=list, nullable=False)
