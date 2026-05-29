"""Structured logging utilities for request and system traces."""

from __future__ import annotations

import json
import logging
import sys
from contextvars import ContextVar
from datetime import datetime, timezone
from typing import Any, Dict

from config import get_settings


settings = get_settings()
request_id_var: ContextVar[str | None] = ContextVar("request_id", default=None)


class RequestContextFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = request_id_var.get() or "-"
        return True


class StructuredFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload: Dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "request_id": getattr(record, "request_id", "-"),
        }
        for key in ("route", "status", "duration_ms", "user_id", "project_id", "error"):
            if hasattr(record, key):
                payload[key] = getattr(record, key)
        return json.dumps(payload, ensure_ascii=False)


def setup_logging(level: str | None = None) -> None:
    root_logger = logging.getLogger()
    if getattr(root_logger, "_adia_configured", False):
        return

    log_level = getattr(logging, (level or settings.log_level).upper(), logging.INFO)
    root_logger.handlers.clear()
    root_logger.setLevel(log_level)

    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(log_level)
    handler.addFilter(RequestContextFilter())
    handler.setFormatter(StructuredFormatter())
    root_logger.addHandler(handler)
    root_logger._adia_configured = True  # type: ignore[attr-defined]


def get_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, settings.log_level.upper(), logging.INFO))
    return logger


def set_request_id(value: str | None) -> None:
    request_id_var.set(value)


def clear_request_id() -> None:
    request_id_var.set(None)


def log_exception(error: Exception, context: Dict[str, Any] | None = None) -> None:
    logger = get_logger(__name__)
    extra = context or {}
    logger.error("Unhandled exception", extra={**extra, "error": str(error)})


def log_timing(operation: str, start, end, metadata: Dict[str, Any] | None = None) -> None:
    logger = get_logger(__name__)
    duration_ms = int((end - start).total_seconds() * 1000)
    logger.info(operation, extra={"duration_ms": duration_ms, **(metadata or {})})
