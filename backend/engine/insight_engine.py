"""Deterministic statistical insights for structured data."""

from __future__ import annotations

from math import sqrt
from statistics import mean
from typing import Any, Iterable, Sequence

# Preferred numeric field names in order of preference
PREFERRED_NUMERIC_FIELDS = [
    "value", "metric_value", "latency_ms", "confidence",
    "count", "total", "amount", "revenue"
]


def _to_float(value: Any) -> float | None:
    """Convert value to float, handling non-numeric types.
    
    Args:
        value: Value to convert
        
    Returns:
        Float value or None if conversion fails
    """
    if isinstance(value, bool):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    try:
        return float(value)
    except Exception:
        return None


def _extract_numeric_series(rows: Sequence[dict[str, Any]]) -> tuple[str | None, list[float]]:
    """Extract first valid numeric series from row data.
    
    Args:
        rows: Sequence of data dicts
        
    Returns:
        Tuple of (field_name, values) or (None, []) if no numeric series found
    """
    preferred_fields = PREFERRED_NUMERIC_FIELDS
    if not rows:
        return None, []
    keys = list(rows[0].keys())
    for field in preferred_fields + keys:
        series = []
        for row in rows:
            if field not in row:
                series = []
                break
            numeric_value = _to_float(row[field])
            if numeric_value is None:
                series = []
                break
            series.append(numeric_value)
        if series:
            return field, series
    return None, []


def compute_growth(series: Sequence[float]) -> float:
    """Calculate percentage growth from first to last value.
    
    Args:
        series: Sequence of numeric values
        
    Returns:
        Growth percentage (0.0 if insufficient data or zero division)
    """
    if len(series) < 2:
        return 0.0
    first = series[0]
    last = series[-1]
    if first == 0:
        return 0.0
    return round(((last - first) / abs(first)) * 100.0, 2)


def detect_anomalies(series: Sequence[float]) -> list[dict[str, Any]]:
    """Detect statistical anomalies using z-score method.
    
    Args:
        series: Sequence of numeric values
        
    Returns:
        List of anomalies with period, value, and z-score
    """
    if len(series) < 3:
        return []
    avg = mean(series)
    variance = mean([(value - avg) ** 2 for value in series])
    std_dev = sqrt(variance)
    if std_dev == 0:
        return []
    anomalies: list[dict[str, Any]] = []
    for index, value in enumerate(series):
        z_score = abs((value - avg) / std_dev)
        if z_score >= 2.0:
            anomalies.append({"period": index, "value": value, "score": round(z_score, 2)})
    return anomalies


def summarize_trend(series: Sequence[float]) -> str:
    """Classify trend as upward, downward, or stable.
    
    Args:
        series: Sequence of numeric values
        
    Returns:
        Trend classification string
    """
    if len(series) < 2:
        return "insufficient-data"
    growth = compute_growth(series)
    if growth > 5:
        return "upward"
    if growth < -5:
        return "downward"
    return "stable"


def format_insights(results: dict[str, Any]) -> str:
    """Format insight results as readable text.
    
    Args:
        results: Insight results dict
        
    Returns:
        Formatted insight string
    """
    summary = results.get("summary")
    if summary:
        return str(summary)
    trend = results.get("trend", "stable")
    growth_rate = results.get("growth_rate", 0.0)
    anomalies = results.get("anomalies", [])
    if anomalies:
        return f"Trend is {trend} with a {growth_rate}% change and {len(anomalies)} notable anomaly points."
    return f"Trend is {trend} with a {growth_rate}% change."


def run(data: Iterable[dict[str, Any]], spec: dict[str, Any] | None = None) -> dict[str, Any]:
    """Extract statistical insights from data.
    
    Args:
        data: Iterable of data records
        spec: Optional specification with 'summary' key
        
    Returns:
        Insights dict with trend, growth_rate, anomalies, primary_field
    """
    rows = list(data)
    field, series = _extract_numeric_series(rows)
    if not series:
        return {
            "summary": "No numeric series was available for analysis.",
            "trend": "insufficient-data",
            "growth_rate": 0.0,
            "anomalies": [],
            "primary_field": None,
            "series": [],
        }

    growth_rate = compute_growth(series)
    trend = summarize_trend(series)
    anomalies = detect_anomalies(series)
    summary = format_insights(
        {
            "trend": trend,
            "growth_rate": growth_rate,
            "anomalies": anomalies,
            "summary": spec.get("summary") if spec else None,
        }
    )
    return {
        "summary": summary,
        "trend": trend,
        "growth_rate": growth_rate,
        "anomalies": anomalies,
        "primary_field": field,
        "series": series,
    }
