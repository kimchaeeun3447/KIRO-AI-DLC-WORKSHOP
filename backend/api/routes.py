"""API 라우터 — 3개 엔드포인트 정의."""

from datetime import datetime

from fastapi import APIRouter, HTTPException

from backend.api.models import (
    ConstellationDetail,
    ConstellationResult,
    ConstellationStar,
    LinePair,
    Location,
    MoonPhase,
    ObserveRequest,
    ObserveResponse,
    StarCoord,
    SunEvents,
    VisibleStar,
)
from backend.astronomy.coordinates import compute_alt_az
from backend.astronomy.moon import compute_moon_phase
from backend.astronomy.scoring import (
    BORTLE_TO_LIMITING_MAG,
    filter_visible_stars,
    score_constellations,
)
from backend.astronomy.sun import compute_sun_events
from backend.data.loader import (
    get_constellation_by_code,
    load_constellations,
    load_stars,
)

router = APIRouter(prefix="/api")

# 사전 정의 도시 8곳
LOCATIONS: list[dict] = [
    {"key": "seoul_gangnam", "name": "서울 강남", "lat": 37.498, "lon": 127.028, "default_bortle": 8},
    {"key": "seoul_jongno", "name": "서울 종로", "lat": 37.572, "lon": 126.977, "default_bortle": 8},
    {"key": "busan", "name": "부산 해운대", "lat": 35.163, "lon": 129.160, "default_bortle": 7},
    {"key": "daejeon", "name": "대전", "lat": 36.351, "lon": 127.385, "default_bortle": 7},
    {"key": "jeju", "name": "제주", "lat": 33.499, "lon": 126.531, "default_bortle": 5},
    {"key": "yeongwol", "name": "영월", "lat": 37.184, "lon": 128.462, "default_bortle": 3},
    {"key": "yangyang", "name": "양양", "lat": 38.075, "lon": 128.619, "default_bortle": 3},
    {"key": "muju", "name": "무주", "lat": 35.922, "lon": 127.661, "default_bortle": 3},
]


@router.get("/locations", response_model=list[Location])
def get_locations() -> list[dict]:
    """사전 정의 도시 8곳을 반환한다."""
    return LOCATIONS


@router.get("/constellations/{code}", response_model=ConstellationDetail)
def get_constellation(code: str):
    """별자리 코드로 상세 정보를 반환한다."""
    con = get_constellation_by_code(code)
    if con is None:
        raise HTTPException(status_code=404, detail=f"별자리를 찾을 수 없습니다: {code}")

    stars_df = load_stars()
    con_stars = stars_df[stars_df["con"] == code].sort_values("mag")

    stars_list = []
    for _, row in con_stars.iterrows():
        stars_list.append({
            "hip": int(row["hip"]),
            "proper": row["proper"] if isinstance(row["proper"], str) else None,
            "bayer": row["bayer"] if isinstance(row["bayer"], str) else None,
            "mag": round(float(row["mag"]), 2),
        })

    return {
        "code": con["code"],
        "name_ko": con["name_ko"],
        "name_en": con["name_en"],
        "name_la": con["name_la"],
        "myth": con["myth"],
        "stars": stars_list,
    }


@router.post("/observe", response_model=ObserveResponse)
def post_observe(request: ObserveRequest):
    """메인 관측 API — 천문 계산 + 가시성 필터링 + 추천."""
    # 1. datetime 파싱
    try:
        dt_utc = datetime.fromisoformat(request.datetime_utc.replace("Z", "+00:00"))
    except ValueError:
        raise HTTPException(status_code=422, detail="유효한 UTC 날짜시간을 입력하세요")

    # 2. 한계 등급 결정
    limiting_mag = BORTLE_TO_LIMITING_MAG[request.bortle_class]

    # 3. 데이터 로드
    stars_df = load_stars()
    constellations = load_constellations()

    # 4. 좌표 변환 (벡터 연산)
    stars_with_altaz = compute_alt_az(
        stars_df, request.latitude, request.longitude, dt_utc
    )

    # 5. 가시 별 필터링
    visible_df = filter_visible_stars(stars_with_altaz, limiting_mag)

    # 6. 별자리 점수 산출
    scored = score_constellations(stars_with_altaz, constellations, limiting_mag)

    # 7. Top 3
    top3 = [c["code"] for c in scored[:3]]

    # 8. 태양 이벤트
    sun_events = compute_sun_events(request.latitude, request.longitude, dt_utc)

    # 9. 달 위상
    moon = compute_moon_phase(dt_utc)

    # 10. visible_stars 응답 조립
    visible_stars = []
    for _, row in visible_df.iterrows():
        visible_stars.append({
            "hip": int(row["hip"]),
            "ra": round(float(row["ra"]), 4),
            "dec": round(float(row["dec"]), 4),
            "mag": round(float(row["mag"]), 2),
            "proper": row["proper"] if isinstance(row["proper"], str) else None,
            "con": row["con"],
            "alt": round(float(row["alt"]), 1),
            "az": round(float(row["az"]), 1),
        })

    # 11. constellations 응답 조립
    con_results = []
    for c in scored:
        line_pairs = [
            {"from": lp["from"], "to": lp["to"]}
            for lp in c["line_pairs_with_coords"]
        ]
        con_results.append({
            "code": c["code"],
            "name_ko": c["name_ko"],
            "score": c["score"],
            "visible_star_count": c["visible_star_count"],
            "total_star_count": c["total_star_count"],
            "avg_altitude": c["avg_altitude"],
            "line_pairs_with_coords": line_pairs,
        })

    return {
        "visible_stars": visible_stars,
        "constellations": con_results,
        "top3": top3,
        "sun": sun_events,
        "moon": moon,
        "limiting_magnitude": limiting_mag,
    }
