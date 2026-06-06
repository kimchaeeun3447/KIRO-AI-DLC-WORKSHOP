"""달 위상 계산 — AstroPy 기반 phase + 한국어 이름 매핑."""

from datetime import datetime

from astropy.coordinates import get_body, get_sun
from astropy.time import Time
import numpy as np


# 달 위상 → 한국어 이름 + 이모지 매핑
_PHASE_TABLE: list[tuple[float, float, str, str]] = [
    (0.00, 0.03, "신월", "🌑"),
    (0.03, 0.25, "초승달", "🌒"),
    (0.25, 0.28, "상현달", "🌓"),
    (0.28, 0.47, "차오르는 달", "🌔"),
    (0.47, 0.53, "보름달", "🌕"),
    (0.53, 0.72, "기우는 달", "🌖"),
    (0.72, 0.75, "하현달", "🌗"),
    (0.75, 0.97, "그믐달", "🌘"),
    (0.97, 1.00, "신월", "🌑"),
]


def compute_moon_phase(datetime_utc: datetime) -> dict:
    """달 위상, illumination, 한국어 이름, 이모지를 계산한다.

    Returns:
        {"phase": float, "illumination": float,
         "phase_name": str, "emoji": str}
    """
    t = Time(datetime_utc)

    # 태양-달 이각(elongation) 기반 위상 계산
    sun = get_sun(t)
    moon = get_body("moon", t)

    elongation = sun.separation(moon).deg
    # phase: 0=신월, 0.5=보름, 1=신월
    # 달이 태양 뒤(elongation~180°)면 보름
    phase = elongation / 360.0

    # 더 정확한 위상 계산: 달의 적경이 태양보다 앞서는지로 waxing/waning 판단
    moon_ra = moon.ra.deg
    sun_ra = sun.ra.deg
    diff = (moon_ra - sun_ra) % 360

    if diff <= 180:
        # waxing (차오르는 중): phase 0→0.5
        phase = diff / 360.0
    else:
        # waning (기우는 중): phase 0.5→1
        phase = 1.0 - (360.0 - diff) / 360.0

    # illumination: 간단한 근사
    illumination = (1 - np.cos(2 * np.pi * phase)) / 2

    # 한국어 매핑
    phase_name = "신월"
    emoji = "🌑"
    for low, high, name, em in _PHASE_TABLE:
        if low <= phase < high:
            phase_name = name
            emoji = em
            break

    return {
        "phase": round(phase, 4),
        "illumination": round(float(illumination), 4),
        "phase_name": phase_name,
        "emoji": emoji,
    }
