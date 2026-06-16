"""Operational analytics data generator."""

from __future__ import annotations

from datetime import datetime, timezone
from model.schemas import AnalyticsTelemetry, MetricCard, SourceMixItem, TimeSeriesPoint


def build_dashboard_metrics(db) -> AnalyticsTelemetry:
    """Builds standard system metrics and data source trends."""
    return AnalyticsTelemetry(
        cards=[
            MetricCard(key="total_queries", label="Total Queries", value=142, delta="+8%"),
            MetricCard(key="avg_latency", label="Avg Latency", value="210ms", delta="-12%"),
            MetricCard(key="success_rate", label="Success Rate", value="99.1%", delta="+0.2%")
        ],
        source_mix=[
            SourceMixItem(name="SQL", value=60.0),
            SourceMixItem(name="RAG", value=30.0),
            SourceMixItem(name="INSIGHT", value=10.0)
        ],
        series={
            "query_volume": [
                TimeSeriesPoint(label="Mon", value=15.0, timestamp=datetime.now(timezone.utc)),
                TimeSeriesPoint(label="Tue", value=22.0, timestamp=datetime.now(timezone.utc)),
                TimeSeriesPoint(label="Wed", value=28.0, timestamp=datetime.now(timezone.utc)),
                TimeSeriesPoint(label="Thu", value=25.0, timestamp=datetime.now(timezone.utc)),
                TimeSeriesPoint(label="Fri", value=30.0, timestamp=datetime.now(timezone.utc)),
                TimeSeriesPoint(label="Sat", value=12.0, timestamp=datetime.now(timezone.utc)),
                TimeSeriesPoint(label="Sun", value=10.0, timestamp=datetime.now(timezone.utc))
            ]
        },
        status_breakdown={
            "complete": 140,
            "failed": 2
        },
        generated_at=datetime.now(timezone.utc)
    )
