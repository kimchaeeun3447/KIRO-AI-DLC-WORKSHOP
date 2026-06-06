# Component Dependencies

## Backend 의존 관계

```
api ──→ astronomy (계산 호출)
api ──→ data (별/별자리 조회)
astronomy ──→ data (별 DataFrame 참조)
```

- `api` → `astronomy`: ObservationService 오케스트레이션에서 천문 계산 함수 호출
- `api` → `data`: 위치 목록, 별자리 상세 조회
- `astronomy` → `data`: 별 데이터 접근 (Alt/Az 일괄 계산 시)

## Frontend 의존 관계

```
features/controls/ ──→ store (입력 상태 변경)
features/sky-map/  ──→ store (응답 데이터 읽기, 별자리 선택)
features/info/     ──→ store (sun/moon/top3 읽기)
features/detail/   ──→ store (selectedConstellation) ──→ API (상세 조회)
components/        ──→ store (error 상태 → Toast)
store              ──→ api service (HTTP 호출)
```

## Backend ↔ Frontend 통신

- Frontend → Backend: HTTP (fetch) via localhost:8000
- 3개 엔드포인트: POST /api/observe, GET /api/locations, GET /api/constellations/{code}
- 에러 시 Backend이 한국어 메시지를 response body에 포함 → Frontend이 그대로 표시
