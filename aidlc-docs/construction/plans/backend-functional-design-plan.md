# Backend Functional Design Plan

## 생성할 아티팩트
- [x] business-logic-model.md — 비즈니스 로직 흐름
- [x] business-rules.md — 비즈니스 룰 및 검증
- [x] domain-entities.md — 도메인 엔티티 (Pydantic 모델)

---

## 질문

### Question 1
AstroPy 기반 좌표 변환에서 별 데이터 처리 방식은?

A) 벡터 연산 (AstroPy SkyCoord 배열로 8,920개 일괄 변환) **(추천)** — NFR ≤500ms 충족에 유리

B) 개별 루프 (별 하나씩 변환) — 코드 단순하지만 성능 불리

X) Other (please describe after [Answer]: tag below)

[Answer]: a

---

### Question 2
데이터 캐싱 전략은?

A) 앱 시작 시 모듈 레벨 변수에 1회 로드 (stars DataFrame + constellations list) **(추천)** — 단일 사용자 앱에 가장 단순

B) LRU 캐시 데코레이터 사용 — 약간 과도하지만 확장성

X) Other (please describe after [Answer]: tag below)

[Answer]: a
