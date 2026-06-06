# Application Design Plan

## 설계 범위

SPEC.md 기반으로 아래 아티팩트를 생성합니다:
- [x] components.md — 컴포넌트 식별 및 책임
- [x] component-methods.md — 메서드 시그니처
- [x] services.md — 서비스 레이어 정의
- [x] component-dependency.md — 의존 관계
- [x] application-design.md — 통합 문서

---

## 설계 질문

### Question 1
Backend 내부 모듈 구조를 어떻게 나눌까요?

A) 단일 모듈 (main.py + astronomy.py + models.py 정도) **(추천)** — MVP에 충분, 파일 3~4개로 간결

B) 도메인별 패키지 (astronomy/, api/, data/) — 확장성 좋지만 이 규모에선 과도

X) Other (please describe after [Answer]: tag below)

[Answer]: b

---

### Question 2
Frontend 컴포넌트 구조 깊이는?

A) 플랫 구조 (components/ 한 폴더에 모든 컴포넌트) **(추천)** — 파일 10~15개 수준이라 충분

B) 기능별 폴더 (features/sky-map/, features/controls/, features/detail/) — 규모가 커질 때 유리

X) Other (please describe after [Answer]: tag below)

[Answer]: b

---

### Question 3
Backend → Frontend 데이터 흐름에서 에러 처리 패턴은?

A) FastAPI HTTPException + Frontend에서 status code 기반 한국어 메시지 매핑 **(추천)** — 단순하고 SPEC FR-9 충족

B) Backend에서 한국어 에러 메시지를 response body에 포함 — Frontend 로직 줄지만 Backend이 UI 관심사를 갖게 됨

X) Other (please describe after [Answer]: tag below)

[Answer]: b
