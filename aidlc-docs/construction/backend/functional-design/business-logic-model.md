# Backend — Business Logic Model

## POST /api/observe 처리 흐름

```
Request (lat, lon, datetime_utc, bortle_class)
  │
  ├─ 1. 입력 검증 (lat: -90~90, lon: -180~180, bortle: 1~9)
  │
  ├─ 2. 데이터 로드 (모듈 캐시에서 stars_df, constellations 참조)
  │
  ├─ 3. 좌표 변환 (벡터 연산)
  │     ├─ AstroPy SkyCoord 배열 생성 (ra/dec → ICRS)
  │     ├─ AltAz 프레임 설정 (lat, lon, datetime_utc)
  │     └─ transform_to(AltAz) → alt[], az[] (8,920개 일괄)
  │
  ├─ 4. 가시성 필터링
  │     ├─ alt > 0° (지평선 위)
  │     └─ mag ≤ limiting_magnitude (Bortle 매핑)
  │
  ├─ 5. 별자리 처리
  │     ├─ 별자리별 가시 별 수 집계
  │     ├─ 가시 별 ≥ 2 인 별자리만 포함
  │     ├─ line_pairs: 양 끝이 지평선 위면 포함 (mag 무관)
  │     └─ line_pairs 좌표 (alt/az) 첨부
  │
  ├─ 6. 추천 점수 산출
  │     ├─ visibility_pct = 가시별수 / 전체별수
  │     ├─ altitude_score = 평균고도 30°~80° 사이 정규화
  │     ├─ star_count_score = min(가시별수 / 7, 1.0)
  │     ├─ score = 0.4*vis + 0.35*alt + 0.25*star
  │     └─ Top 3 추출 (score 내림차순)
  │
  ├─ 7. 태양 이벤트 계산
  │     └─ AstroPy: sunset, sunrise, civil/astronomical twilight
  │
  ├─ 8. 달 위상 계산
  │     └─ AstroPy: phase (0~1), illumination, 한국어 이름 매핑
  │
  └─ 9. 응답 조립 + 반환

```

## GET /api/locations

캐시된 사전 정의 도시 8곳 리스트 반환.

## GET /api/constellations/{code}

constellations 캐시에서 code 검색 → 상세 정보 + 소속 별 목록 (mag 오름차순) 반환. 미발견 시 404.
