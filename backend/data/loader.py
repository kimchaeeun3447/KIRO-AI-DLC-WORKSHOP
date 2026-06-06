"""데이터 로더 — stars.csv + constellations.json 을 앱 시작 시 1회 로드하여 캐싱."""

import json
from pathlib import Path

import pandas as pd

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"

# 모듈 레벨 캐시
_stars_df: pd.DataFrame | None = None
_constellations: list[dict] | None = None


def load_stars() -> pd.DataFrame:
    """stars.csv 를 로드하고 캐싱한다."""
    global _stars_df
    if _stars_df is None:
        _stars_df = pd.read_csv(DATA_DIR / "stars.csv")
        _stars_df["hip"] = _stars_df["hip"].fillna(0).astype(int)
    return _stars_df


def load_constellations() -> list[dict]:
    """constellations.json 을 로드하고 캐싱한다."""
    global _constellations
    if _constellations is None:
        with open(DATA_DIR / "constellations.json", encoding="utf-8") as f:
            _constellations = json.load(f)
    return _constellations


def get_constellation_by_code(code: str) -> dict | None:
    """IAU 코드로 별자리 하나를 조회한다."""
    constellations = load_constellations()
    for c in constellations:
        if c["code"] == code:
            return c
    return None
