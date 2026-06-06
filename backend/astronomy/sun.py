"""태양 이벤트 — 일몰/일출/박명 시각 계산 (AstroPy 기반)."""

from datetime import datetime, timedelta, timezone

from astropy.coordinates import AltAz, EarthLocation, get_sun
from astropy.time import Time
import astropy.units as u
import numpy as np

KST = timezone(timedelta(hours=9))


def _find_sun_crossing(
    latitude: float,
    longitude: float,
    date_utc: datetime,
    target_alt: float,
    rising: bool,
) -> str | None:
    """태양이 특정 고도를 횡단하는 시각을 이진 탐색으로 구한다.

    Args:
        target_alt: 목표 고도 (일몰=0, 시민박명=-6, 천문박명=-18)
        rising: True=상승(일출), False=하강(일몰)

    Returns:
        ISO 8601 KST 문자열 또는 None (횡단 없음).
    """
    location = EarthLocation(lat=latitude * u.deg, lon=longitude * u.deg)

    # 탐색 범위: 해당 날 정오(UTC) 기준 ±18시간
    noon_utc = date_utc.replace(hour=12, minute=0, second=0, microsecond=0)
    if rising:
        start = noon_utc
        end = noon_utc + timedelta(hours=18)
    else:
        start = noon_utc - timedelta(hours=6)
        end = noon_utc + timedelta(hours=12)

    # 1분 간격 샘플링으로 횡단점 근사
    times = Time(
        [start + timedelta(minutes=i) for i in range(int((end - start).total_seconds() / 60))]
    )
    altaz_frame = AltAz(obstime=times, location=location)
    sun_altaz = get_sun(times).transform_to(altaz_frame)
    alts = sun_altaz.alt.deg

    # 횡단점 탐색
    diffs = alts - target_alt
    crossings = np.where(np.diff(np.sign(diffs)))[0]

    for idx in crossings:
        # rising: 음→양, setting: 양→음
        if rising and diffs[idx] < 0 and diffs[idx + 1] >= 0:
            # 선형 보간
            frac = -diffs[idx] / (diffs[idx + 1] - diffs[idx])
            crossing_time = start + timedelta(minutes=idx + frac)
            return crossing_time.replace(tzinfo=timezone.utc).astimezone(KST).isoformat(timespec="seconds")
        elif not rising and diffs[idx] > 0 and diffs[idx + 1] <= 0:
            frac = diffs[idx] / (diffs[idx] - diffs[idx + 1])
            crossing_time = start + timedelta(minutes=idx + frac)
            return crossing_time.replace(tzinfo=timezone.utc).astimezone(KST).isoformat(timespec="seconds")

    return None


def compute_sun_events(latitude: float, longitude: float, date_utc: datetime) -> dict:
    """일몰/일출/시민박명/천문박명 시각을 계산한다.

    Returns:
        {"sunset", "sunrise", "civil_twilight_end",
         "astronomical_twilight_end", "astronomical_twilight_start"}
        각 값은 ISO 8601 KST 문자열 또는 None.
    """
    return {
        "sunset": _find_sun_crossing(latitude, longitude, date_utc, 0.0, rising=False),
        "sunrise": _find_sun_crossing(latitude, longitude, date_utc, 0.0, rising=True),
        "civil_twilight_end": _find_sun_crossing(latitude, longitude, date_utc, -6.0, rising=False),
        "astronomical_twilight_end": _find_sun_crossing(latitude, longitude, date_utc, -18.0, rising=False),
        "astronomical_twilight_start": _find_sun_crossing(latitude, longitude, date_utc, -18.0, rising=True),
    }
