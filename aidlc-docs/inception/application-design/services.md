# Services

## Backend Service Layer

### ObservationService
- **책임**: `POST /api/observe` 요청의 오케스트레이션
- **흐름**:
  1. 입력 검증 (위경도 범위, datetime 파싱)
  2. `data` 패키지에서 별/별자리 로드
  3. `astronomy` 패키지로 Alt/Az 일괄 계산
  4. 가시성 필터링 (지평선 + Bortle 한계 등급)
  5. 별자리 추천 점수 산출 + Top 3 추출
  6. 태양 이벤트 + 달 위상 계산
  7. 응답 조립 + 반환

### DataService
- **책임**: 데이터 로드 및 캐싱 (앱 시작 시 1회 로드, 메모리 유지)
- **패턴**: 모듈 레벨 캐싱 (singleton-like)

---

## Frontend Service Layer

### API Service
- **책임**: Backend HTTP 통신 추상화
- **패턴**: fetch wrapper + 에러 핸들링 (status code → 한국어 메시지)

### Debounce Service
- **책임**: 입력 변경 시 300ms 디바운스 후 API 호출 트리거
- **패턴**: Zustand store 내 debounced action
