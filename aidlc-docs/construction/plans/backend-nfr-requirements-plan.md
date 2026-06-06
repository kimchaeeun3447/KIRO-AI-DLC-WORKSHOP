# Backend NFR Requirements Plan

## 생성할 아티팩트
- [x] nfr-requirements.md — NFR 정의
- [x] tech-stack-decisions.md — 기술 스택 확정

---

## 질문

### Question 1
Backend 성능 최적화에서 AstroPy SkyCoord 객체 재사용 전략은?

A) 요청마다 SkyCoord 생성 (stars 배열은 캐시, AltAz 프레임만 매번 새로 생성) **(추천)** — 코드 단순, 500ms 내 충분할 가능성 높음

B) EarthLocation + 시간대별 AltAz 프레임 캐시 — 복잡하지만 반복 요청 시 더 빠름

X) Other (please describe after [Answer]: tag below)

[Answer]: a
