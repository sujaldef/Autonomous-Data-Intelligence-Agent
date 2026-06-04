"""Deterministic local LLM helper used by the orchestrator."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, List

from config import get_settings


settings = get_settings()


@dataclass
class LocalLLMClient:
    model_name: str = settings.llm_model
    provider: str = settings.llm_provider

    def infer_intent(self, query_text: str) -> str:
        text = query_text.lower()
        if any(token in text for token in ["alert", "notify", "threshold", "rule"]):
            return "action"
        if any(token in text for token in ["document", "doc", "rag", "policy", "note"]):
            return "rag"
        if any(token in text for token in ["history", "log", "previous query", "audit"]):
            return "history"
        if any(token in text for token in ["project", "workspace", "dashboard", "metric", "analytics", "revenue", "latency", "query"]):
            return "analytics"
        return "overview"

    def summarize(self, query_text: str, evidence: List[dict[str, Any]], insight: dict[str, Any] | None = None) -> str:
        if evidence:
            first = evidence[0]
            summary = first.get("observation") or first.get("text") or "relevant data"
        else:
            summary = "available context"

        parts = [f"Based on {summary},"]
        if insight and insight.get("summary"):
            parts.append(str(insight["summary"]))
        else:
            parts.append("the backend returned a deterministic answer from the available sources.")
        return " ".join(parts)


def get_llm_client() -> LocalLLMClient:
    return LocalLLMClient()
