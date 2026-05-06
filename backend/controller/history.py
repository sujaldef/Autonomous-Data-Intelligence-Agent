"""History routes for query audit trail retrieval."""

from __future__ import annotations

from datetime import timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from model.db_models import Project, QueryLog, User
from model.schemas import HistoryItem, HistoryResponse
from utils.auth import get_current_user_dependency
from utils.db import get_db


router = APIRouter(prefix="/api/history", tags=["history"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def _current_user_dep(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    return get_current_user_dependency(db, token)


def _history_item(log: QueryLog) -> HistoryItem:
    created_at = log.created_at.astimezone(timezone.utc) if log.created_at else None
    return HistoryItem(
        id=log.id,
        query=log.query_text,
        answer=log.answer_text,
        date=created_at.strftime("%b %d") if created_at else "",
        time=created_at.strftime("%H:%M") if created_at else "",
        project=log.project.route_id if log.project else None,
        type="Hybrid" if len(log.sources or []) > 1 else (log.sources[0] if log.sources else "SQL"),
        status=log.status.capitalize(),
        latency_ms=log.latency_ms,
    )


def _history_query(db: Session, current_user: User, project_id: str | None = None, status_filter: str | None = None, q: str | None = None):
    query = db.query(QueryLog).filter(QueryLog.user_id == current_user.id)
    if project_id:
        project = db.query(Project).filter(Project.owner_id == current_user.id, Project.route_id == project_id).one_or_none()
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        query = query.filter(QueryLog.project_id == project.id)
    if status_filter:
        query = query.filter(QueryLog.status == status_filter)
    if q:
        like_value = f"%{q.strip()}%"
        query = query.filter((QueryLog.query_text.ilike(like_value)) | (QueryLog.answer_text.ilike(like_value)))
    return query


@router.get("", response_model=HistoryResponse)
def list_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=50),
    project_id: str | None = Query(default=None, max_length=120),
    status_filter: str | None = Query(default=None, alias="status", max_length=50),
    q: str | None = Query(default=None, max_length=200),
) -> HistoryResponse:
    query = _history_query(db, current_user, project_id=project_id, status_filter=status_filter, q=q)
    total = query.count()
    rows = query.order_by(QueryLog.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    return HistoryResponse(items=[_history_item(row) for row in rows], page=page, page_size=page_size, total=total)


@router.get("/search", response_model=HistoryResponse)
def search_history(
    q: str = Query(min_length=1, max_length=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=50),
) -> HistoryResponse:
    query = _history_query(db, current_user, q=q)
    total = query.count()
    rows = query.order_by(QueryLog.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    return HistoryResponse(items=[_history_item(row) for row in rows], page=page, page_size=page_size, total=total)


@router.get("/{history_id}", response_model=HistoryItem)
def get_history_item(history_id: int, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> HistoryItem:
    row = db.query(QueryLog).filter(QueryLog.id == history_id, QueryLog.user_id == current_user.id).one_or_none()
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="History item not found")
    return _history_item(row)
