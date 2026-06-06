# AGENTS.md — StarGazer 프로젝트 지침

> 이 파일은 IDE AI-DLC 워크플로우 룰 위에
> **얹는** 프로젝트 preference 이며, 룰 자체를 부정하지 않는다.
>
> 개정 이력은 git log 로 추적.

---

## 1. 프로젝트 컨텍스트

- **목적**: AI-DLC 워크샵 데모 — 별자리 관측 플래너 (단일 사용자 SPA, localhost only)
- **권위 있는 명세**: 워크스페이스 루트 [`SPEC.md`](./SPEC.md)
- **AI-DLC 룰 위치**: `.kiro/aws-aidlc-rule-details/`
- **AI-DLC 산출물**: `aidlc-docs/`

---

## 2. AI-DLC 워크플로우 — 프로젝트 preference

본 절은 AI-DLC 워크플로우를 적용할 때의 **프로젝트 default** 를 명시한다.
워크플로우 룰을 무효화하지 않으며, 사용자가 명시적으로 다른 답을 주면 그 답이
우선한다.

### 2.1 질문지 (verification questions / planning questions)

워크플로우의 어느 단계든 사용자에게 multiple-choice 질문을 만들 때:

- **모든 질문에 AI 추천안을 정확히 1개** 명시 (예: `**(추천)**` 마커)
- 추천 근거를 한 줄 이내로 간단히 첨부
- 추천 기준은 **MVP / 워크샵 시연 효율성** — 단순함, 빠른 진행, 외부 의존 최소
- "Other" 옵션은 워크플로우 룰대로 항상 마지막에 포함

**예시:**
```markdown
A) 옵션 A 설명 **(추천)** — 한 줄 근거

B) 옵션 B 설명 — 한 줄 근거

X) Other (please describe after [Answer]: tag below)
```

### 2.2 Extensions (Security / PBT 등)

`.kiro/aws-aidlc-rule-details/extensions/**` 의 opt-in 질문이 등장하면:

- **항상 "사용 안 함" 을 default 추천** 으로 표기
- 워크샵 데모 컨텍스트라 production-grade 룰 강제는 과함
- 사용자가 명시적으로 enable 을 원하면 그때만 활성화

### 2.3 Unit 분할 (Units Generation 단계)

- **2 unit 권장**: `backend` / `frontend`
- 더 잘게 쪼개지 말 것 (최대 3개 유닛 허용. 예를들면, `backend-astronomy` / `backend-api` / `frontend-ui` 3-unit)
- 단 사용자가 명시적으로 다른 분할을 요청하면 그에 따른다
- Unit 명은 디렉토리 구조와 1:1 일치 (혼동 방지)

### 2.4 Infrastructure Design 단계

- **항상 SKIP**
- 본 프로젝트는 `localhost only` 가 SPEC 제약 — 클라우드/CDK/컨테이너 매핑 자체가 불필요
- 빌드/실행 명령은 Build & Test 단계에서 다룬다

### 2.5 의존성 / UI 라이브러리

- 빌드 타임 번들되는 라이브러리 (framer-motion, react-aria, recharts 등) 추가는 **자유**
- 단 SPEC § 11 제약(런타임 외부 네트워크 호출 금지) 과 § 9 NFR 번들 한도는 준수
- AstroPy / astroplan 같은 천문 라이브러리도 허용 

### 2.6 산출물 분량

- 각 stage 산출물은 **요구 수준만** 채우고 부풀리지 말 것
- 디자인 토큰·hex 코드·CSS 클래스·SVG filter ID 같은 구현 디테일을 SPEC 이나 AI-DLC 산출물 문서에 박지 말 것 (코드가 SOT)

---

## 3. 코드 / 빌드 약속

- **Backend**: Python 3.11+, FastAPI, Pydantic v2, Pandas, NumPy, AstroPy/astroplan 허용
- **Frontend**: React 18 + Vite + TypeScript (strict) + Tailwind + Zustand
- **테스트**: pytest (backend), `tsc --noEmit` (frontend, 자동화 테스트 없음 — 수동 시연)
- **빌드 명령**:
  - Backend: `cd backend && .venv/bin/pytest`
  - Frontend: `cd frontend && npm run typecheck && npm run build`

---

## 4. 보안 / 안전 약속

- TypeScript build artifacts (`*.tsbuildinfo`, compiled `vite.config.{js,d.ts}`) commit 금지
- `.venv/`, `node_modules/`, `dist/`, `__pycache__/` 등 빌드 산출물 commit 금지
- main 브랜치에 직접 push 금지 (refactor/feature 브랜치에서 작업 → 머지)
