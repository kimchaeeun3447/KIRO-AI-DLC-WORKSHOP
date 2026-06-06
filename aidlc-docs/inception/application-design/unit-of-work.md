# Unit of Work

## Unit 분할

| Unit | 디렉토리 | 기술 스택 | 책임 |
|------|----------|-----------|------|
| `backend` | `backend/` | Python 3.11+ / FastAPI / AstroPy / Pandas | 천문 계산, API, 데이터 로딩 |
| `frontend` | `frontend/` | React 18 / Vite / TypeScript / Tailwind / Zustand | UI 렌더링, 상태 관리, SVG 시각화 |

## 구현 순서

**Backend 먼저 → Frontend**

1. `backend` — API 엔드포인트 + 천문 계산 완성 → pytest 검증
2. `frontend` — 동작하는 API 기반으로 UI 구현 → tsc + vite build 검증

## Unit 상세

### Unit 1: `backend`

```
backend/
├── main.py
├── astronomy/
│   ├── __init__.py
│   ├── coordinates.py
│   ├── sun.py
│   ├── moon.py
│   └── scoring.py
├── api/
│   ├── __init__.py
│   ├── routes.py
│   └── models.py
├── data/
│   ├── __init__.py
│   └── loader.py
├── requirements.txt
└── tests/
    └── test_astronomy.py
```

### Unit 2: `frontend`

```
frontend/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── store.ts
    ├── api/
    │   └── client.ts
    ├── features/
    │   ├── sky-map/
    │   ├── controls/
    │   ├── detail/
    │   └── info/
    └── components/
```
