# Component Methods

## Backend

### `astronomy` 패키지

| 메서드 | 입력 | 출력 | 목적 |
|--------|------|------|------|
| `compute_alt_az(ra, dec, lat, lon, datetime_utc)` | 별 좌표 + 관측 조건 | (alt, az) | 적도→지평 좌표 변환 |
| `compute_sun_events(lat, lon, date)` | 위치 + 날짜 | SunEvents | 일몰/일출/박명 시각 계산 |
| `compute_moon_phase(datetime_utc)` | UTC 시각 | MoonPhase | 달 위상 + illumination |
| `filter_visible_stars(stars_df, alt_az_df, limiting_mag)` | 별 목록 + 좌표 + 한계 등급 | DataFrame | 가시 별 필터링 |
| `score_constellations(visible_stars, constellations)` | 가시 별 + 별자리 정의 | list[ScoredConstellation] | 추천 점수 계산 |

### `api` 패키지

| 메서드 | 입력 | 출력 | 목적 |
|--------|------|------|------|
| `post_observe(request: ObserveRequest)` | ObserveRequest | ObserveResponse | 메인 관측 API |
| `get_locations()` | — | list[Location] | 사전 정의 도시 목록 |
| `get_constellation(code: str)` | IAU 코드 | ConstellationDetail | 별자리 상세 |

### `data` 패키지

| 메서드 | 입력 | 출력 | 목적 |
|--------|------|------|------|
| `load_stars()` | — | DataFrame | stars.csv 로드 + 캐싱 |
| `load_constellations()` | — | list[dict] | constellations.json 로드 + 캐싱 |
| `get_constellation_by_code(code)` | IAU 코드 | dict or None | 단일 별자리 조회 |

---

## Frontend

### Store (Zustand)

| 메서드/상태 | 타입 | 목적 |
|-------------|------|------|
| `location` | Location | 선택된 위치 |
| `datetime` | string (ISO) | 선택된 날짜시간 |
| `bortle` | number (1-9) | Bortle 등급 |
| `response` | ObserveResponse \| null | API 응답 |
| `selectedConstellation` | string \| null | 선택된 별자리 코드 |
| `error` | string \| null | 에러 메시지 |
| `fetchObservation()` | async () => void | API 호출 (디바운스) |

### API Layer

| 함수 | 입력 | 출력 | 목적 |
|------|------|------|------|
| `postObserve(params)` | ObserveRequest | ObserveResponse | POST /api/observe 호출 |
| `getLocations()` | — | Location[] | GET /api/locations 호출 |
| `getConstellation(code)` | string | ConstellationDetail | GET /api/constellations/{code} 호출 |
