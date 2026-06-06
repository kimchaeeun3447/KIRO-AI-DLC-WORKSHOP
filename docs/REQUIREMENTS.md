# Requirements

> 본 문서는 워크샵 참가자가 **Inception 단계의 출발점**으로 활용하는 요구사항 명세입니다.
> 참가자는 이 문서를 기반으로 Kiro와 함께 Spec/Design을 더 정교하게 다듬어갑니다.

---

## 👥 페르소나

### 1. 별 보는 일반인 (Primary)

- **이름:** "오늘 밤 별 좀 보고 싶은 김씨"
- **상황:** 평범한 직장인. 가끔 하늘을 보다가 "저게 무슨 별자리지?" 궁금해함.
- **니즈:**
  - "지금 우리 동네에서 보이는 별자리가 뭔지 알고 싶다"
  - "베스트 별자리 한두 개만 추천받고 싶다"
  - "별자리 신화 같은 가벼운 이야기도 듣고 싶다"
- **기술 수준:** 천문학 지식 거의 없음, 일반 웹사이트 사용 익숙

### 2. 천체관측 동호인 (Secondary)

- **이름:** "주말마다 별 보러 다니는 박씨"
- **상황:** 천체관측 취미. 망원경 보유. 월 1~2회 별 보러 외곽 이동.
- **니즈:**
  - "이번 주 베스트 관측 대상이 뭔지"
  - "광공해를 고려한 정확한 가시 등급 정보"
  - "최적 관측 시간대(천문 박명 끝~밝아지기 전)"
  - "남중 시간, 방위각/고도 같은 정밀 정보"
- **기술 수준:** 천문 용어 익숙, 정확성에 민감

### 3. 여행자 (Tertiary)

- **이름:** "여행지에서 별 보고 싶은 이씨"
- **상황:** 출장/여행 중. 평소 안 가본 곳에서 별 보면 다른 별자리가 보일까 궁금.
- **니즈:**
  - "현지 위치(다른 위도)에서 보이는 별자리"
  - "여행지 광공해 수준 정보"
  - "본인 거주지와의 비교"
- **기술 수준:** 일반인 수준

---

## 📖 User Stories

### Epic 1: 위치/시간 기반 별자리 시각화

**US-001:** 별 보는 일반인으로서, 내 위치와 현재 시간을 입력하면 그 시점에 보이는 별자리를 그림으로 보고 싶다. 그래야 어떤 별자리가 떠 있는지 알 수 있다.
- **AC1:** 위치(도시 또는 위도/경도)와 시간을 입력할 수 있다
- **AC2:** 입력 후 5초 이내에 별자리 맵이 그려진다
- **AC3:** 별자리 이름이 한글로 표시된다

**US-002:** 동호인으로서, 광공해 등급을 슬라이더로 조정해서 실제 보일 별만 필터링하고 싶다. 그래야 도시에서 헛된 기대를 안 한다.
- **AC1:** Bortle 1~9 등급 슬라이더 제공
- **AC2:** 등급 변경 시 즉시 별 표시 개수가 갱신된다
- **AC3:** 한계 등급(mag)이 함께 표시된다

**US-003:** 일반인으로서, 별자리를 클릭하면 그 별자리에 대한 간단한 정보를 보고 싶다.
- **AC1:** 클릭한 별자리의 소속 별 목록 표시
- **AC2:** 별자리에 얽힌 신화 한두 줄 표시
- **AC3:** 현재 방위/고도/남중 시간 표시

### Epic 2: 관측 추천

**US-004:** 일반인으로서, "오늘 밤 베스트 별자리 Top 3"를 한눈에 보고 싶다. 그래야 어디부터 봐야 할지 안다.
- **AC1:** 점수가 높은 순으로 Top 3 카드가 표시된다
- **AC2:** 각 카드에 별자리 이름, 방위, 최적 관측 시간, 추천 점수가 표시된다

**US-005:** 동호인으로서, 추천 점수의 산정 기준을 알고 싶다. 그래야 결과를 신뢰할 수 있다.
- **AC1:** "왜 이 별자리가 추천되었는가" 툴팁 또는 상세 페이지 제공
- **AC2:** 점수 구성 요소 (가시성, 고도, 별 개수 등)가 분리되어 표시

### Epic 3: 관측 시간 정보

**US-006:** 동호인으로서, 오늘 밤 관측에 적합한 시간대(일몰, 박명 종료, 박명 시작, 일출)를 알고 싶다.
- **AC1:** 일몰/일출 시간 표시
- **AC2:** 천문 박명(고도 -18°) 시작/끝 시간 표시
- **AC3:** "최적 관측 시간"이 강조 표시 (천문 박명 끝 ~ 박명 시작)

