"""별자리 추천 점수 계산."""

import pandas as pd


# Bortle → 한계 등급 매핑
BORTLE_TO_LIMITING_MAG: dict[int, float] = {
    1: 6.5, 2: 6.3, 3: 6.0, 4: 5.5, 5: 5.0,
    6: 4.5, 7: 4.0, 8: 3.5, 9: 3.0,
}


def filter_visible_stars(
    stars_with_altaz: pd.DataFrame,
    limiting_mag: float,
) -> pd.DataFrame:
    """지평선 위 + 한계 등급 이내 별만 필터링한다."""
    mask = (stars_with_altaz["alt"] > 0) & (stars_with_altaz["mag"] <= limiting_mag)
    return stars_with_altaz[mask].copy()


def _altitude_score(avg_alt: float) -> float:
    """평균 고도 30°~80° 사이에서 최고점(1.0)을 주는 점수."""
    if avg_alt < 10:
        return 0.0
    elif avg_alt < 30:
        return (avg_alt - 10) / 20.0
    elif avg_alt <= 80:
        return 1.0
    else:
        return max(0.0, 1.0 - (avg_alt - 80) / 10.0)


def score_constellations(
    stars_with_altaz: pd.DataFrame,
    constellations: list[dict],
    limiting_mag: float,
) -> list[dict]:
    """별자리별 추천 점수를 산출한다.

    Returns:
        가시 별 ≥ 2 인 별자리 목록 (score 내림차순), 각 항목:
        {code, name_ko, score, visible_star_count, total_star_count,
         avg_altitude, line_pairs_with_coords}
    """
    # 지평선 위 별 (mag 무관 — 별자리 선용)
    above_horizon = stars_with_altaz[stars_with_altaz["alt"] > 0]
    # 한계 등급 이내 별 (점으로 표시할 별)
    visible = stars_with_altaz[
        (stars_with_altaz["alt"] > 0) & (stars_with_altaz["mag"] <= limiting_mag)
    ]

    # HIP → (alt, az) 인덱스
    hip_to_altaz: dict[int, tuple[float, float]] = {}
    for _, row in above_horizon.iterrows():
        hip_to_altaz[int(row["hip"])] = (round(row["alt"], 1), round(row["az"], 1))

    results = []

    for con in constellations:
        code = con["code"]
        # 이 별자리에 속한 별
        con_stars = stars_with_altaz[stars_with_altaz["con"] == code]
        total_count = len(con_stars)
        if total_count == 0:
            continue

        # 가시 별 (한계 등급 이내 + 지평선 위)
        vis_stars = visible[visible["con"] == code]
        vis_count = len(vis_stars)

        if vis_count < 2:
            continue

        # 평균 고도 (가시 별 기준)
        avg_alt = float(vis_stars["alt"].mean())

        # 점수 계산
        visibility_pct = vis_count / total_count
        alt_score = _altitude_score(avg_alt)
        star_count_score = min(vis_count / 7.0, 1.0)
        raw_score = 0.4 * visibility_pct + 0.35 * alt_score + 0.25 * star_count_score
        score = round(raw_score * 10, 1)  # 0~10 스케일

        # line_pairs_with_coords: 양 끝이 지평선 위인 선만
        line_pairs_with_coords = []
        for pair in con.get("line_pairs", []):
            hip_a, hip_b = pair[0], pair[1]
            if hip_a in hip_to_altaz and hip_b in hip_to_altaz:
                alt_a, az_a = hip_to_altaz[hip_a]
                alt_b, az_b = hip_to_altaz[hip_b]
                line_pairs_with_coords.append({
                    "from": {"hip": hip_a, "alt": alt_a, "az": az_a},
                    "to": {"hip": hip_b, "alt": alt_b, "az": az_b},
                })

        results.append({
            "code": code,
            "name_ko": con["name_ko"],
            "score": score,
            "visible_star_count": vis_count,
            "total_star_count": total_count,
            "avg_altitude": round(avg_alt, 1),
            "line_pairs_with_coords": line_pairs_with_coords,
        })

    # score 내림차순 정렬
    results.sort(key=lambda x: x["score"], reverse=True)
    return results
