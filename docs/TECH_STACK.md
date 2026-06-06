# Tech Stack

## 📚 한눈에 보기

```
┌────────────────────────────────────────────────────┐
│                    Frontend                        │
│  React + Vite + TypeScript + Tailwind CSS          │
│  · SVG / Plotly.js 시각화                          │
└─────────────────────┬──────────────────────────────┘
                      │ REST API (JSON)
                      ▼
┌────────────────────────────────────────────────────┐
│                    Backend                         │
│  FastAPI + Pydantic + Uvicorn                      │
│  · Python 3.11+ · Pandas / NumPy                   │
└─────────────────────┬──────────────────────────────┘
                      │ Read CSV
                      ▼
┌────────────────────────────────────────────────────┐
│                     Data                           │
│  HYG Star Database v3 (CSV, mag ≤ 6.5, ~9,000개)   │
│  IAU 88 별자리 정의 (정적 JSON)                     │
└────────────────────────────────────────────────────┘

[ AI 도구 ]
- Kiro CLI / IDE  (요구사항 정의 → 코드 생성)
- (선택) Bedrock API Key + AWS_BEARER_TOKEN_BEDROCK
```

---

## 🐍 Backend

### FastAPI + Pydantic

```toml
# pyproject.toml (또는 requirements.txt)
fastapi==0.115.*
uvicorn[standard]==0.32.*
pydantic==2.9.*
pandas==2.2.*
numpy==2.1.*
python-multipart==0.0.*
```

**선택 이유:**

| 이유 | 설명 |
|---|---|
| 데이터 직군 친숙도 | Python = 참가자 78%가 사용 (데이터야놀자 통계) |
| 자동 OpenAPI 문서 | `/docs` 엔드포인트 → API 명세가 자연스럽게 시각화 |
| Pydantic 타입 검증 | Spec/Design 단계의 데이터 모델이 코드로 직접 전이 |
| 빠른 개발 속도 | 보일러플레이트 적음, Construction 40분에 적합 |
| 데이터 처리 친화 | Pandas/NumPy 그대로 활용 |

### 선택 사항: AstroPy

```toml
astropy==6.1.*  # 천문 계산 보조 (옵션)
```

**용도:**
- 좌표 변환, 박명 계산을 직접 구현하지 않고 라이브러리 활용 가능
- 단점: 의존성 큼 (~50MB), 설치 시간 ↑
- **권장:** 워크샵에서는 직접 구현 (AI-DLC 효과 강화). AstroPy는 옵션으로만 안내.

---

## ⚛️ Frontend

### React + Vite + TypeScript

```json
// package.json (요약)
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^3.4.0"
  }
}
```

**선택 이유:**

| 이유 | 설명 |
|---|---|
| Kiro 친화도 | Kiro가 가장 많이 학습한 프레임워크 = 코드 생성 품질 ↑ |
| TypeScript | Frontend ↔ Backend 타입 정합성 = AI-DLC 효과 핵심 |
| Vite | 빌드/HMR 빠름, 워크샵 환경에 적합 |
| Tailwind | 디자인 지식 없이 빠른 스타일링 |

### 시각화: SVG vs Plotly.js

- **SVG (권장)**: 별자리 맵은 SVG로 그리는 게 가장 자연스러움. Mockup도 SVG 기반.
- **Plotly.js**: 보너스 시각화(시간대별 변화 차트 등)에만 활용

---

## 📊 Data

### HYG Database v3