**US-007:** 일반인으로서, 달의 위상을 알고 싶다. 보름달이면 별이 잘 안 보인다는 걸 들어서.
- **AC1:** 입력 시간의 달 위상 (이모지 또는 그림) 표시
- **AC2:** 달 밝기 % 표시

### Epic 4: 위치 변경/탐색 (Stretch)

**US-008:** 여행자로서, 위치를 바꿔서 다른 곳의 하늘을 보고 싶다.
- **AC1:** 미리 정의된 도시 목록(서울/부산/제주/영월 등) 또는 위도/경도 직접 입력
- **AC2:** 위치 변경 시 별자리 맵이 즉시 갱신된다

**US-009 (Stretch):** 동호인으로서, 시간 슬라이더로 별의 움직임을 보고 싶다.
- **AC1:** 시간 슬라이더 제공
- **AC2:** 슬라이더 조정 시 별 위치가 부드럽게 갱신된다

---

## ⚙️ Functional Requirements

### FR-1: 입력 수집

- **FR-1.1:** 위치 입력 (드롭다운 + 위도/경도 직접 입력 옵션)
- **FR-1.2:** 날짜 입력 (기본값: 오늘)
- **FR-1.3:** 시간 입력 (기본값: 현재 시각, 또는 그날 박명 시작 시간)
- **FR-1.4:** 광공해 Bortle 등급 입력 (슬라이더, 1~9, 기본값: 7)

### FR-2: 천문 계산

- **FR-2.1:** **적도좌표(RA, Dec) → 지평좌표(Az, Alt) 변환**
  - 입력: 별의 RA(시간), Dec(도), 관측 위도(도), 관측 시간(UTC)
  - 출력: 별의 방위각 Az(도), 고도 Alt(도)
  - 정확도: ±1° 이내
- **FR-2.2:** **항성시(Local Sidereal Time, LST) 계산**
- **FR-2.3:** **일몰/일출 시간 계산** (관측 위도/경도/날짜 기반)
- **FR-2.4:** **천문 박명 시작/끝 계산** (태양 고도 -18° 기준)
- **FR-2.5:** **달 위상 계산** (입력 시간 기준 달 밝기 %)

### FR-3: 가시성 필터링

- **FR-3.1:** 지평선 위(Alt > 0°)인 별만 표시
- **FR-3.2:** Bortle 등급별 한계 등급 적용 (예: B7 → mag ≤ 4.5)
- **FR-3.3:** 별자리 단위로 필터 (별자리 내 주요 별이 N개 이상 보일 때만 별자리 표시)

### FR-4: 별자리 추천 점수

- **FR-4.1:** 별자리별 점수 계산
  - 가시성 점수 (해당 별자리의 별 중 몇 %가 가시 등급 이내인가)
  - 고도 점수 (별자리 평균 고도가 30°~80° 사이일 때 최고)
  - 별 개수 점수 (별자리 정의된 별 중 표시 가능한 개수)
- **FR-4.2:** Top 3 별자리 추출
- **FR-4.3:** 각 별자리 카드에 점수 + 구성 요소 표시

### FR-5: 시각화

- **FR-5.1:** 둥근 지평선 돔 형태 SVG 맵
- **FR-5.2:** 별 등급에 따라 점 크기 차등 (1등성/2-3등성/4-6등성)
- **FR-5.3:** 별자리 선 그리기 (IAU 정의 기반)
- **FR-5.4:** 별자리 이름 라벨 표시
- **FR-5.5:** 방위 표시 (N/S/E/W)
- **FR-5.6:** 고도 보조선 (30°, 60°)

### FR-6: 별자리 상세 정보

- **FR-6.1:** 별자리 클릭 시 상세 패널 열림
- **FR-6.2:** 표시 정보:
  - 별자리 이름 (한국어/라틴어/약어)
  - 소속 별 목록 (등급순)
  - 현재 방위각/고도
  - 남중 시간
  - 관측 가능 시간(상승~하강)
  - 간단한 신화 텍스트

---

## 🛡️ Non-Functional Requirements (NFR)

### NFR-1: 성능

- **NFR-1.1:** 입력 변경 후 별자리 맵 갱신: ≤ 1초 (9,000개 별 처리 기준)
- **NFR-1.2:** 초기 페이지 로딩: ≤ 3초
- **NFR-1.3:** 백엔드 API 응답: ≤ 500ms (단일 요청)

### NFR-2: 정확성

- **NFR-2.1:** 좌표 변환 오차: ≤ 1°
- **NFR-2.2:** 박명/일몰 계산 오차: ≤ 5분
- **NFR-2.3:** Stellarium 등 검증된 앱과의 별 위치 일치도: 90% 이상

### NFR-3: 사용성

