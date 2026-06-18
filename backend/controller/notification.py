"""Alert rule CRUD and notification logs dispatch routing."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from model.schemas import (
    AlertRuleCreate, AlertRuleUpdate, AlertRuleRead,
    NotificationLogRead, NotificationRulesResponse, NotificationLogsResponse,
    NotificationUnreadResponse
)
from utils.db import get_db
from utils.auth import get_current_user
from backend.engine.db_models import User, AlertRule, NotificationLog

router = APIRouter(prefix="/api/notifications", tags=["notifications"])


@router.post("/rules", response_model=AlertRuleRead)
def create_rule(
    payload: AlertRuleCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new metric thresholds check rule."""
    rule = AlertRule(
        user_id=current_user.id,
        project_id=payload.project_id,
        metric=payload.metric,
        operator=payload.operator,
        threshold=payload.threshold,
        notification_type=payload.notification_type,
        quiet_hours_start=payload.quiet_hours_start,
        quiet_hours_end=payload.quiet_hours_end,
        is_active=payload.is_active
    )
    db.add(rule)
    db.commit()
    db.refresh(rule)
    return rule


@router.get("/rules", response_model=NotificationRulesResponse)
def list_rules(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List threshold rules active for current user."""
    rules = db.query(AlertRule).filter(AlertRule.user_id == current_user.id).all()
    return NotificationRulesResponse(rules=rules, total=len(rules))


@router.patch("/rules/{id}", response_model=AlertRuleRead)
def update_rule(
    id: int,
    payload: AlertRuleUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Modify thresholds configurations or pause checking rules."""
    rule = db.query(AlertRule).filter(AlertRule.id == id, AlertRule.user_id == current_user.id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Alert rule not found")
        
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(rule, k, v)
        
    db.commit()
    db.refresh(rule)
    return rule


@router.delete("/rules/{id}")
def delete_rule(
    id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove rule configuration identifier."""
    rule = db.query(AlertRule).filter(AlertRule.id == id, AlertRule.user_id == current_user.id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Alert rule not found")
        
    db.delete(rule)
    db.commit()
    return {"detail": "Alert rule deleted"}


@router.get("/logs", response_model=NotificationLogsResponse)
def list_logs(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve history of rule trigger dispatches."""
    logs = db.query(NotificationLog).filter(NotificationLog.user_id == current_user.id).all()
    return NotificationLogsResponse(logs=logs, total=len(logs))


@router.get("/unread", response_model=NotificationUnreadResponse)
def get_unread_count(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve unread notification log counts."""
    count = db.query(NotificationLog).filter(
        NotificationLog.user_id == current_user.id,
        NotificationLog.is_read == False
    ).count()
    return NotificationUnreadResponse(unread_count=count)
