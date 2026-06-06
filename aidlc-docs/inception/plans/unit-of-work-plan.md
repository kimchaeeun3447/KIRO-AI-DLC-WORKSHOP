# Unit of Work Plan

## 생성할 아티팩트
- [x] unit-of-work.md — Unit 정의 및 책임
- [x] unit-of-work-dependency.md — 의존 관계
- [x] unit-of-work-story-map.md — 기능 매핑

---

## 질문

### Question 1
Unit 분할 방식을 확인합니다.

A) 2-unit: `backend` + `frontend` **(추천)** — SPEC 구조와 1:1, 단순하고 명확

B) 3-unit: `backend-astronomy` + `backend-api` + `frontend` — 천문 계산 분리, 약간 과도

X) Other (please describe after [Answer]: tag below)

[Answer]: a

---

### Question 2
Unit 간 구현 순서는?

A) Backend 먼저 → Frontend **(추천)** — API가 먼저 동작해야 Frontend 개발/검증 가능

B) Frontend 먼저 → Backend — 목업 기반 UI 먼저

C) 동시 병렬 — 각각 독립 진행

X) Other (please describe after [Answer]: tag below)
a
[Answer]: a
