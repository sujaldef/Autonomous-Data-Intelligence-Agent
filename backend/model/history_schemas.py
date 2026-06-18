"""History and audit trail schemas."""

from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel

from ..engine.base_schemas import ORMModel


class HistoryItem(ORMModel):
    """Single history item."""
    id: int
    query: str
    answer: str
    date: str
    time: str
    project: Optional[str] = None
    type: str = "Hybrid"
    status: str
    latency_ms: Optional[int] = None


class HistoryResponse(BaseModel):
    """History items response with pagination."""
    items: List[HistoryItem]
    page: int
    page_size: int
    total: int
