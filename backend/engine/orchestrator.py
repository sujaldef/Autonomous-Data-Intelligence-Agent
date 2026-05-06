"""Tool-driven reasoning loop that selects data sources and synthesizes answers."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
import re
from typing import Any, Iterable, Sequence

from sqlalchemy.orm import Session

from engine import action_engine, insight_engine, rag_engine, sql_engine
from engine.viz_engine import render_chart
from model.db_models import ConversationSession, Project, QueryLog, User
from model.llm import get_llm_client
from model.schemas import QueryRequest, ToolTrace
from utils.logger import get_logger


logger = get_logger(__name__)


@dataclass
class OrchestrationResult:
    answer: str
    execution_trace: list[dict[str, Any]] = field(default_factory=list)
    chart_url: str | None = None
    confidence: float = 0.0
    status: str = "complete"
    artifacts: dict[str, Any] = field(default_factory=dict)


def build_session_context(session: ConversationSession | None) -> dict[str, Any]:
    if session is None:
        return {"summary": "", "recent_turns": []}
    return {"summary": session.summary or "", "recent_turns": list(session.recent_turns or [])}


def update_session_context(session: ConversationSession, query_text: str, answer_text: str, trace: list[dict[str, Any]], max_turns: int = 10) -> None:
    recent_turns = list(session.recent_turns or [])
    recent_turns.append({"role": "user", "content": query_text})
    recent_turns.append({"role": "assistant", "content": answer_text})
    session.recent_turns = recent_turns[-(max_turns * 2) :]
    session.summary = _summarize_memory(session.summary, recent_turns)
    session.last_message_at = datetime.now(timezone.utc)


def _summarize_memory(existing_summary: str, turns: Sequence[dict[str, Any]]) -> str:
    if not turns:
        return existing_summary
    recent_user_messages = [turn["content"] for turn in turns if turn.get("role") == "user"][-3:]
    base = existing_summary.strip()
    summary = "; ".join(recent_user_messages)
    if base:
        return f"{base}. Recent focus: {summary}".strip()
    return f"Recent focus: {summary}".strip()


def _project_context(project: Project | None) -> dict[str, Any]:
    if not project:
        return {}
    return {
        "project_id": project.id,
        "route_id": project.route_id,
        "name": project.name,
        "status": project.status,
        "sources": list(project.source_tags or []),
        "description": project.description,
    }


def _should_chart(query_text: str, rows: Sequence[dict[str, Any]]) -> bool:
    text = query_text.lower()
    return bool(rows) and any(term in text for term in ["chart", "graph", "trend", "revenue", "latency", "queries", "analytics"])


def _extract_points(rows: Sequence[dict[str, Any]]) -> list[dict[str, Any]]:
    points: list[dict[str, Any]] = []
    for index, row in enumerate(rows):
        numeric_value = None
        label = None
        for key in ("metric_value", "value", "latency_ms", "confidence", "threshold"):
            if key in row and isinstance(row[key], (int, float)):
                numeric_value = float(row[key])
                break
        for key in ("created_at", "observed_at", "date", "label", "metric_name", "query_text"):
            if key in row and row[key] is not None:
                label = str(row[key])[:24]
                break
        if numeric_value is not None:
            points.append({"label": label or f"{index + 1}", "value": numeric_value})
    return points


def _create_alert_from_query(query_text: str, user: User, db: Session, project_id: int | None = None) -> dict[str, Any] | None:
    text = query_text.lower()
    metric = None
    if "revenue" in text:
        metric = "monthly_revenue"
    elif "latency" in text:
        metric = "avg_latency_ms"
    elif "query" in text:
        metric = "query_count"
    if metric is None:
        return None

    match = re.search(r"(<=|>=|<|>|=)\s*(\d+(?:\.\d+)?)", text)
    if not match:
        return None
    operator, threshold = match.group(1), float(match.group(2))
    notification_type = "email" if "email" in text else "in_app"
    confirmation = action_engine.run(
        {
            "metric": metric,
            "operator": operator,
            "threshold": threshold,
            "notification_type": notification_type,
            "is_active": True,
            "project_id": project_id,
        },
        user=user,
        db=db,
    )
    return confirmation


def run(query: QueryRequest, user: User, db: Session, project: Project | None = None, session: ConversationSession | None = None) -> OrchestrationResult:
    llm = get_llm_client()
    intent = llm.infer_intent(query.query)
    selected_sources = {source.upper() for source in (query.sources or ["SQL", "RAG", "INSIGHT"])}
    trace: list[dict[str, Any]] = []
    artifacts: dict[str, Any] = {}

    if intent == "action" and "ACTION" in selected_sources:
        confirmation = _create_alert_from_query(query.query, user, db, project.id if project else None)
        if confirmation:
            trace.append({"tool": "action_engine", "observation": "created alert rule", "metadata": confirmation})
            answer = f"Created alert rule #{confirmation['rule_id']} for {confirmation['metric']} {confirmation['operator']} {confirmation['threshold']}."
            return OrchestrationResult(answer=answer, execution_trace=trace, confidence=0.99, artifacts=artifacts)

    sql_rows: list[dict[str, Any]] = []
    sql_description = ""
    if "SQL" in selected_sources or intent in {"analytics", "history", "overview"}:
        plan = sql_engine.build_query_from_intent(query.query, user_id=user.id, project_id=project.id if project else None, limit=25)
        sql_result = sql_engine.run(plan, db)
        sql_rows = list(sql_result["rows"])
        sql_description = plan.description
        trace.append({
            "tool": "sql_engine",
            "observation": f"Returned {sql_result['row_count']} rows from {sql_description}",
            "metadata": {"columns": sql_result["columns"], "sql": sql_result["sql"]},
        })

    rag_results: list[dict[str, Any]] = []
    if "RAG" in selected_sources or intent == "rag":
        rag_results = rag_engine.run(query.query, db=db, top_k=5)
        trace.append({
            "tool": "rag_engine",
            "observation": f"Retrieved {len(rag_results)} chunks",
            "metadata": {"chunks": rag_results},
        })

    insight_result: dict[str, Any] | None = None
    if sql_rows and ("INSIGHT" in selected_sources or intent in {"analytics", "history", "overview"}):
        insight_result = insight_engine.run(sql_rows, spec={"summary": f"Insights derived from {sql_description}"})
        trace.append({"tool": "insight_engine", "observation": insight_result["summary"], "metadata": {"trend": insight_result["trend"], "growth_rate": insight_result["growth_rate"]}})

    chart_url: str | None = None
    if _should_chart(query.query, sql_rows):
        points = _extract_points(sql_rows)
        if points:
            from model.schemas import TimeSeriesPoint

            chart_points = [TimeSeriesPoint(label=item["label"], value=float(item["value"])) for item in points]
            chart_url = render_chart(chart_points, title=query.query[:60], y_label="Value")
            trace.append({"tool": "chart", "observation": chart_url, "metadata": {"points": points}})

    if not sql_rows and not rag_results:
        answer = f"No matching records were found for: {query.query}."
        confidence = 0.2
    else:
        answer = llm.summarize(query.query, trace, insight_result)
        if project:
            answer += f" The result is scoped to project {project.name}."
        confidence = 0.92 if sql_rows else 0.78

    return OrchestrationResult(answer=answer, execution_trace=trace, chart_url=chart_url, confidence=confidence, artifacts=artifacts)
