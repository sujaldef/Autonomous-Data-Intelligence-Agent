"""System telemetry and operational analytics endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from model.schemas import AnalyticsTelemetry
from utils.db import get_db
from utils.auth import get_current_user
from stats.analytics_service import build_dashboard_metrics

router = APIRouter(prefix="/api/analytics", tags=["analytics"])
metrics_router = APIRouter(prefix="/api/metrics", tags=["metrics"])


@router.get("", response_model=AnalyticsTelemetry)
def get_analytics(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve system analytics aggregation reports."""
    return build_dashboard_metrics(db)


@metrics_router.get("")
def get_metrics_telemetry(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve operational telemetry endpoints."""
    return build_dashboard_metrics(db)
