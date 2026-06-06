"""API Pydantic 모델 — 요청/응답 스키마 정의."""

from pydantic import BaseModel, Field


class ObserveRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    datetime_utc: str
    bortle_class: int = Field(..., ge=1, le=9)


class StarCoord(BaseModel):
    hip: int
    alt: float
    az: float


class LinePair(BaseModel):
    from_star: StarCoord = Field(..., alias="from")
    to_star: StarCoord = Field(..., alias="to")

    model_config = {"populate_by_name": True}


class ConstellationResult(BaseModel):
    code: str
    name_ko: str
    score: float
    visible_star_count: int
    total_star_count: int
    avg_altitude: float
    line_pairs_with_coords: list[LinePair]


class VisibleStar(BaseModel):
    hip: int
    ra: float
    dec: float
    mag: float
    proper: str | None = None
    con: str
    alt: float
    az: float


class SunEvents(BaseModel):
    sunset: str | None = None
    sunrise: str | None = None
    civil_twilight_end: str | None = None
    astronomical_twilight_end: str | None = None
    astronomical_twilight_start: str | None = None


class MoonPhase(BaseModel):
    phase: float
    illumination: float
    phase_name: str
    emoji: str


class ObserveResponse(BaseModel):
    visible_stars: list[VisibleStar]
    constellations: list[ConstellationResult]
    top3: list[str]
    sun: SunEvents
    moon: MoonPhase
    limiting_magnitude: float


class Location(BaseModel):
    key: str
    name: str
    lat: float
    lon: float
    default_bortle: int


class ConstellationStar(BaseModel):
    hip: int
    proper: str | None = None
    bayer: str | None = None
    mag: float


class ConstellationDetail(BaseModel):
    code: str
    name_ko: str
    name_en: str
    name_la: str
    myth: str
    stars: list[ConstellationStar]
