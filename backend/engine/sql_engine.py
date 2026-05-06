"""Safe read-only SQL execution utilities."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any, Mapping

from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

from config import get_settings
from model.db_models import AlertRule, NotificationLog, Project, QueryLog, SystemMetric
from utils.logger import get_logger


settings = get_settings()
logger = get_logger(__name__)

FORBIDDEN_SQL_PATTERNS = re.compile(r"\b(insert|update|delete|drop|alter|truncate|replace|create|grant|revoke|attach|pragma)\b", re.IGNORECASE)


@dataclass(frozen=True)
class SQLQueryPlan:
    sql: str
    params: dict[str, Any]
    description: str


def validate_sql(sql: str) -> str:
    cleaned = sql.strip()
    if ";" in cleaned:
        raise ValueError("Multiple statements are not allowed")
    if FORBIDDEN_SQL_PATTERNS.search(cleaned):
        raise ValueError("Only read-only SELECT queries are allowed")
    if not cleaned.lower().startswith(("select", "with")):
        raise ValueError("Only SELECT or WITH statements are allowed")
    return cleaned


def serialize_rows(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    serialized: list[dict[str, Any]] = []
    for row in rows:
        item: dict[str, Any] = {}
        for key, value in row.items():
            if hasattr(value, "isoformat"):
                item[key] = value.isoformat()
            else:
                item[key] = value
        serialized.append(item)
    return serialized


def execute_sql(sql: str, db: Session, params: Mapping[str, Any] | None = None) -> dict[str, Any]:
    validated_sql = validate_sql(sql)
    result = db.execute(text(validated_sql), dict(params or {}))
    rows = [dict(row) for row in result.mappings().all()]
    return {
        "rows": serialize_rows(rows),
        "row_count": len(rows),
        "columns": list(result.keys()),
        "sql": validated_sql,
        "params": dict(params or {}),
    }


def inspect_schema(db: Session) -> dict[str, list[str]]:
    inspector = inspect(db.bind)
    schema: dict[str, list[str]] = {}
    for table_name in inspector.get_table_names():
        schema[table_name] = [column["name"] for column in inspector.get_columns(table_name)]
    return schema


def build_query_from_intent(query_text: str, user_id: int, project_id: int | None = None, limit: int | None = None) -> SQLQueryPlan:
    text_value = query_text.lower().strip()
    limit_value = limit or settings.max_query_results
    params: dict[str, Any] = {"user_id": user_id, "limit": limit_value}
    if project_id is not None:
        params["project_id"] = project_id

    if any(term in text_value for term in ["history", "audit", "recent query", "query log", "logs"]):
        sql = """
            SELECT id, session_id, query_text, answer_text, status, latency_ms, created_at, project_id
            FROM query_logs
            WHERE user_id = :user_id
            {project_clause}
            ORDER BY created_at DESC
            LIMIT :limit
        """
        project_clause = "AND project_id = :project_id" if project_id is not None else ""
        return SQLQueryPlan(sql=sql.format(project_clause=project_clause), params=params, description="query history")

    if any(term in text_value for term in ["notification", "alert", "rule", "dispatch"]):
        sql = """
            SELECT id, metric, operator, threshold, notification_type, quiet_hours_start, quiet_hours_end, is_active, created_at
            FROM alert_rules
            WHERE user_id = :user_id
            {project_clause}
            ORDER BY created_at DESC
            LIMIT :limit
        """
        project_clause = "AND project_id = :project_id" if project_id is not None else ""
        return SQLQueryPlan(sql=sql.format(project_clause=project_clause), params=params, description="alert rules")

    if any(term in text_value for term in ["project", "workspace", "sidebar", "dashboard", "card"]):
        sql = """
            SELECT id, route_id, name, description, status, source_tags, last_activity_at, is_archived
            FROM projects
            WHERE owner_id = :user_id
            ORDER BY COALESCE(last_activity_at, created_at) DESC
            LIMIT :limit
        """
        return SQLQueryPlan(sql=sql, params=params, description="project overview")

    if any(term in text_value for term in ["latency", "revenue", "queries", "metric", "analytics", "trend", "health"]):
        sql = """
            SELECT metric_name, metric_value, unit, source, observed_at, project_id
            FROM system_metrics
            WHERE 1 = 1
            {project_clause}
            ORDER BY observed_at DESC
            LIMIT :limit
        """
        project_clause = "AND project_id = :project_id" if project_id is not None else ""
        return SQLQueryPlan(sql=sql.format(project_clause=project_clause), params=params, description="system metrics")

    sql = """
        SELECT id, query_text, answer_text, status, latency_ms, created_at, project_id
        FROM query_logs
        WHERE user_id = :user_id
        {project_clause}
        ORDER BY created_at DESC
        LIMIT :limit
    """
    project_clause = "AND project_id = :project_id" if project_id is not None else ""
    return SQLQueryPlan(sql=sql.format(project_clause=project_clause), params=params, description="recent queries")


def run(query_spec: Mapping[str, Any] | str | SQLQueryPlan, db: Session) -> dict[str, Any]:
    if isinstance(query_spec, SQLQueryPlan):
        return execute_sql(query_spec.sql, db, query_spec.params)
    if isinstance(query_spec, str):
        return execute_sql(query_spec, db)
    if isinstance(query_spec, Mapping):
        sql = str(query_spec.get("sql", "")).strip()
        if not sql:
            raise ValueError("sql is required")
        params = query_spec.get("params") or {}
        return execute_sql(sql, db, params)
    raise TypeError("Unsupported query_spec type")
