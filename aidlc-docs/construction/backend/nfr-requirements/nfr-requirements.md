# Backend — NFR Requirements

## 성능

| 항목 | 기준 | 전략 |
|------|------|------|
| POST /api/observe 응답 | ≤ 500ms | AstroPy 벡터 연산 (8,920별 일괄), 데이터 모듈 캐시 |
| 좌표 변환 오차 | ≤ 1° | AstroPy 라이브러리 정확도 의존 |
| 박명 계산 오차 | ≤ 5분 | AstroPy sun 계산 정확도 의존 |

## 데이터 전략

- 앱 시작 시 `stars.csv` + `constellations.json` 1회 로드 → 모듈 레벨 캐시
- SkyCoord 배열: stars 좌표로 1회 생성 후 캐시 (ICRS 프레임, 불변)
- AltAz 프레임: 요청마다 (lat, lon, time) 기반으로 새로 생성
- `transform_to(AltAz)`: 요청마다 벡터 연산 실행

## 신뢰성

- 단일 프로세스, 단일 사용자 — 동시성/장애 복구 불필요
- 입력 검증 실패 시 422 + 한국어 메시지 즉시 반환
- 예외 발생 시 500 + 일반 에러 메시지

## 보안

- localhost only — 인증/인가 불필요
- 입력 검증만 (Pydantic v2 validator)
