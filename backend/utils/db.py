"""Database engine, session factory, and bootstrap helpers."""

from __future__ import annotations

from contextlib import contextmanager
from pathlib import Path
from typing import Generator

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from config import get_settings
from model.db_models import AlertRule, Base, ConversationSession, DocumentChunk, NotificationLog, Project, QueryLog, SystemMetric, User


settings = get_settings()


def create_database_url() -> str:
	return settings.database_url_normalized


def create_engine_instance() -> Engine:
	database_url = create_database_url()
	engine_kwargs: dict = {"future": True, "pool_pre_ping": True}

	if database_url.startswith("sqlite:///"):
		if database_url.endswith(":memory:"):
			engine_kwargs["connect_args"] = {"check_same_thread": False}
			engine_kwargs["poolclass"] = StaticPool
		else:
			database_path = Path(database_url.replace("sqlite:///", "", 1))
			database_path.parent.mkdir(parents=True, exist_ok=True)
			engine_kwargs["connect_args"] = {"check_same_thread": False}

	return create_engine(database_url, **engine_kwargs)


engine = create_engine_instance()
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, expire_on_commit=False, future=True)


def get_db() -> Generator[Session, None, None]:
	db = SessionLocal()
	try:
		yield db
		db.commit()
	except Exception:
		db.rollback()
		raise
	finally:
		db.close()


def get_session() -> Session:
	return SessionLocal()


def init_db(seed_demo_data: bool | None = None) -> None:
	Base.metadata.create_all(bind=engine)
	if seed_demo_data is None:
		seed_demo_data = settings.seed_demo_data
	if seed_demo_data:
		seed_development_data()


def ping_database() -> dict:
	try:
		with engine.connect() as connection:
			connection.execute(text("SELECT 1"))
		return {"database": "connected", "url_type": engine.url.get_backend_name()}
	except SQLAlchemyError as exc:
		return {"database": "disconnected", "error": str(exc), "url_type": engine.url.get_backend_name()}


def get_transaction():
	@contextmanager
	def _transaction() -> Generator[Session, None, None]:
		session = SessionLocal()
		try:
			yield session
			session.commit()
		except Exception:
			session.rollback()
			raise
		finally:
			session.close()

	return _transaction()


def maybe_drop_and_recreate() -> None:
	if settings.is_production:
		raise RuntimeError("Refusing to drop and recreate production database")
	Base.metadata.drop_all(bind=engine)
	Base.metadata.create_all(bind=engine)


def seed_development_data() -> None:
	from utils.auth import hash_password

	session = SessionLocal()
	try:
		if session.query(User).count() > 0:
			return

		demo_user = User(
			name="Demo User",
			email="demo@adia.local",
			hashed_password=hash_password("Password123!"),
			is_active=True,
			role="admin",
		)
		session.add(demo_user)
		session.flush()

		projects = [
			Project(
				owner_id=demo_user.id,
				route_id="q4-revenue-analysis",
				name="Q4 Revenue Analysis",
				description="Revenue and conversion tracking workspace",
				status="Active",
				source_tags=["SQL", "RAG"],
			),
			Project(
				owner_id=demo_user.id,
				route_id="customer-retention",
				name="Customer Retention",
				description="Customer retention and cohort analysis workspace",
				status="Processing",
				source_tags=["SQL", "Insights"],
			),
		]
		session.add_all(projects)
		session.flush()

		session.add_all(
			[
				SystemMetric(metric_name="monthly_revenue", metric_value=58400, unit="USD", source="seed", project_id=projects[0].id),
				SystemMetric(metric_name="avg_latency_ms", metric_value=142, unit="ms", source="seed", project_id=projects[0].id),
				SystemMetric(metric_name="query_count", metric_value=1840, unit="count", source="seed", project_id=projects[0].id),
				SystemMetric(metric_name="uptime_percent", metric_value=99.95, unit="percent", source="seed"),
			]
		)

		rules = [
			AlertRule(
				user_id=demo_user.id,
				project_id=projects[0].id,
				metric="monthly_revenue",
				operator="<",
				threshold=50000,
				notification_type="email",
				quiet_hours_start="22:00",
				quiet_hours_end="07:00",
				is_active=True,
			),
			AlertRule(
				user_id=demo_user.id,
				project_id=projects[0].id,
				metric="avg_latency_ms",
				operator=">",
				threshold=200,
				notification_type="in_app",
				quiet_hours_start="23:00",
				quiet_hours_end="06:00",
				is_active=True,
			),
		]
		session.add_all(rules)
		session.flush()

		session.add_all(
			[
				QueryLog(
					user_id=demo_user.id,
					project_id=projects[0].id,
					session_id="demo-session-001",
					query_text="Show monthly revenue growth for 2024",
					answer_text="Revenue increased steadily through the quarter.",
					status="complete",
					sources=["SQL", "INSIGHT"],
					execution_trace=[{"tool": "sql_engine", "observation": "monthly revenue rows"}],
					confidence=0.93,
					latency_ms=182,
				),
				QueryLog(
					user_id=demo_user.id,
					project_id=projects[0].id,
					session_id="demo-session-002",
					query_text="Why did conversion drop in March?",
					answer_text="Conversion dropped because checkout abandonment increased.",
					status="complete",
					sources=["SQL", "RAG", "INSIGHT"],
					execution_trace=[{"tool": "rag_engine", "observation": "campaign notes"}],
					confidence=0.88,
					latency_ms=211,
				),
			]
		)

		session.add(
			ConversationSession(
				session_id="demo-session-001",
				user_id=demo_user.id,
				project_id=projects[0].id,
				summary="User is investigating revenue trends and conversion changes.",
				recent_turns=[
					{"role": "user", "content": "Show monthly revenue growth for 2024"},
					{"role": "assistant", "content": "Revenue increased steadily through the quarter."},
				],
			)
		)

		session.add(
			DocumentChunk(
				source_name="campaign_notes.txt",
				chunk_index=0,
				content="The March checkout flow had a higher abandonment rate and the campaign underperformed.",
				metadata_json={"project": "q4-revenue-analysis"},
				embedding=[0.3, 0.7, 0.2],
			)
		)

		session.add(
			NotificationLog(
				rule_id=rules[0].id,
				user_id=demo_user.id,
				project_id=projects[0].id,
				triggered_value=42000,
				status="delivered",
				channel="email",
				message="Revenue threshold reached",
				is_read=False,
			)
		)

		session.commit()
	finally:
		session.close()

