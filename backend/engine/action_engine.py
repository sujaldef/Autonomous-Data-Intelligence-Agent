"""Controlled alert rule creation from user intent."""

from __future__ import annotations

from typing import Any, Mapping

from sqlalchemy.orm import Session

from model.db_models import AlertRule, User
from model.schemas import AlertRuleCreate


def validate_rule(spec: Mapping[str, Any] | AlertRuleCreate) -> AlertRuleCreate:
    """Validate and normalize alert rule specification.
    
    Args:
        spec: Alert rule specification as dict or schema object
        
    Returns:
        Validated AlertRuleCreate schema object
    """
    if isinstance(spec, AlertRuleCreate):
        return spec
    return AlertRuleCreate.model_validate(spec)


def save_rule(rule_payload: AlertRuleCreate, user: User, db: Session) -> AlertRule:
    """Persist alert rule to database.
    
    Args:
        rule_payload: Validated alert rule payload
        user: User creating the rule
        db: Database session
        
    Returns:
        Created AlertRule object
    """
    rule = AlertRule(
        user_id=user.id,
        project_id=rule_payload.project_id,
        metric=rule_payload.metric,
        operator=rule_payload.operator,
        threshold=rule_payload.threshold,
        notification_type=rule_payload.notification_type,
        quiet_hours_start=rule_payload.quiet_hours_start,
        quiet_hours_end=rule_payload.quiet_hours_end,
        is_active=rule_payload.is_active,
    )
    db.add(rule)
    db.flush()
    db.refresh(rule)
    return rule


def format_confirmation(rule: AlertRule) -> dict[str, Any]:
    """Format rule creation confirmation response.
    
    Args:
        rule: Created AlertRule object
        
    Returns:
        Confirmation dict with rule ID and details
    """
    return {
        "rule_id": rule.id,
        "status": "created",
        "metric": rule.metric,
        "operator": rule.operator,
        "threshold": rule.threshold,
        "notification_type": rule.notification_type,
    }


def run(action_spec: Mapping[str, Any] | AlertRuleCreate, user: User, db: Session) -> dict[str, Any]:
    """Execute alert rule creation workflow.
    
    Args:
        action_spec: Alert rule specification
        user: User executing the action
        db: Database session
        
    Returns:
        Rule creation confirmation
    """
    payload = validate_rule(action_spec)
    rule = save_rule(payload, user, db)
    return format_confirmation(rule)
