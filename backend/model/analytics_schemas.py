"""Analytics and telemetry schemas."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel


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
