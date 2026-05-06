"""Analytics aggregation and lightweight chart rendering utilities."""

from __future__ import annotations

from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from statistics import mean
from typing import Iterable, List, Sequence

from sqlalchemy import func
from sqlalchemy.orm import Session

from config import get_settings
from engine.viz_engine import render_chart
from model.db_models import NotificationLog, Project, QueryLog, SystemMetric
from model.schemas import AnalyticsTelemetry, MetricCard, SourceMixItem, TimeSeriesPoint


settings = get_settings()


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _day_key(value: datetime) -> str:
    return value.astimezone(timezone.utc).strftime("%Y-%m-%d")


def _parse_series_rows(rows: Sequence[QueryLog], metric_name: str) -> list[TimeSeriesPoint]:
    buckets: dict[str, list[float]] = defaultdict(list)
    for row in rows:
        created_at = row.created_at or _now()
        key = _day_key(created_at)
        if metric_name == "query_count":
            buckets[key].append(1.0)
        elif metric_name == "avg_latency_ms" and row.latency_ms is not None:
            buckets[key].append(float(row.latency_ms))
        else:
            buckets[key].append(float(row.confidence or 0.0))

    points: list[TimeSeriesPoint] = []
    for label in sorted(buckets):
        values = buckets[label]
        points.append(TimeSeriesPoint(label=label, value=float(mean(values)), timestamp=datetime.fromisoformat(f"{label}T00:00:00+00:00")))
    return points


def resolve_metric_value(metric_name: str, db: Session, user_id: int | None = None, project_id: int | None = None) -> float:
    metric_name = metric_name.strip().lower()
    latest_metric = (
        db.query(SystemMetric)
        .filter(func.lower(SystemMetric.metric_name) == metric_name)
        .order_by(SystemMetric.observed_at.desc())
    )
    if project_id is not None:
        latest_metric = latest_metric.filter(SystemMetric.project_id == project_id)
    metric_row = latest_metric.first()
    if metric_row is not None:
        return float(metric_row.metric_value)

    query_logs = db.query(QueryLog)
    if user_id is not None:
        query_logs = query_logs.filter(QueryLog.user_id == user_id)
    if project_id is not None:
        query_logs = query_logs.filter(QueryLog.project_id == project_id)

    if metric_name in {"query_count", "queries", "total_queries"}:
        return float(query_logs.count())
    if metric_name in {"avg_latency_ms", "latency_ms", "average_latency"}:
        latencies = [item.latency_ms for item in query_logs.all() if item.latency_ms is not None]
        return float(mean(latencies)) if latencies else 0.0
    if metric_name in {"success_rate", "query_success_rate"}:
        logs = query_logs.all()
        if not logs:
            return 0.0
        successes = sum(1 for item in logs if item.status.lower() == "complete")
        return round((successes / len(logs)) * 100.0, 2)
    if metric_name in {"active_projects", "projects"}:
        project_query = db.query(Project).filter(Project.is_archived.is_(False))
        if user_id is not None:
            project_query = project_query.filter(Project.owner_id == user_id)
        return float(project_query.count())
    if metric_name in {"notification_count", "notifications"}:
        notification_query = db.query(NotificationLog)
        if user_id is not None:
            notification_query = notification_query.filter(NotificationLog.user_id == user_id)
        if project_id is not None:
            notification_query = notification_query.filter(NotificationLog.project_id == project_id)
        return float(notification_query.count())

    return 0.0


def build_source_mix(rows: Sequence[QueryLog]) -> list[SourceMixItem]:
    counter: Counter[str] = Counter()
    for row in rows:
        for source in row.sources or []:
            counter[str(source).upper()] += 1
    if not counter:
        return [SourceMixItem(name="SQL", value=0.0), SourceMixItem(name="RAG", value=0.0), SourceMixItem(name="INSIGHT", value=0.0)]
    total = sum(counter.values()) or 1
    return [SourceMixItem(name=name, value=round((count / total) * 100.0, 2)) for name, count in counter.most_common()]


def build_time_series(rows: Sequence[QueryLog], metric_name: str) -> list[TimeSeriesPoint]:
    return _parse_series_rows(rows, metric_name)


def _delta(current: float, previous: float) -> str:
    if previous == 0:
        return "+0%"
    change = ((current - previous) / abs(previous)) * 100.0
    sign = "+" if change >= 0 else ""
    return f"{sign}{change:.0f}%"


def build_dashboard_metrics(db: Session, user_id: int | None = None, project_id: int | None = None, days: int = 30) -> AnalyticsTelemetry:
    cutoff = _now() - timedelta(days=days)
    query = db.query(QueryLog).filter(QueryLog.created_at >= cutoff)
    if user_id is not None:
        query = query.filter(QueryLog.user_id == user_id)
    if project_id is not None:
        query = query.filter(QueryLog.project_id == project_id)

    rows = query.order_by(QueryLog.created_at.asc()).all()
    previous_cutoff = cutoff - timedelta(days=days)
    previous_query = db.query(QueryLog).filter(QueryLog.created_at >= previous_cutoff, QueryLog.created_at < cutoff)
    if user_id is not None:
        previous_query = previous_query.filter(QueryLog.user_id == user_id)
    if project_id is not None:
        previous_query = previous_query.filter(QueryLog.project_id == project_id)
    previous_rows = previous_query.all()

    query_count = len(rows)
    prev_count = len(previous_rows)
    success_count = sum(1 for row in rows if row.status.lower() == "complete")
    latency_values = [row.latency_ms for row in rows if row.latency_ms is not None]
    revenue_value = resolve_metric_value("monthly_revenue", db, user_id=user_id, project_id=project_id)
    previous_revenue_value = resolve_metric_value("monthly_revenue", db, user_id=user_id, project_id=project_id)

    cards = [
        MetricCard(key="revenue", label="Revenue", value=f"${revenue_value:,.0f}", delta=_delta(revenue_value, previous_revenue_value), unit="USD"),
        MetricCard(key="latency_ms", label="Average Latency", value=round(mean(latency_values), 2) if latency_values else 0, delta=None, unit="ms"),
        MetricCard(key="queries", label="Queries", value=query_count, delta=_delta(query_count, prev_count), unit="count"),
        MetricCard(key="success_rate", label="Success Rate", value=round((success_count / query_count) * 100.0, 2) if query_count else 0.0, delta=None, unit="percent"),
    ]

    source_mix = build_source_mix(rows)
    series = {
        "queries": build_time_series(rows, "query_count"),
        "latency_ms": build_time_series(rows, "avg_latency_ms"),
    }
    status_breakdown = Counter(row.status for row in rows)

    return AnalyticsTelemetry(
        cards=cards,
        source_mix=source_mix,
        series=series,
        status_breakdown=dict(status_breakdown),
        generated_at=_now(),
    )


def render_svg_chart(points: Sequence[TimeSeriesPoint], title: str, y_label: str = "Value", filename: str | None = None) -> str:
    return render_chart(points, title=title, y_label=y_label, filename=filename)
