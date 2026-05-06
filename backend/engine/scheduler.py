"""Background evaluator for AlertRule records."""

from __future__ import annotations

import threading
import time
from dataclasses import dataclass
from datetime import datetime, time as time_type, timezone
from typing import Any

from sqlalchemy.orm import Session

from config import get_settings
from engine.action_engine import format_confirmation
from model.db_models import AlertRule, NotificationLog
from stats.analytics_service import resolve_metric_value
from utils.db import SessionLocal
from utils.logger import get_logger


settings = get_settings()
logger = get_logger(__name__)


def _parse_time(value: str | None) -> time_type | None:
    if not value:
        return None
    hour, minute = value.split(":", 1)
    return time_type(hour=int(hour), minute=int(minute))


def _normalize_datetime(value: datetime | None) -> datetime | None:
    if value is None:
        return None
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def _within_quiet_hours(rule: AlertRule, now: datetime) -> bool:
    start = _parse_time(rule.quiet_hours_start)
    end = _parse_time(rule.quiet_hours_end)
    if not start or not end:
        return False
    current = now.time()
    if start < end:
        return start <= current <= end
    return current >= start or current <= end


def _is_duplicate_trigger(rule: AlertRule, triggered_value: float, now: datetime, interval_seconds: int) -> bool:
    last_triggered_at = _normalize_datetime(rule.last_triggered_at)
    if last_triggered_at is None:
        return False
    if rule.last_triggered_value is None:
        return False
    delta = (now - last_triggered_at).total_seconds()
    return delta < interval_seconds and float(rule.last_triggered_value) == float(triggered_value)


def _evaluate_condition(value: float, operator: str, threshold: float) -> bool:
    if operator == "<":
        return value < threshold
    if operator == ">":
        return value > threshold
    if operator == "=":
        return value == threshold
    if operator == "<=":
        return value <= threshold
    if operator == ">=":
        return value >= threshold
    return False


def _dispatch_status(rule: AlertRule, quiet: bool) -> str:
    if quiet:
        return "suppressed"
    return "delivered"


def evaluate_active_rules(db: Session) -> dict[str, int]:
    now = datetime.now(timezone.utc)
    active_rules = db.query(AlertRule).filter(AlertRule.is_active.is_(True)).all()
    created_logs = 0
    skipped_rules = 0

    for rule in active_rules:
        triggered_value = resolve_metric_value(rule.metric, db, user_id=rule.user_id, project_id=rule.project_id)
        if triggered_value is None:
            skipped_rules += 1
            continue

        if _is_duplicate_trigger(rule, triggered_value, now, settings.scheduler_interval_seconds):
            skipped_rules += 1
            continue

        if not _evaluate_condition(triggered_value, rule.operator, float(rule.threshold)):
            continue

        quiet = _within_quiet_hours(rule, now)
        status = _dispatch_status(rule, quiet)
        notification_log = NotificationLog(
            rule_id=rule.id,
            user_id=rule.user_id,
            project_id=rule.project_id,
            triggered_value=float(triggered_value),
            status=status,
            channel=rule.notification_type,
            message=f"Rule {rule.metric} {rule.operator} {rule.threshold} triggered with value {triggered_value}",
            is_read=False,
        )
        rule.last_triggered_at = now
        rule.last_triggered_value = float(triggered_value)
        db.add(notification_log)
        created_logs += 1

    db.flush()
    return {"evaluated_rules": len(active_rules), "created_logs": created_logs, "skipped_rules": skipped_rules}


@dataclass
class SchedulerStatus:
    running: bool
    last_run: datetime | None
    last_result: dict[str, int] | None


class NotificationScheduler:
    def __init__(self, interval_seconds: int | None = None) -> None:
        self.interval_seconds = interval_seconds or settings.scheduler_interval_seconds
        self._stop_event = threading.Event()
        self._thread: threading.Thread | None = None
        self._lock = threading.Lock()
        self._last_run: datetime | None = None
        self._last_result: dict[str, int] | None = None

    def start(self) -> None:
        if not settings.enable_scheduler:
            logger.info("scheduler_disabled")
            return
        with self._lock:
            if self._thread and self._thread.is_alive():
                return
            self._stop_event.clear()
            self._thread = threading.Thread(target=self._run_loop, name="adia-notification-scheduler", daemon=True)
            self._thread.start()
            logger.info("scheduler_started")

    def stop(self) -> None:
        self._stop_event.set()
        thread = self._thread
        if thread and thread.is_alive():
            thread.join(timeout=5)
        logger.info("scheduler_stopped")

    def run_once(self) -> dict[str, int]:
        with SessionLocal() as db:
            result = evaluate_active_rules(db)
            db.commit()
        self._last_run = datetime.now(timezone.utc)
        self._last_result = result
        return result

    def _run_loop(self) -> None:
        while not self._stop_event.is_set():
            try:
                self.run_once()
            except Exception as exc:
                logger.error("scheduler_tick_failed", extra={"error": str(exc)})
            self._stop_event.wait(self.interval_seconds)

    def status(self) -> SchedulerStatus:
        return SchedulerStatus(running=bool(self._thread and self._thread.is_alive()), last_run=self._last_run, last_result=self._last_result)
