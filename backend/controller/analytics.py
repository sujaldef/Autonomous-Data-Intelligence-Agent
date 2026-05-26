"""Analytics routes for telemetry and dashboard metrics."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from model.db_models import Project, User
from model.schemas import AnalyticsSeriesResponse, AnalyticsTelemetry
from stats.analytics_service import build_dashboard_metrics, resolve_metric_value
from utils.auth import get_current_user_dependency
from utils.db import get_db


router = APIRouter(prefix="/api/analytics", tags=["analytics"])
metrics_router = APIRouter(prefix="/api/metrics", tags=["metrics"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def _current_user_dep(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    return get_current_user_dependency(db, token)


def _get_user_project(db: Session, user_id: int, project_route_id: str) -> Project | None:
    """Fetch project by route_id, ensuring user ownership. Returns None if not found."""
    return db.query(Project).filter(
        Project.owner_id == user_id,
        Project.route_id == project_route_id
    ).one_or_none()


@router.get("/telemetry", response_model=AnalyticsTelemetry)
def telemetry(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    days: int = Query(default=30, ge=1, le=365),
    project_id: str | None = Query(default=None, max_length=120),
) -> AnalyticsTelemetry:
    project_db_id = None
    if project_id:
        project = _get_user_project(db, current_user.id, project_id)
        if project:
            project_db_id = project.id
    return build_dashboard_metrics(db, user_id=current_user.id, project_id=project_db_id, days=days)


@router.get("/series", response_model=AnalyticsSeriesResponse)
def series(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    metric_name: str = Query(default="queries", max_length=120),
    days: int = Query(default=30, ge=1, le=365),
    project_id: str | None = Query(default=None, max_length=120),
) -> AnalyticsSeriesResponse:
    project_db_id = None
    if project_id:
        project = _get_user_project(db, current_user.id, project_id)
        if project:
            project_db_id = project.id
    telemetry_payload = build_dashboard_metrics(db, user_id=current_user.id, project_id=project_db_id, days=days)
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
