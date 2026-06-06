"""좌표 변환 — AstroPy 벡터 연산으로 적도→지평 좌표 일괄 변환."""

from datetime import datetime

import numpy as np
from astropy.coordinates import AltAz, EarthLocation, SkyCoord
from astropy.time import Time
import astropy.units as u
import pandas as pd


# 모듈 레벨 캐시: SkyCoord 배열 (ICRS, 불변)
_sky_coord_cache: SkyCoord | None = None
_cached_ra: np.ndarray | None = None
_cached_dec: np.ndarray | None = None


def _get_sky_coords(stars_df: pd.DataFrame) -> SkyCoord:
    """stars DataFrame 으로부터 SkyCoord 배열을 생성/캐싱한다."""
    global _sky_coord_cache, _cached_ra, _cached_dec

    ra_arr = stars_df["ra"].values
    dec_arr = stars_df["dec"].values

    if (
        _sky_coord_cache is None
        or _cached_ra is None
        or len(ra_arr) != len(_cached_ra)
        or not np.array_equal(ra_arr, _cached_ra)
    ):
        _cached_ra = ra_arr
        _cached_dec = dec_arr
        _sky_coord_cache = SkyCoord(
            ra=ra_arr * u.hourangle,
            dec=dec_arr * u.deg,
            frame="icrs",
        )

    return _sky_coord_cache


def compute_alt_az(
    stars_df: pd.DataFrame,
    latitude: float,
    longitude: float,
    datetime_utc: datetime,
) -> pd.DataFrame:
    """8,920개 별의 Alt/Az 를 벡터 연산으로 일괄 계산한다.

    Returns:
        stars_df 에 'alt', 'az' 컬럼이 추가된 DataFrame (복사본).
    """
    sky_coords = _get_sky_coords(stars_df)

    location = EarthLocation(lat=latitude * u.deg, lon=longitude * u.deg)
    obs_time = Time(datetime_utc)
    altaz_frame = AltAz(obstime=obs_time, location=location)

    altaz_coords = sky_coords.transform_to(altaz_frame)

    result = stars_df.copy()
    result["alt"] = altaz_coords.alt.deg
    result["az"] = altaz_coords.az.deg

    return result
