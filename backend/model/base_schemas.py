"""Shared base models and validation mixins."""

from __future__ import annotations

from typing import Optional
from pydantic import BaseModel, ConfigDict


class ORMModel(BaseModel):
    """Base model for ORM-enabled schemas."""
    model_config = ConfigDict(from_attributes=True)


class EmailNormalizationMixin:
    """Mixin for email normalization validation."""
    @staticmethod
    def _normalize_email(value: str) -> str:
        """Normalize email to lowercase and strip whitespace."""
        return value.strip().lower() if value else value


class OperatorValidationMixin:
    """Mixin for operator validation."""
    VALID_OPERATORS = {"<", ">", "=", "<=", ">="}
    
    @staticmethod
    def _validate_operator(value: Optional[str]) -> Optional[str]:
        """Validate and normalize operator."""
        if value is None:
            return value
        normalized = value.strip()
        if normalized not in OperatorValidationMixin.VALID_OPERATORS:
            raise ValueError(f"operator must be one of {', '.join(OperatorValidationMixin.VALID_OPERATORS)}")
        return normalized
