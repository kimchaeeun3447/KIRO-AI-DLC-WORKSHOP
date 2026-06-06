# Backend — Business Rules

## 입력 검증

| 필드 | 규칙 | 에러 메시지 |
|------|------|------------|
| latitude | -90 ≤ lat ≤ 90 | "위도는 -90~90 범위여야 합니다" |
| longitude | -180 ≤ lon ≤ 180 | "경도는 -180~180 범위여야 합니다" |
| bortle_class | 1 ≤ bortle ≤ 9 (정수) | "Bortle 등급은 1~9 정수여야 합니다" |
| datetime_utc | 유효한 ISO 8601 | "유효한 UTC 날짜시간을 입력하세요" |

## Bortle → 한계 등급 매핑

| Bortle | limiting_mag |
|--------|-------------|
| 1 | 6.5 |
| 2 | 6.3 |
| 3 | 6.0 |
| 4 | 5.5 |
| 5 | 5.0 |
| 6 | 4.5 |
| 7 | 4.0 |
| 8 | 3.5 |
| 9 | 3.0 |

## 가시성 필터링 규칙

1. alt > 0° (지평선 위)
2. mag ≤ limiting_magnitude
3. 별자리 표시 조건: 가시 별 ≥ 2
4. 별자리 선 표시: line_pairs 양 끝 모두 alt > 0° (mag 무관)

## 추천 점수 공식

```
score = 0.4 * visibility_pct + 0.35 * altitude_score + 0.25 * star_count_score
```

- `visibility_pct` = visible_count / total_count_in_constellation
- `altitude_score` = 평균 고도 정규화 (30°=0, 55°=1, 80°=1, 범위 밖 선형 감소)
- `star_count_score` = min(visible_count / 7, 1.0)
- UI 노출: 0~10 스케일, 소수점 1자리 (`score * 10`, round 1)

## 달 위상 한국어 매핑

| phase 범위 | 이름 | 이모지 |
|-----------|------|--------|
| 0.00~0.03 | 신월 | 🌑 |
| 0.03~0.25 | 초승달 | 🌒 |
| 0.25~0.28 | 상현달 | 🌓 |
| 0.28~0.47 | 차오르는 달 | 🌔 |
| 0.47~0.53 | 보름달 | 🌕 |
| 0.53~0.72 | 기우는 달 | 🌖 |
| 0.72~0.75 | 하현달 | 🌗 |
| 0.75~0.97 | 그믐달 | 🌘 |
| 0.97~1.00 | 신월 | 🌑 |

## 태양 이벤트

- 극지 백야/극야 시 해당 필드 `null` 반환
- 시간대: 응답은 KST (+09:00) 포맷
