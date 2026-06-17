"""Database setup, engine configurations, and seeding utilities."""

from __future__ import annotations

import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from model.db_models import Base
from config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

engine = create_engine(
    settings.database_url_normalized,
    connect_args={"check_same_thread": False} if settings.database_url_normalized.startswith("sqlite") else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db(seed_demo_data: bool = True):
    """Create database tables and optionally seed demo data."""
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables initialized successfully.")
    if seed_demo_data:
        seed_development_data()


def get_db():
    """FastAPI Dependency for request-scoped database sessions."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def ping_database() -> dict:
    """Cheap connectivity check for readiness/health check."""
    try:
        db = SessionLocal()
        db.execute(Base.metadata.schema_check_select_1() if hasattr(Base.metadata, "schema_check_select_1") else text("SELECT 1"))
        db.close()
        return {"database": "connected"}
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return {"database": "disconnected"}


def seed_development_data():
    """Seed initial development users and sample projects."""
    from model.db_models import User, Project
    from utils.auth import hash_password
    
    db = SessionLocal()
    try:
        if db.query(User).count() == 0:
            demo_user = User(
                name="Demo User",
                email="demo@example.com",
                hashed_password=hash_password("password123"),
                role="user",
                is_active=True
            )
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)
            logger.info("Seeded demo user: demo@example.com / password123")
            
            # Seed a demo project
            demo_project = Project(
                owner_id=demo_user.id,
                route_id="q4-revenue-analysis",
                name="Q4 Revenue Analysis",
                description="Analysis of financial targets and anomalies.",
                status="Active",
                source_tags=["SQL", "RAG"]
            )
            db.add(demo_project)
            db.commit()
            logger.info("Seeded demo project: Q4 Revenue Analysis")
    except Exception as e:
        logger.error(f"Seeding development data failed: {e}")
        db.rollback()
    finally:
        db.close()
