"""Logging configuration for ADIA backend."""

from __future__ import annotations

import logging
from contextvars import ContextVar
from typing import Optional

_request_id: ContextVar[Optional[str]] = ContextVar("request_id", default=None)


class RequestIdFilter(logging.Filter):
    """Filter to inject request_id context variable into log records."""
    def filter(self, record):
        record.request_id = _request_id.get() or "system"
        return True


def setup_logging(log_level: str = "INFO"):
    """Set up log formatting and base configurations."""
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)
    
    # Avoid duplicate handlers if setup_logging is called multiple times
    if not any(isinstance(h, logging.StreamHandler) for h in root_logger.handlers):
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '[%(asctime)s] %(levelname)s in %(name)s [%(request_id)s]: %(message)s'
        )
        handler.setFormatter(formatter)
        handler.addFilter(RequestIdFilter())
        root_logger.addHandler(handler)


def get_logger(name: str) -> logging.Logger:
    """Helper to return logger instance."""
    return logging.getLogger(name)


def set_request_id(value: str):
    """Set request correlation ID."""
    _request_id.set(value)


def clear_request_id():
    """Clear request correlation ID."""
    _request_id.set(None)
