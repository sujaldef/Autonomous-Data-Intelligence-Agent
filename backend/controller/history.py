"""History retrieval and query logs audit route handlers."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from model.schemas import HistoryResponse, HistoryItem
from model.db_models import User, QueryLog, Project
from utils.db import get_db
from utils.auth import get_current_user

router = APIRouter(prefix="/api/history", tags=["history"])


@router.get("", response_model=HistoryResponse)
def list_history(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=100),
    project_id: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve history of parsed questions and responses."""
    query = db.query(QueryLog).filter(QueryLog.user_id == current_user.id)
    
    if project_id:
        project = db.query(Project).filter(Project.route_id == project_id).first()
        if project:
            query = query.filter(QueryLog.project_id == project.id)
            
    total = query.count()
    offset = (page - 1) * page_size
    logs = query.order_by(QueryLog.created_at.desc()).offset(offset).limit(page_size).all()
    
    items = []
    for log in logs:
        project_name = None
        if log.project_id:
            proj = db.query(Project).filter(Project.id == log.project_id).first()
            if proj:
                project_name = proj.name
                
        # Format date outputs
        created_local = log.created_at
        date_str = created_local.strftime("%b %d, %Y")
        time_str = created_local.strftime("%H:%M")
        
        items.append(
            HistoryItem(
                id=log.id,
                query=log.query_text,
                answer=log.answer_text,
                date=date_str,
                time=time_str,
                project=project_name,
                type="Hybrid",
                status=log.status,
                latency_ms=log.latency_ms
            )
        )
        
    return HistoryResponse(
        items=items,
        page=page,
        page_size=page_size,
        total=total
    )


@router.get("/{id}", response_model=HistoryItem)
def get_history_item(
    id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get single query interaction details by record identifier."""
    log = db.query(QueryLog).filter(QueryLog.id == id, QueryLog.user_id == current_user.id).first()
    if not log:
        raise HTTPException(status_code=404, detail="History item not found")
        
    project_name = None
    if log.project_id:
        proj = db.query(Project).filter(Project.id == log.project_id).first()
        if proj:
            project_name = proj.name
            
    created_local = log.created_at
    date_str = created_local.strftime("%b %d, %Y")
    time_str = created_local.strftime("%H:%M")
    
    return HistoryItem(
        id=log.id,
        query=log.query_text,
        answer=log.answer_text,
        date=date_str,
        time=time_str,
        project=project_name,
        type="Hybrid",
        status=log.status,
        latency_ms=log.latency_ms
    )
