"""천문 계산 단위 테스트."""

from datetime import datetime, timezone

import pytest

from backend.astronomy.coordinates import compute_alt_az
from backend.astronomy.moon import compute_moon_phase
from backend.astronomy.scoring import BORTLE_TO_LIMITING_MAG, filter_visible_stars
from backend.astronomy.sun import compute_sun_events
from backend.data.loader import load_constellations, load_stars


@pytest.fixture
def stars_df():
    return load_stars()


@pytest.fixture
def seoul_summer_night():
    """서울 강남, 2026-06-06 21:30 KST = 12:30 UTC."""
    return {
        "latitude": 37.498,
        "longitude": 127.028,
        "datetime_utc": datetime(2026, 6, 6, 12, 30, tzinfo=timezone.utc),
    }


class TestCoordinates:
    def test_compute_alt_az_returns_columns(self, stars_df, seoul_summer_night):
        result = compute_alt_az(
            stars_df,
            seoul_summer_night["latitude"],
            seoul_summer_night["longitude"],
            seoul_summer_night["datetime_utc"],
        )
        assert "alt" in result.columns
        assert "az" in result.columns
        assert len(result) == len(stars_df)

    def test_alt_range(self, stars_df, seoul_summer_night):
        result = compute_alt_az(
            stars_df,
            seoul_summer_night["latitude"],
            seoul_summer_night["longitude"],
            seoul_summer_night["datetime_utc"],
        )
        assert result["alt"].min() >= -90
        assert result["alt"].max() <= 90


class TestVisibility:
    def test_bortle_monotonic_decrease(self, stars_df, seoul_summer_night):
        """Bortle 1→9 시 visible stars 단조 감소."""
        result = compute_alt_az(
            stars_df,
            seoul_summer_night["latitude"],
            seoul_summer_night["longitude"],
            seoul_summer_night["datetime_utc"],
        )
        prev_count = float("inf")
        for bortle in range(1, 10):
            lim_mag = BORTLE_TO_LIMITING_MAG[bortle]
            visible = filter_visible_stars(result, lim_mag)
            count = len(visible)
            assert count <= prev_count, f"Bortle {bortle}: {count} > {prev_count}"
            prev_count = count


class TestSunEvents:
    def test_seoul_sunset_june(self, seoul_summer_night):
        """서울 6/6 일몰 ≈ 19:48 KST (±10분)."""
        events = compute_sun_events(
            seoul_summer_night["latitude"],
            seoul_summer_night["longitude"],
            seoul_summer_night["datetime_utc"],
        )
        assert events["sunset"] is not None
        # 19:48 KST = 파싱해서 시간 확인
        sunset_str = events["sunset"]
        hour = int(sunset_str[11:13])
        minute = int(sunset_str[14:16])
        sunset_minutes = hour * 60 + minute
        expected_minutes = 19 * 60 + 48
        assert abs(sunset_minutes - expected_minutes) <= 10


class TestMoonPhase:
    def test_phase_range(self):
        dt = datetime(2026, 6, 6, 12, 30, tzinfo=timezone.utc)
        result = compute_moon_phase(dt)
        assert 0 <= result["phase"] <= 1
        assert 0 <= result["illumination"] <= 1
        assert result["phase_name"] != ""
        assert result["emoji"] != ""


class TestDataLoading:
    def test_stars_count(self, stars_df):
        assert len(stars_df) == 8920

    def test_constellations_count(self):
        constellations = load_constellations()
        assert len(constellations) == 88
