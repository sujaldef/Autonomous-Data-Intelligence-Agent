"""Runtime settings for the ADIA backend."""

from __future__ import annotations

from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path
from typing import List
import os


BASE_DIR = Path(__file__).resolve().parent


def _parse_bool(value: str | bool | None, default: bool) -> bool:
	if value is None:
		return default
	if isinstance(value, bool):
		return value
	return value.strip().lower() in {"1", "true", "yes", "on"}


def _parse_int(value: str | int | None, default: int) -> int:
	if value is None or value == "":
		return default
	return int(value)


def _parse_list(value: str | List[str] | None, default: List[str]) -> List[str]:
	if value is None:
		return list(default)
	if isinstance(value, list):
		return [item.strip() for item in value if item and item.strip()]
	return [item.strip() for item in value.split(",") if item.strip()]


def resolve_path(raw_path: str | Path, base_dir: Path = BASE_DIR) -> Path:
	path = Path(raw_path)
	if not path.is_absolute():
		path = base_dir / path
	return path.resolve()


@dataclass(frozen=True)
class Settings:
	app_name: str = "ADIA Backend"
	app_version: str = "1.0.0"
	description: str = "Production backend for ADIA"
	environment: str = "development"
	database_url: str = "sqlite:///./app.db"
	jwt_secret: str = "change-me-in-production"
	jwt_algorithm: str = "HS256"
	access_token_expire_minutes: int = 60 * 24
	cors_origins: List[str] = field(default_factory=lambda: ["http://localhost:5173"])
	chart_dir: str = "static/charts"
	vector_store_path: str = "data/vector_store"
	log_level: str = "INFO"
	enable_scheduler: bool = True
	scheduler_interval_seconds: int = 300
	seed_demo_data: bool = True
	max_query_results: int = 25
	max_history_page_size: int = 50
	max_rag_chunks: int = 5
	default_timezone: str = "UTC"
	llm_provider: str = "local"
	llm_model: str = "deterministic-local"
	allow_debug_routes: bool = False

	@property
	def base_dir(self) -> Path:
		return BASE_DIR

	@property
	def static_dir(self) -> Path:
		return resolve_path("static", self.base_dir)

	@property
	def chart_dir_path(self) -> Path:
		return resolve_path(self.chart_dir, self.base_dir)

	@property
	def vector_store_dir(self) -> Path:
		return resolve_path(self.vector_store_path, self.base_dir)

	@property
	def database_url_normalized(self) -> str:
		url = self.database_url.strip()
		if url.startswith("sqlite:///") and not url.startswith("sqlite:////"):
			sqlite_path = url.replace("sqlite:///", "", 1)
			if sqlite_path in {"", ":memory:"}:
				return url
			resolved = resolve_path(sqlite_path, self.base_dir)
			return f"sqlite:///{resolved.as_posix()}"
		return url

	@property
	def cors_origin_list(self) -> List[str]:
		return list(self.cors_origins)

	@property
	def is_production(self) -> bool:
		return self.environment.strip().lower() in {"prod", "production"}


def _build_settings() -> Settings:
	settings = Settings(
		app_name=os.getenv("APP_NAME", "ADIA Backend"),
		app_version=os.getenv("APP_VERSION", "1.0.0"),
		description=os.getenv("APP_DESCRIPTION", "Production backend for ADIA"),
		environment=os.getenv("ENVIRONMENT", os.getenv("APP_ENV", "development")),
		database_url=os.getenv("DATABASE_URL", "sqlite:///./app.db"),
		jwt_secret=os.getenv("JWT_SECRET", "change-me-in-production"),
		jwt_algorithm=os.getenv("JWT_ALGORITHM", "HS256"),
		access_token_expire_minutes=_parse_int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"), 60 * 24),
		cors_origins=_parse_list(os.getenv("CORS_ORIGINS"), ["http://localhost:5173"]),
		chart_dir=os.getenv("CHART_DIR", "static/charts"),
		vector_store_path=os.getenv("VECTOR_STORE_PATH", "data/vector_store"),
		log_level=os.getenv("LOG_LEVEL", "INFO"),
		enable_scheduler=_parse_bool(os.getenv("ENABLE_SCHEDULER"), True),
		scheduler_interval_seconds=_parse_int(os.getenv("SCHEDULER_INTERVAL_SECONDS"), 300),
		seed_demo_data=_parse_bool(os.getenv("SEED_DEMO_DATA"), True),
		max_query_results=_parse_int(os.getenv("MAX_QUERY_RESULTS"), 25),
		max_history_page_size=_parse_int(os.getenv("MAX_HISTORY_PAGE_SIZE"), 50),
		max_rag_chunks=_parse_int(os.getenv("MAX_RAG_CHUNKS"), 5),
		default_timezone=os.getenv("DEFAULT_TIMEZONE", "UTC"),
		llm_provider=os.getenv("LLM_PROVIDER", "local"),
		llm_model=os.getenv("LLM_MODEL", "deterministic-local"),
		allow_debug_routes=_parse_bool(os.getenv("ALLOW_DEBUG_ROUTES"), False),
	)

	if settings.is_production and settings.jwt_secret == "change-me-in-production":
		raise RuntimeError("JWT_SECRET must be set in production")

	return settings


@lru_cache(maxsize=1)
def get_settings() -> Settings:
	return _build_settings()

