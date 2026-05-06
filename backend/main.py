"""FastAPI application entrypoint for ADIA."""

from __future__ import annotations

import logging
import time
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.exc import SQLAlchemyError

from config import get_settings
from controller.analytics import metrics_router, router as analytics_router
from controller.auth import router as auth_router
from controller.history import router as history_router
from controller.notification import router as notification_router
from controller.query import project_router, router as query_router, sources_router
from engine.scheduler import NotificationScheduler
from model.schemas import AppInfo, ReadinessResponse, SystemHealthResponse
from stats.analytics_service import build_dashboard_metrics
from utils.db import init_db, ping_database
from utils.logger import clear_request_id, get_logger, set_request_id, setup_logging


settings = get_settings()
logger = get_logger(__name__)
scheduler = NotificationScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(settings.log_level)
    settings.chart_dir_path.mkdir(parents=True, exist_ok=True)
    settings.vector_store_dir.mkdir(parents=True, exist_ok=True)
    init_db(seed_demo_data=settings.seed_demo_data)
    if settings.enable_scheduler:
        scheduler.start()
    app.state.scheduler = scheduler
    yield
    if settings.enable_scheduler:
        scheduler.stop()


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description=settings.description,
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def request_context_middleware(request: Request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid4()))
        set_request_id(request_id)
        started_at = datetime.now(timezone.utc)
        try:
            response = await call_next(request)
            response.headers["X-Request-ID"] = request_id
            duration_ms = int((datetime.now(timezone.utc) - started_at).total_seconds() * 1000)
            logger.info(
                "request_completed",
                extra={
                    "route": str(request.url.path),
                    "status": response.status_code,
                    "duration_ms": duration_ms,
                },
            )
            return response
        finally:
            clear_request_id()

    app.include_router(auth_router)
    app.include_router(query_router)
    app.include_router(project_router)
    app.include_router(sources_router)
    app.include_router(history_router)
    app.include_router(analytics_router)
    app.include_router(metrics_router)
    app.include_router(notification_router)

    app.mount("/static", StaticFiles(directory=str(settings.static_dir)), name="static")

    @app.get("/", response_model=AppInfo)
    def root() -> AppInfo:
        return AppInfo(name=settings.app_name, version=settings.app_version, status="ready")

    @app.get("/api/system/health", response_model=SystemHealthResponse)
    def health() -> SystemHealthResponse:
        database_result = ping_database()
        scheduler_state = scheduler.status()
        vector_store_status = "available" if settings.vector_store_dir.exists() else "missing"
        status = "healthy" if database_result.get("database") == "connected" else "degraded"
        return SystemHealthResponse(
            status=status,
            database=database_result.get("database", "unknown"),
            scheduler="running" if scheduler_state.running else "stopped",
            agent="ready",
            vector_store=vector_store_status,
        )

    @app.get("/api/system/readiness", response_model=ReadinessResponse)
    def readiness() -> ReadinessResponse:
        database_result = ping_database()
        scheduler_state = scheduler.status()
        ready = database_result.get("database") == "connected"
        message = "ready" if ready else "database unavailable"
        if settings.enable_scheduler and not scheduler_state.running:
            message = f"{message}; scheduler not running"
        return ReadinessResponse(
            ready=ready,
            database=database_result.get("database", "unknown"),
            scheduler="running" if scheduler_state.running else "stopped",
            message=message,
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(status_code=422, content={"detail": exc.errors(), "error_code": "validation_error"})

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        if isinstance(exc, SQLAlchemyError):
            logger.error("database_error", extra={"route": str(request.url.path), "error": str(exc)})
        else:
            logger.error("unhandled_error", extra={"route": str(request.url.path), "error": str(exc)})
        return JSONResponse(status_code=500, content={"detail": "Internal server error", "error_code": "internal_error"})

    return app


app = create_app()
