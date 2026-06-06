# Requirements Verification Questions

SPEC.md 가 매우 상세하여 대부분의 요구사항이 명확합니다.
아래 몇 가지만 확인하면 바로 진행할 수 있습니다.

---

## Question 1
천문 계산 구현 방식을 어떻게 할까요?

A) AstroPy + astroplan 라이브러리 사용 **(추천)** — 정확하고 코드 간결, 워크샵 시연에 적합

B) USNO 알고리즘 직접 구현 — 외부 의존 없지만 구현량 많음

X) Other (please describe after [Answer]: tag below)

[Answer]:A

---

## Question 2
프론트엔드 상태 관리 범위 — Zustand store 를 어떻게 구성할까요?

A) 단일 스토어 (입력 상태 + API 응답 + UI 상태 통합) **(추천)** — MVP에 충분하고 단순

B) 분리 스토어 (inputStore / skyStore / uiStore) — 관심사 분리, 약간 복잡

X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 3
SkyMap SVG 줌/패닝 구현 방식은?

A) CSS transform + React 이벤트 핸들러로 직접 구현 **(추천)** — 외부 의존 없이 충분히 가능

B) d3-zoom 라이브러리 사용 — 검증된 줌 로직이지만 번들 크기 증가

X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 4: Security Extension
보안 확장 룰을 이 프로젝트에 적용할까요?

A) 적용 안 함 **(추천)** — localhost 전용 워크샵 데모라 production-grade 보안 룰 불필요

B) 적용 — 모든 SECURITY 룰을 blocking constraint 로 강제

X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 5: Property-Based Testing Extension
Property-Based Testing (PBT) 룰을 적용할까요?

A) 적용 안 함 **(추천)** — 워크샵 데모 범위에서 PBT 강제는 과도

B) 부분 적용 — 순수 함수 / 좌표 변환에만 PBT 적용

C) 전체 적용 — 모든 PBT 룰을 blocking constraint 로 강제

X) Other (please describe after [Answer]: tag below)

[Answer]: A
