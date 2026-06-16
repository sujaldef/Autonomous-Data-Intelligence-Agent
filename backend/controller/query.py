"""Query processing, project routing, and data source endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from model.schemas import (
    QueryRequest, QueryResponse, ToolTrace,
    ProjectListResponse, ProjectSummary, ProjectDetailResponse, ProjectDetail,
    SourceListResponse, SourceOption
)
from model.db_models import User, Project, QueryLog
from utils.db import get_db
from utils.auth import get_current_user
from engine.orchestrator import AgentOrchestrator

router = APIRouter(prefix="/api/query", tags=["query"])
project_router = APIRouter(prefix="/api/projects", tags=["projects"])
sources_router = APIRouter(prefix="/api/sources", tags=["sources"])

orchestrator = AgentOrchestrator()


@router.post("", response_model=QueryResponse)
def execute_query(
    payload: QueryRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Natural language query execution and resolution handler."""
    project_db_id = None
    if payload.project_id:
        project = db.query(Project).filter(
            Project.route_id == payload.project_id,
            Project.owner_id == current_user.id
        ).first()
        if project:
            project_db_id = project.id

    # Run query orchestrator planning loop
    result = orchestrator.run(
        query=payload.query,
        session_id=payload.session_id,
        project_id=payload.project_id,
        sources=payload.sources
    )

    # Log operational transactions
    query_log = QueryLog(
        user_id=current_user.id,
        project_id=project_db_id,
        session_id=payload.session_id,
        query_text=payload.query,
        answer_text=result["answer"],
        status=result["status"],
        sources=payload.sources,
        execution_trace=result["execution_trace"],
        chart_url=result["chart_url"],
        confidence=result["confidence"],
        latency_ms=120
    )
    db.add(query_log)
    db.commit()
    db.refresh(query_log)

    return QueryResponse(
        answer=result["answer"],
        execution_trace=[
            ToolTrace(
                tool=t["tool"],
                observation=t["observation"],
                metadata=t.get("metadata", {})
            ) for t in result["execution_trace"]
        ],
        chart_url=result["chart_url"],
        confidence=result["confidence"],
        status=result["status"],
        session_id=payload.session_id,
        project_id=payload.project_id,
        query_log_id=query_log.id
    )


@project_router.get("", response_model=ProjectListResponse)
def list_projects(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List dashboard projects owned by current user."""
    projects = db.query(Project).filter(Project.owner_id == current_user.id).all()
    summaries = [
        ProjectSummary(
            id=p.id,
            route_id=p.route_id,
            name=p.name,
            description=p.description,
            status=p.status,
            sources=p.source_tags,
            last_activity_at=p.last_activity_at,
            last_activity_label="Active"
        ) for p in projects
    ]
    return ProjectListResponse(projects=summaries)


@project_router.get("/{route_id}", response_model=ProjectDetailResponse)
def get_project_detail(
    route_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get project specific information and workspace attributes."""
    p = db.query(Project).filter(Project.route_id == route_id, Project.owner_id == current_user.id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
    
    detail = ProjectDetail(
        id=p.id,
        route_id=p.route_id,
        name=p.name,
        description=p.description,
        status=p.status,
        sources=p.source_tags,
        last_activity_at=p.last_activity_at,
        last_activity_label="Active",
        owner_id=p.owner_id,
        is_archived=p.is_archived
    )
    return ProjectDetailResponse(project=detail)


@sources_router.get("", response_model=SourceListResponse)
def list_sources(current_user: User = Depends(get_current_user)):
    """Retrieve allowed system workspace integrations."""
    options = [
        SourceOption(name="SQL", description="Structured Database query engine"),
        SourceOption(name="RAG", description="Vector database document retrieval"),
        SourceOption(name="INSIGHT", description="Pandas mathematical profiling analysis")
    ]
    return SourceListResponse(sources=options)