**출처:** [GitHub - astronexus/HYG-Database](https://github.com/astronexus/HYG-Database) (CC-BY-SA)

**전체 데이터:**
- 119,614행 × 30+ 컬럼
- 약 50MB

**워크샵용 다이어트 (필수):**

| 옵션 | mag 필터 | 행 수 | 크기 | 비고 |
|---|---|---|---|---|
| 전체 | - | 119,614 | 50MB | ❌ 너무 큼 |
| **권장** ⭐ | mag ≤ 6.5 | ~9,000 | 2MB | 도시 외곽 관측 충분 |
| 가벼움 | mag ≤ 4.5 | ~510 | 0.1MB | 별자리 식별 가능 수준 |

**컬럼 다이어트:** 30+ 컬럼 → 워크샵에 필요한 8~10개만 추출

```
hip, ra, dec, mag, spect, con, proper, dist
```

### IAU 88 별자리 정의

- 88개 공식 별자리 + 별자리 선 정의
- 정적 JSON 파일로 사전 배포 (~50KB)

### 데이터 사전 준비 스크립트

워크샵 진행자가 사전에 다음 스크립트로 다이어트 버전 생성:

```python
# scripts/prepare_dataset.py (예시)
import pandas as pd

df = pd.read_csv('hygdata_v3.csv')
df_filtered = df[df['mag'] <= 6.5][['hip', 'ra', 'dec', 'mag', 'spect', 'con', 'proper', 'dist']]
df_filtered.to_csv('data/stars.csv', index=False)
```

---

## 🤖 AI Tools

### Kiro

**역할:** 워크샵 메인 도구. AI-DLC 풀 사이클 동반자.

**사전 안내:** 참가자에게 워크샵 며칠 전 Kiro 설치 + 로그인 + 간단 테스트 요청.

### LLM API (선택)

**기본 방침:** 워크샵 앱은 LLM **사용 안 함**. 모든 로직은 코드/데이터 기반.

**옵션:** "별자리 신화 자동 생성" 같은 보너스 기능에만 활용 가능.
- Bedrock API Key + `AWS_BEARER_TOKEN_BEDROCK` 환경변수
- 또는 OpenAI API
- 워크샵 주최측이 사전 발급/배포

---

## 🛠️ 개발 환경

### 권장 사양

| 항목 | 권장 | 최소 |
|---|---|---|
| OS | macOS / Windows / Linux | - |
| RAM | 16GB | 8GB |
| Python | 3.11+ | 3.10 |
| Node.js | 20 LTS | 18 LTS |
| Disk | 5GB free | 2GB free |
| Internet | 안정적 (npm/pip 설치용) | - |

### 설치 도구

- **uv** (Python 패키지 매니저, pip보다 10배 빠름) — 권장
- **pnpm** 또는 **npm** (Node.js 패키지 매니저)
- **Kiro CLI** 또는 **Kiro IDE**

---

## 📦 보일러플레이트 구조 (워크샵 시작 시 제공)

```
stargazer-app/
├── backend/
│   ├── pyproject.toml
│   ├── main.py                    # FastAPI 앱 진입점 (빈 골격)
│   ├── routes/                    # 빈 폴더 (참가자가 채움)
│   ├── models/                    # 빈 폴더 (Pydantic 모델)
│   ├── services/                  # 빈 폴더 (비즈니스 로직)
│   └── data/
│       ├── stars.csv              # 사전 다이어트된 별 데이터
│       └── constellations.json    # IAU 88 별자리 정의
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── main.tsx               # 진입점
│       ├── App.tsx                # 빈 골격
│       ├── components/            # 빈 폴더
│       ├── api/                   # 빈 폴더 (API 클라이언트)
│       └── types/                 # 빈 폴더 (TS 타입 정의)
├── .kiro/
│   └── (Kiro 설정 + Spec 템플릿)
├── docs/
│   ├── REQUIREMENTS.md            # 본 워크샵 요구사항
│   └── domain-glossary.md         # 천문 용어 간단 사전
└── README.md                      # 환경 세팅 가이드
```

---

## 🚫 의존성 정책

### 사용 안 함

- ❌ AWS 서비스 (Bedrock 제외, 그것도 옵션)
- ❌ 외부 API 호출 (별 데이터는 로컬 CSV)
- ❌ 데이터베이스 (워크샵 스코프상 불필요, CSV로 충분)
- ❌ 인증/권한 시스템 (Out of Scope)
- ❌ 배포 인프라 (로컬 dev 서버만)
- ❌ 무거운 의존성 (예: 전체 SciPy stack, AstroPy 필수 X)

### 사용 가능

- ✅ Python 표준 라이브러리 (math, datetime 등)
- ✅ Pandas / NumPy (데이터 처리)
- ✅ FastAPI / Pydantic (백엔드)
- ✅ React / Vite / TypeScript (프론트엔드)
- ✅ Tailwind CSS (스타일링)
- ✅ Kiro (개발 도구)

---

## 🔄 변경 가능성 있는 부분

| 부분 | 대안 | 변경 시 영향 |
|---|---|---|
| FastAPI → Flask | 더 가벼움 | OpenAPI 자동 생성 ↓ |
| React → Vue/Svelte | 가벼움 | Kiro 친화도 ↓ |
| TypeScript → JavaScript | 진입장벽 ↓ | 타입 정합성 가치 ↓ |
| Tailwind → 일반 CSS | 자유도 ↑ | 디자인 시간 ↑ |

→ 워크샵 진행자 판단으로 조정 가능. 단, 메인 메시지(풀스택 + 타입 안전성)를 약화시키지 않을 것.
