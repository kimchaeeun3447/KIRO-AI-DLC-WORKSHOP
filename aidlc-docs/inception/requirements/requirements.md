# StarGazer — 요구사항 문서

## Intent Analysis

| 항목 | 값 |
|------|-----|
| **요청** | 별자리 관측 앱 (SPEC.md 기반) |
| **유형** | New Project (Greenfield) |
| **범위** | Multi-Component (Backend + Frontend) |
| **복잡도** | Moderate (천문 계산 + SVG 시각화 + 반응형 UI) |

---

## 기술 결정 사항

| 결정 | 선택 |
|------|------|
| 천문 계산 | AstroPy + astroplan |
| 상태 관리 | Zustand 단일 스토어 |
| SVG 줌/패닝 | CSS transform + React 이벤트 직접 구현 |
| Security Extension | 비활성 |
| PBT Extension | 비활성 |

---

## Functional Requirements

SPEC.md §6 전체를 권위 문서로 채택. 요약:

| ID | 기능 | 우선순위 |
|----|------|---------|
| FR-1 | 입력 (도시 드롭다운 + 위경도 + 날짜시간 + Bortle 슬라이더) | P0 |
| FR-2 | 천문 계산 (AstroPy 기반 Alt/Az 변환, 박명, 달 위상) | P0 |
| FR-3 | 가시성 필터링 (지평선 + Bortle 한계 등급) | P0 |
| FR-4 | 별자리 추천 점수 (Top 3) | P1 |
| FR-5 | SkyMap SVG 시각화 (줌/패닝 포함) | P0 |
| FR-6 | 별자리 상세 드로어 (미니맵 + 신화 + 소속별) | P3 |
| FR-7 | 시간 슬라이더 (일몰~일출) | P4 |
| FR-8 | 자동 갱신 (300ms 디바운스) | P0 |
| FR-9 | 에러 처리 (한국어 토스트) | P0 |
| FR-10 | API 계약 준수 | P0 |

---

## Non-Functional Requirements

SPEC.md §9 전체를 권위 문서로 채택. 요약:

| 항목 | 기준 |
|------|------|
| API 응답 시간 | ≤ 500ms |
| 맵 갱신 | ≤ 1초 |
| 좌표 변환 오차 | ≤ 1° |
| 박명 오차 | ≤ 5분 |
| 초기 로딩 | ≤ 3초 |
| 모바일 대응 | ≥ 375px |
| 접근성 | WCAG 2.1 AA |
| 모션 | prefers-reduced-motion 존중 |
| 번들 크기 (gzip) | JS ≤ 200KB, CSS ≤ 30KB |

---

## 제약사항

- 외부 네트워크 호출 금지 (모든 계산 로컬)
- DB / 인증 없음
- localhost only (8000 + 5173)
- 시간대: Asia/Seoul (+9) 기본
- 한국어 UI 전용

---

## 데이터

- `data/stars.csv`: 8,920행, 육안 관측 가능 별 카탈로그
- `data/constellations.json`: IAU 88 별자리 (선 정의 + 한국어 이름 + 신화)
- 두 파일은 이미 workspace에 준비 완료
