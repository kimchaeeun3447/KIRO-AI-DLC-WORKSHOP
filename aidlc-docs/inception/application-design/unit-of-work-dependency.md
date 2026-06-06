# Unit of Work — Dependencies

## 의존 관계 매트릭스

| From → To | backend | frontend |
|-----------|---------|----------|
| **backend** | — | — |
| **frontend** | HTTP (localhost:8000) | — |

## 통신 패턴

- `frontend` → `backend`: HTTP REST (fetch API)
  - POST /api/observe
  - GET /api/locations  
  - GET /api/constellations/{code}
- 공유 리소스: `data/` 디렉토리 (backend만 읽음)

## 빌드 의존성

- 서로 독립 빌드 (각자 별도 의존성 관리)
- backend: `requirements.txt` (pip)
- frontend: `package.json` (npm)
- 런타임에만 HTTP로 연결
