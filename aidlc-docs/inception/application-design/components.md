# Components

## Backend Components

### 1. `astronomy` 패키지
- **책임**: 천문 계산 (좌표 변환, 박명, 달 위상, 가시성 필터링, 추천 점수)
- **인터페이스**: 내부 함수 호출 (서비스 레이어에서 사용)

### 2. `api` 패키지
- **책임**: HTTP 엔드포인트 정의, 요청 검증, 응답 직렬화
- **인터페이스**: FastAPI Router (POST /api/observe, GET /api/locations, GET /api/constellations/{code})

### 3. `data` 패키지
- **책임**: CSV/JSON 로드, 데이터 인덱싱, 별/별자리 조회
- **인터페이스**: 데이터 접근 함수 (stars DataFrame, constellations dict)

---

## Frontend Components

### 1. `features/sky-map/`
- **책임**: 원형 SkyMap SVG 렌더링, 줌/패닝, 별자리 선택 인터랙션
- **주요 컴포넌트**: SkyMap, StarDot, ConstellationLines, ConstellationLabel, ZoomControls

### 2. `features/controls/`
- **책임**: 입력 UI (위치 선택, 위경도, 날짜/시간, Bortle 슬라이더, 시간 슬라이더)
- **주요 컴포넌트**: LocationSelect, CoordinateInput, DateTimePicker, BortleSlider, TimeSlider

### 3. `features/detail/`
- **책임**: 별자리 상세 드로어 (미니맵 + 정보 + 소속별 목록)
- **주요 컴포넌트**: ConstellationDrawer, MiniMap, StarList

### 4. `features/info/`
- **책임**: 관측 정보 패널 (일몰/박명/달 위상) + Top 3 추천
- **주요 컴포넌트**: InfoPanel, Top3Panel, MoonPhase

### 5. `components/` (공통)
- **책임**: Toast, Layout, Header 등 공통 UI
- **주요 컴포넌트**: Toast, Header, Layout
