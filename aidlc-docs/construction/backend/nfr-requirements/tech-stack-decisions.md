# Backend — Tech Stack Decisions

| 기술 | 버전 | 용도 |
|------|------|------|
| Python | 3.11+ | 런타임 |
| FastAPI | latest | HTTP 프레임워크 |
| Pydantic | v2 | 요청/응답 모델 + 검증 |
| AstroPy | latest | 천문 좌표 변환, 박명, 달 위상 |
| Pandas | latest | stars.csv 로드 + 필터링 |
| NumPy | latest | 벡터 연산 (AstroPy 의존) |
| uvicorn | latest | ASGI 서버 (개발용) |
| pytest | latest | 단위 테스트 |

## 미사용 결정

| 기술 | 사유 |
|------|------|
| astroplan | AstroPy만으로 충분 (박명/좌표 변환 가능) |
| DB | 불필요 (로컬 파일 전용) |
| Redis/캐시 | 불필요 (단일 사용자, 모듈 캐시로 충분) |
| Docker | 불필요 (localhost dev 서버) |
