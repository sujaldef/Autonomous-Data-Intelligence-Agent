"""Notification rule management and delivery log routes."""

from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from engine.action_engine import save_rule, validate_rule
from model.db_models import AlertRule, NotificationLog, Project, User
from model.schemas import (
    AlertRuleCreate,
    AlertRuleRead,
    AlertRuleUpdate,
    NotificationLogRead,
    NotificationLogsResponse,
    NotificationRulesResponse,
    NotificationUnreadResponse,
)
from utils.auth import get_current_user_dependency
from utils.db import get_db


router = APIRouter(prefix="/api/notifications", tags=["notifications"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def _current_user_dep(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    return get_current_user_dependency(db, token)


def _rule_to_read(rule: AlertRule) -> AlertRuleRead:
    return AlertRuleRead.model_validate(rule)


def _log_to_read(log: NotificationLog) -> NotificationLogRead:
    return NotificationLogRead.model_validate(log)


def _load_rule(db: Session, current_user: User, rule_id: int) -> AlertRule:
    rule = db.query(AlertRule).filter(AlertRule.id == rule_id, AlertRule.user_id == current_user.id).one_or_none()
    if not rule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification rule not found")
    return rule


@router.post("/rules", response_model=AlertRuleRead, status_code=status.HTTP_201_CREATED)
def create_rule(payload: AlertRuleCreate, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> AlertRuleRead:
    rule_payload = validate_rule(payload)
    if rule_payload.project_id is not None:
        project = db.query(Project).filter(Project.id == rule_payload.project_id, Project.owner_id == current_user.id).one_or_none()
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    rule = save_rule(rule_payload, current_user, db)
    return _rule_to_read(rule)


@router.get("/rules", response_model=NotificationRulesResponse)
def list_rules(db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> NotificationRulesResponse:
    rules = db.query(AlertRule).filter(AlertRule.user_id == current_user.id).order_by(AlertRule.created_at.desc()).all()
    return NotificationRulesResponse(rules=[_rule_to_read(rule) for rule in rules], total=len(rules))


@router.patch("/rules/{rule_id}", response_model=AlertRuleRead)
def update_rule(rule_id: int, payload: AlertRuleUpdate, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> AlertRuleRead:
    rule = _load_rule(db, current_user, rule_id)
    update_data = payload.model_dump(exclude_unset=True)
    if "project_id" in update_data and update_data["project_id"] is not None:
        project = db.query(Project).filter(Project.id == update_data["project_id"], Project.owner_id == current_user.id).one_or_none()
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    for key, value in update_data.items():
        setattr(rule, key, value)
    db.flush()
    db.refresh(rule)
    return _rule_to_read(rule)


@router.delete("/rules/{rule_id}", response_model=AlertRuleRead)
def delete_rule(rule_id: int, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> AlertRuleRead:
    rule = _load_rule(db, current_user, rule_id)
    rule.is_active = False
    db.flush()
    db.refresh(rule)
    return _rule_to_read(rule)


@router.get("/logs", response_model=NotificationLogsResponse)
def list_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(_current_user_dep),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=50),
    rule_id: int | None = Query(default=None),
    status_filter: str | None = Query(default=None, alias="status", max_length=40),
) -> NotificationLogsResponse:
    query = db.query(NotificationLog).filter(NotificationLog.user_id == current_user.id)
    if rule_id is not None:
        query = query.filter(NotificationLog.rule_id == rule_id)
    if status_filter:
        query = query.filter(NotificationLog.status == status_filter)
    total = query.count()
    rows = query.order_by(NotificationLog.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    return NotificationLogsResponse(logs=[_log_to_read(row) for row in rows], total=total)


@router.get("/unread", response_model=NotificationUnreadResponse)
def unread_count(db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> NotificationUnreadResponse:
    count = db.query(NotificationLog).filter(NotificationLog.user_id == current_user.id, NotificationLog.is_read.is_(False)).count()
    return NotificationUnreadResponse(unread_count=count)


@router.patch("/logs/{log_id}/read", response_model=NotificationLogRead)
def mark_log_read(log_id: int, db: Session = Depends(get_db), current_user: User = Depends(_current_user_dep)) -> NotificationLogRead:
    log = db.query(NotificationLog).filter(NotificationLog.id == log_id, NotificationLog.user_id == current_user.id).one_or_none()
    if not log:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification log not found")
    log.is_read = True
    log.read_at = datetime.now(timezone.utc)
    db.flush()
    db.refresh(log)
    return _log_to_read(log)
