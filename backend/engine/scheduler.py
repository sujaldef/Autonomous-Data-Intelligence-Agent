"""Scheduler stub for background notification alerts processing."""

from __future__ import annotations

import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class SchedulerStatus:
    running: bool


class NotificationScheduler:
    """Mock background evaluator scheduler."""
    def __init__(self):
        self._running = False

    def start(self):
        self._running = True
        logger.info("NotificationScheduler started background evaluation thread.")

    def stop(self):
        self._running = False
        logger.info("NotificationScheduler stopped background evaluation thread.")

    def status(self) -> SchedulerStatus:
        return SchedulerStatus(running=self._running)
