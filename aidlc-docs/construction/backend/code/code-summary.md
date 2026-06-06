# Backend Code Summary

## 생성된 파일

| 파일 | 목적 |
|------|------|
| `backend/requirements.txt` | Python 의존성 |
| `backend/main.py` | FastAPI 앱 엔트리 + CORS |
| `backend/data/__init__.py` | 패키지 |
| `backend/data/loader.py` | stars.csv + constellations.json 로드/캐싱 |
| `backend/astronomy/__init__.py` | 패키지 |
| `backend/astronomy/coordinates.py` | AstroPy 벡터 Alt/Az 변환 |
| `backend/astronomy/sun.py` | 일몰/일출/박명 계산 |
| `backend/astronomy/moon.py` | 달 위상 + 한국어 매핑 |
| `backend/astronomy/scoring.py` | 가시성 필터 + 추천 점수 |
| `backend/api/__init__.py` | 패키지 |
| `backend/api/models.py` | Pydantic v2 요청/응답 스키마 |
| `backend/api/routes.py` | 3개 엔드포인트 라우터 |
| `backend/tests/__init__.py` | 패키지 |
| `backend/tests/test_astronomy.py` | pytest 단위 테스트 |

## 실행 방법

```bash
cd backend
python -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn backend.main:app --reload --port 8000
```

## 테스트

```bash
cd backend
.venv/bin/pytest
```
