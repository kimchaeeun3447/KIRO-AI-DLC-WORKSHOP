# Backend Code Generation Plan

## Unit Context
- **Unit**: backend
- **디렉토리**: `backend/`
- **기능**: FR-2 (천문 계산), FR-3 (가시성 필터링), FR-4 (추천 점수), FR-9 (에러 처리), FR-10 (API 계약)
- **기술 스택**: Python 3.11+ / FastAPI / Pydantic v2 / AstroPy / Pandas

---

## 생성 단계

- [x] Step 1: 프로젝트 구조 + requirements.txt
- [x] Step 2: 데이터 로더 (`backend/data/loader.py`)
- [x] Step 3: 천문 계산 — 좌표 변환 (`backend/astronomy/coordinates.py`)
- [x] Step 4: 천문 계산 — 태양 이벤트 (`backend/astronomy/sun.py`)
- [x] Step 5: 천문 계산 — 달 위상 (`backend/astronomy/moon.py`)
- [x] Step 6: 천문 계산 — 추천 점수 (`backend/astronomy/scoring.py`)
- [x] Step 7: API 모델 (`backend/api/models.py`)
- [x] Step 8: API 라우터 (`backend/api/routes.py`)
- [x] Step 9: FastAPI 앱 엔트리 (`backend/main.py`)
- [x] Step 10: 단위 테스트 (`backend/tests/test_astronomy.py`)
- [x] Step 11: 코드 요약 문서 (`aidlc-docs/construction/backend/code/`)
