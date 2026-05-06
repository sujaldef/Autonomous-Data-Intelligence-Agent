"""Query execution routes, project metadata routes, and source discovery."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import or_
from sqlalchemy.orm import Session

from engine import orchestrator
from engine.sql_engine import inspect_schema
from model.db_models import ConversationSession, Project, QueryLog, User
from model.schemas import (
    ProjectDetail,
    ProjectDetailResponse,
    ProjectListResponse,
    ProjectSummary,
    QueryRequest,
    QueryResponse,
    SourceListResponse,
    SourceOption,
)
from utils.auth import get_current_user_dependency
from utils.db import get_db


router = APIRouter(prefix="/api/query", tags=["query"])
project_router = APIRouter(prefix="/api/projects", tags=["projects"])
sources_router = APIRouter(prefix="/api/sources", tags=["sources"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def _current_user_dep(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    return get_current_user_dependency(db, token)


def _project_summary(project: Project) -> ProjectSummary:
    last_activity_label = None
    if project.last_activity_at:
        last_activity_label = project.last_activity_at.astimezone(timezone.utc).strftime("%b %d %H:%M")
    return ProjectSummary(
        id=project.id,
        route_id=project.route_id,
        name=project.name,
        description=project.description,
        status=project.status,
        sources=list(project.source_tags or []),
        last_activity_at=project.last_activity_at,
        last_activity_label=last_activity_label,
    )


def _project_detail(project: Project) -> ProjectDetail:
    summary = _project_summary(project)
    return ProjectDetail(**summary.model_dump(), owner_id=project.owner_id, is_archived=project.is_archived)


def _resolve_project(db: Session, current_user: User, project_key: str | None) -> Project | None:
    if not project_key:
        return None
    project = db.query(Project).filter(Project.owner_id == current_user.id, Project.route_id == project_key).one_or_none()
    if project is None:
        try:
            project_id = int(project_key)
        except ValueError:
            project_id = None
        if project_id is not None:
            project = db.query(Project).filter(Project.owner_id == current_user.id, Project.id == project_id).one_or_none()
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


def _load_or_create_session(db: Session, current_user: User, session_id: str, project: Project | None) -> ConversationSession:
    session = db.query(ConversationSession).filter(ConversationSession.session_id == session_id, ConversationSession.user_id == current_user.id).one_or_none()
    if session is None:
        session = ConversationSession(session_id=session_id, user_id=current_user.id, project_id=project.id if project else None, summary="", recent_turns=[])
        db.add(session)
        db.flush()
    elif project is not None and session.project_id is None:
        session.project_id = project.id
    return session


@router.post("", response_model=QueryResponse)
def execute_query(payload: QueryRequest, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> QueryResponse:
    start = datetime.now(timezone.utc)
    project = _resolve_project(db, current_user, payload.project_id) if payload.project_id else None
    session = _load_or_create_session(db, current_user, payload.session_id, project)
    orchestration_result = orchestrator.run(payload, current_user, db, project=project, session=session)
    orchestrator.update_session_context(session, payload.query, orchestration_result.answer, orchestration_result.execution_trace)

    query_log = QueryLog(
        user_id=current_user.id,
        project_id=project.id if project else None,
        session_id=session.session_id,
        query_text=payload.query,
        answer_text=orchestration_result.answer,
        status=orchestration_result.status,
        sources=payload.sources,
        execution_trace=orchestration_result.execution_trace,
        chart_url=orchestration_result.chart_url,
        confidence=orchestration_result.confidence,
        latency_ms=int((datetime.now(timezone.utc) - start).total_seconds() * 1000),
    )
    db.add(query_log)
    db.flush()
    query_log_id = query_log.id
    return QueryResponse(
        answer=orchestration_result.answer,
        execution_trace=orchestration_result.execution_trace,
        chart_url=orchestration_result.chart_url,
        confidence=orchestration_result.confidence,
        status=orchestration_result.status,
        session_id=session.session_id,
        project_id=project.route_id if project else None,
        query_log_id=query_log_id,
    )


@project_router.get("", response_model=ProjectListResponse)
def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    q: str | None = Query(default=None, max_length=120),
    status_filter: str | None = Query(default=None, alias="status", max_length=50),
) -> ProjectListResponse:
    projects_query = db.query(Project).filter(Project.owner_id == current_user.id, Project.is_archived.is_(False))
    if q:
        like_value = f"%{q.strip()}%"
        projects_query = projects_query.filter(or_(Project.name.ilike(like_value), Project.description.ilike(like_value), Project.route_id.ilike(like_value)))
    if status_filter:
        projects_query = projects_query.filter(Project.status == status_filter)
    projects = projects_query.order_by(Project.last_activity_at.desc().nullslast(), Project.created_at.desc()).all()
    return ProjectListResponse(projects=[_project_summary(project) for project in projects])


@project_router.get("/featured", response_model=ProjectListResponse)
def featured_projects(db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> ProjectListResponse:
    projects = (
        db.query(Project)
        .filter(Project.owner_id == current_user.id, Project.is_archived.is_(False))
        .order_by(Project.last_activity_at.desc().nullslast(), Project.created_at.desc())
        .limit(3)
        .all()
    )
    return ProjectListResponse(projects=[_project_summary(project) for project in projects])


@project_router.get("/search", response_model=ProjectListResponse)
def search_projects(
    q: str = Query(min_length=1, max_length=120),
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
) -> ProjectListResponse:
    like_value = f"%{q.strip()}%"
    projects = (
        db.query(Project)
        .filter(Project.owner_id == current_user.id, Project.is_archived.is_(False))
        .filter(or_(Project.name.ilike(like_value), Project.description.ilike(like_value), Project.route_id.ilike(like_value)))
        .order_by(Project.last_activity_at.desc().nullslast(), Project.created_at.desc())
        .all()
    )
    return ProjectListResponse(projects=[_project_summary(project) for project in projects])


@project_router.get("/featured/{project_key}", response_model=ProjectDetailResponse)
def featured_project_detail(project_key: str, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> ProjectDetailResponse:
    project = _resolve_project(db, current_user, project_key)
    return ProjectDetailResponse(project=_project_detail(project))


@project_router.get("/{project_key}/schema")
def project_schema(project_key: str, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> dict[str, Any]:
    project = _resolve_project(db, current_user, project_key)
    return {
        "project": _project_detail(project).model_dump(),
        "database_schema": inspect_schema(db),
        "available_sources": ["SQL", "RAG", "INSIGHT", "ACTION"],
    }


@project_router.get("/{project_key}", response_model=ProjectDetailResponse)
def get_project(project_key: str, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> ProjectDetailResponse:
    project = _resolve_project(db, current_user, project_key)
    return ProjectDetailResponse(project=_project_detail(project))


@sources_router.get("/available", response_model=SourceListResponse)
def available_sources() -> SourceListResponse:
    return SourceListResponse(
        sources=[
            SourceOption(name="SQL", description="Read-only SQL analytics over backend tables"),
            SourceOption(name="RAG", description="Document retrieval from indexed chunks"),
            SourceOption(name="INSIGHT", description="Deterministic statistical analysis"),
            SourceOption(name="ACTION", description="Controlled alert rule creation"),
        ]
    )
