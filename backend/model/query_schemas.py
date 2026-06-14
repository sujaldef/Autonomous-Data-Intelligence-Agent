"""Query and Execution schemas."""

from __future__ import annotations

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field, field_validator


class QueryRequest(BaseModel):
    """Query request schema."""
    session_id: str = Field(min_length=3, max_length=120)
    query: str = Field(min_length=1, max_length=2000)
    project_id: Optional[str] = Field(default=None, max_length=120)
    sources: List[str] = Field(default_factory=lambda: ["SQL", "RAG", "INSIGHT"])

    @field_validator("query", mode="before")
    @classmethod
    def normalize_query(cls, value: str) -> str:
        return value.strip() if value else value

    @field_validator("sources", mode="before")
    @classmethod
    def normalize_sources(cls, value: List[str]) -> List[str]:
        return [item.strip().upper() for item in value if item and isinstance(item, str) and item.strip()]


class ToolTrace(BaseModel):
    """Execution trace for a tool."""
    tool: str
    observation: str
    metadata: Dict[str, Any] = Field(default_factory=dict)


class QueryResponse(BaseModel):
    """Query response with answer and trace."""
    answer: str
    execution_trace: List[ToolTrace] = Field(default_factory=list)
    chart_url: Optional[str] = None
    confidence: float = 0.0
    status: str = "complete"
    session_id: str
    project_id: Optional[str] = None
    query_log_id: Optional[int] = None
