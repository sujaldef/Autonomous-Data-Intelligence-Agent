"""Analytics routes for telemetry and dashboard metrics."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from model.db_models import User
from model.schemas import AnalyticsSeriesResponse, AnalyticsTelemetry
from stats.analytics_service import build_dashboard_metrics, build_time_series, resolve_metric_value
from utils.auth import get_current_user_dependency
from utils.db import get_db


router = APIRouter(prefix="/api/analytics", tags=["analytics"])
metrics_router = APIRouter(prefix="/api/metrics", tags=["metrics"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def _current_user_dep(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    return get_current_user_dependency(db, token)


@router.get("/telemetry", response_model=AnalyticsTelemetry)
def telemetry(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    days: int = Query(default=30, ge=1, le=365),
    project_id: str | None = Query(default=None, max_length=120),
) -> AnalyticsTelemetry:
    project = None
    if project_id:
        from model.db_models import Project

        project = db.query(Project).filter(Project.owner_id == current_user.id, Project.route_id == project_id).one_or_none()
    return build_dashboard_metrics(db, user_id=current_user.id, project_id=project.id if project else None, days=days)


@router.get("/series", response_model=AnalyticsSeriesResponse)
def series(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    metric_name: str = Query(default="queries", max_length=120),
    days: int = Query(default=30, ge=1, le=365),
    project_id: str | None = Query(default=None, max_length=120),
) -> AnalyticsSeriesResponse:
    project = None
    if project_id:
        from model.db_models import Project

        project = db.query(Project).filter(Project.owner_id == current_user.id, Project.route_id == project_id).one_or_none()
    telemetry_payload = build_dashboard_metrics(db, user_id=current_user.id, project_id=project.id if project else None, days=days)
    points = telemetry_payload.series.get(metric_name, [])
    return AnalyticsSeriesResponse(series_name=metric_name, points=points)


@metrics_router.get("/global", response_model=AnalyticsTelemetry)
def global_metrics(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    days: int = Query(default=30, ge=1, le=365),
) -> AnalyticsTelemetry:
    return build_dashboard_metrics(db, user_id=current_user.id, days=days)


@metrics_router.get("/value")
def metric_value(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    metric_name: str = Query(max_length=120),
) -> dict[str, float]:
    return {"metric_name": metric_name, "value": resolve_metric_value(metric_name, db, user_id=current_user.id)}
