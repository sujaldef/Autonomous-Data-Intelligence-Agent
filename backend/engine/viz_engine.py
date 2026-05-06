"""Chart rendering utilities for generated backend visuals."""

from __future__ import annotations

from hashlib import sha1
from pathlib import Path
from typing import Sequence
from uuid import uuid4

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

from config import get_settings
from model.schemas import TimeSeriesPoint


settings = get_settings()


def _sanitize_filename(value: str) -> str:
    return "".join(character for character in value if character.isalnum() or character in {"-", "_"}).strip("_") or "chart"


def _unique_filename(title: str, points: Sequence[TimeSeriesPoint], filename: str | None = None) -> str:
    if filename:
        raw_name = filename if filename.lower().endswith(".png") else f"{filename}.png"
        return raw_name
    fingerprint = sha1(str([(point.label, point.value) for point in points]).encode("utf-8")).hexdigest()[:10]
    unique_suffix = uuid4().hex[:8]
    return f"chart_{_sanitize_filename(title)}_{fingerprint}_{unique_suffix}.png"


def render_chart(points: Sequence[TimeSeriesPoint], title: str, y_label: str = "Value", filename: str | None = None) -> str:
    chart_dir = settings.chart_dir_path
    chart_dir.mkdir(parents=True, exist_ok=True)
    output_name = _unique_filename(title, points, filename=filename)
    output_path = chart_dir / output_name

    labels = [point.label for point in points] or ["No data"]
    values = [float(point.value) for point in points] or [0.0]
    positions = list(range(len(values)))

    fig, ax = plt.subplots(figsize=(10, 4.8), dpi=160)
    fig.patch.set_facecolor("white")
    ax.set_facecolor("#f8fafc")
    ax.plot(positions, values, color="#2563eb", linewidth=2.8, marker="o")
    ax.fill_between(positions, values, color="#2563eb", alpha=0.10)
    ax.set_xticks(positions)
    ax.set_xticklabels(labels)
    ax.set_title(title, fontsize=14, fontweight="bold", color="#0f172a")
    ax.set_ylabel(y_label, color="#334155")
    ax.tick_params(axis="x", labelrotation=30, labelsize=8, colors="#475569")
    ax.tick_params(axis="y", labelsize=8, colors="#475569")
    ax.grid(True, axis="y", alpha=0.2)
    fig.tight_layout()
    fig.savefig(output_path, format="png", bbox_inches="tight")
    plt.close(fig)

    return f"/static/charts/{Path(output_path).name}"