# Frontend Code Generation Plan

## Unit Context
- **Unit**: frontend
- **디렉토리**: `frontend/`
- **기능**: FR-1 (입력), FR-5 (SkyMap), FR-6 (상세 드로어), FR-7 (시간 슬라이더), FR-8 (자동 갱신), FR-9 (에러 Toast)
- **기술 스택**: React 18 / Vite / TypeScript (strict) / Tailwind / Zustand

---

## 생성 단계

- [ ] Step 1: 프로젝트 스캐폴딩 (package.json, vite.config, tsconfig, tailwind, postcss)
- [ ] Step 2: 타입 정의 (`src/types.ts`)
- [ ] Step 3: API 클라이언트 (`src/api/client.ts`)
- [ ] Step 4: Zustand 스토어 (`src/store.ts`)
- [ ] Step 5: 공통 컴포넌트 (`src/components/` — Layout, Header, Toast)
- [ ] Step 6: Controls 기능 (`src/features/controls/` — LocationSelect, CoordinateInput, DateTimePicker, BortleSlider)
- [ ] Step 7: SkyMap 기능 (`src/features/sky-map/` — SkyMap, StarDot, ConstellationLines, ZoomControls)
- [ ] Step 8: Info 패널 (`src/features/info/` — InfoPanel, Top3Panel, MoonPhase)
- [ ] Step 9: Detail 드로어 (`src/features/detail/` — ConstellationDrawer, MiniMap, StarList)
- [ ] Step 10: TimeSlider (`src/features/controls/TimeSlider.tsx`)
- [ ] Step 11: App.tsx + main.tsx + index.html
- [ ] Step 12: 코드 요약 문서
