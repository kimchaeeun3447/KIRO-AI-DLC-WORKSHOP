# Application Design — 통합 문서

## 설계 결정 요약

| 결정 | 선택 |
|------|------|
| Backend 모듈 구조 | 도메인별 패키지 (`astronomy/`, `api/`, `data/`) |
| Frontend 구조 | 기능별 폴더 (`features/sky-map/`, `features/controls/`, `features/detail/`, `features/info/`) |
| 에러 처리 | Backend에서 한국어 메시지 포함하여 응답 |

## 디렉토리 구조

```
backend/
├── main.py              # FastAPI app 엔트리
├── astronomy/           # 천문 계산
│   ├── coordinates.py   # Alt/Az 변환
│   ├── sun.py           # 일몰/박명
│   ├── moon.py          # 달 위상
│   └── scoring.py       # 추천 점수
├── api/                 # 라우터 + 모델
│   ├── routes.py        # 엔드포인트
│   └── models.py        # Pydantic 스키마
└── data/                # 데이터 로딩
    └── loader.py        # CSV/JSON 로드 + 캐싱

frontend/src/
├── App.tsx
├── store.ts             # Zustand 단일 스토어
├── api/                 # HTTP 클라이언트
│   └── client.ts
├── features/
│   ├── sky-map/         # SkyMap SVG
│   ├── controls/        # 입력 UI
│   ├── detail/          # 별자리 상세 드로어
│   └── info/            # 관측 정보 + Top3
└── components/          # 공통 (Toast, Header, Layout)
```

## 서비스 흐름

1. 사용자 입력 변경 → store 업데이트 → 300ms 디바운스
2. `fetchObservation()` → POST /api/observe
3. Backend: 데이터 로드 → AstroPy 좌표 변환 → 필터링 → 점수 산출 → 응답
4. Frontend: store에 응답 저장 → SkyMap + InfoPanel + Top3 렌더링
5. 별자리 클릭 → GET /api/constellations/{code} → 상세 드로어 표시

## 에러 흐름

- Backend 검증 실패 → 422 + `{"detail": "위도는 -90~90 범위여야 합니다"}` 
- Frontend: response.detail 을 Toast로 표시
- 네트워크 실패 → catch → 기본 한국어 메시지 Toast
- 마지막 정상 응답 화면 유지 (빈 화면 금지)