- **NFR-3.1:** 모바일 화면(375px 이상) 대응
- **NFR-3.2:** 다크 테마 (밤하늘 분위기)
- **NFR-3.3:** 한국어 UI
- **NFR-3.4:** 천문 용어에 툴팁/설명 제공

### NFR-4: 접근성

- **NFR-4.1:** 색상 대비 WCAG 2.1 AA 수준 (다크 배경 + 밝은 텍스트)
- **NFR-4.2:** 키보드 네비게이션 가능
- **NFR-4.3:** 별자리 정보를 텍스트로도 제공 (시각화 외에)

### NFR-5: 코드 품질

- **NFR-5.1:** 천문 계산 함수는 단위 테스트 작성
- **NFR-5.2:** API 응답은 Pydantic 모델로 타입 검증
- **NFR-5.3:** Frontend는 TypeScript strict 모드

### NFR-6: 확장성

- **NFR-6.1:** 새 별자리/별 데이터 추가가 데이터 파일 수정만으로 가능 (코드 수정 X)
- **NFR-6.2:** 추천 점수 가중치를 설정 파일로 분리
- **NFR-6.3:** 새 도시 위치 추가가 설정 변경만으로 가능

---

## 📐 Data Model (초안)

### Star

```python
class Star(BaseModel):
    hip: int          # Hipparcos ID
    ra: float         # Right Ascension (hours, 0-24)
    dec: float        # Declination (degrees, -90 to +90)
    mag: float        # Visual magnitude
    spect: str | None # Spectral type
    con: str          # Constellation (e.g., "UMa")
    proper: str | None # Proper name (e.g., "Vega")
    dist: float | None # Distance (parsecs)
```

### Constellation

```python
class Constellation(BaseModel):
    code: str         # e.g., "UMa"
    name_ko: str      # e.g., "큰곰자리"
    name_en: str      # e.g., "Ursa Major"
    name_la: str      # e.g., "Ursa Major"
    star_hips: list[int]    # 소속 주요 별 HIP IDs
    line_pairs: list[tuple[int, int]]  # 별자리 선 정의
    myth: str         # 간단한 신화
```

### ObservationRequest

```python
class ObservationRequest(BaseModel):
    latitude: float   # 관측 위도
    longitude: float  # 관측 경도
    datetime_utc: datetime
    bortle_class: int # 1~9
```

### ObservationResponse

```python
class VisibleStar(BaseModel):
    star: Star
    az: float    # 방위각
    alt: float   # 고도

class ConstellationScore(BaseModel):
    code: str
    name_ko: str
    score: float
    visibility_pct: float
    avg_altitude: float
    visible_star_count: int

class ObservationResponse(BaseModel):
    visible_stars: list[VisibleStar]
    visible_constellations: list[ConstellationScore]
    top3: list[ConstellationScore]
    sun_set: datetime
    sun_rise: datetime
    astronomical_twilight_end: datetime
    astronomical_twilight_start: datetime
    moon_phase: float    # 0.0 ~ 1.0
    moon_illumination_pct: float
    limiting_magnitude: float
```

---

## 🔌 API 명세 (초안)

### `POST /api/observations`

**Request:**
```json
{
  "latitude": 37.51,
  "longitude": 127.05,
  "datetime_utc": "2026-05-18T12:30:00Z",
  "bortle_class": 7
}
```

**Response:** `ObservationResponse` (위 모델 참조)

### `GET /api/constellations/{code}`

**Response:** `Constellation` 객체 + 현재 시간 기반 위치 정보

### `GET /api/locations`

**Response:** 미리 정의된 한국 주요 도시 목록

---

## ❌ Out of Scope (이번 워크샵에서 안 함)

- 사용자 인증/회원가입
- 별 보기 일정 저장/공유
- 망원경 추천
- 사진/동영상 업로드
- 실시간 위성 추적 (확장 챌린지로 가능)
- 모바일 네이티브 앱
- 다국어 지원 (한국어만)
- 데이터베이스 연동 (CSV로 충분)
- 배포/호스팅 (로컬 dev 서버만)

---

## 🧪 검증 시나리오

### 정확성 검증

- [ ] 서울(37.5°N) 5월 21시 30분 → 큰곰자리가 북쪽 하늘 60°쯤에 보여야 함
- [ ] Bortle 1(완전 어둠)에서 mag 6.5까지 보임 / Bortle 9(도심)에서 mag 3.0까지 보임
- [ ] 동지(12/22)와 하지(6/22)의 일몰 시간이 적절히 다름
- [ ] 보름달일 때 한계 등급 보정이 들어감 (옵션)

### UX 검증

- [ ] 모바일(iPhone Safari)에서 레이아웃 깨지지 않음
- [ ] 별자리 클릭 → 상세 정보 패널 즉시 응답
- [ ] 슬라이더 조정 → 1초 이내 반영
- [ ] 한국어 폰트 정상 렌더링
