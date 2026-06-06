# 데이터셋 준비 및 전처리

## 개요

StarGazer 워크샵에서 사용하는 천문 데이터셋은 두 가지입니다:

| 파일 | 크기 | 설명 |
|------|------|------|
| `stars.csv` | 451 KB | 육안 관측 가능 별 카탈로그 (8,920개) |
| `constellations.json` | 59 KB | IAU 88 별자리 정의 (선, 이름, 신화) |

---

## 1. stars.csv

### 출처

- **HYG Database v41** — https://github.com/astronexus/HYG-Database
- 라이선스: CC-BY-SA
- 원본: `hyg/CURRENT/hygdata_v41.csv` (119,626행, 37컬럼, ~32MB)

### 전처리 과정

```python
import pandas as pd

df = pd.read_csv('hygdata_v41.csv')

# 1. 육안 관측 한계 등급(6.5)으로 필터링
df_filtered = df[df['mag'] <= 6.5]

# 2. 워크샵에 필요한 컬럼만 추출
cols = ['hip', 'ra', 'dec', 'mag', 'spect', 'con', 'proper', 'dist', 'bayer']
df_out = df_filtered[cols].copy()

# 3. HIP 번호 없는 별은 0으로 채움
df_out['hip'] = df_filtered['hip'].fillna(0).astype(int)

# 4. 별자리(con) 미지정 별 제거 (1행)
df_out = df_out[df_out['con'].notna() & (df_out['con'] != '')]

df_out.to_csv('stars.csv', index=False)
```

### 결과

| 항목 | 값 |
|------|-----|
| 행 수 | 8,920 |
| 별자리 수 | 88 (IAU 전체 커버) |
| 등급 범위 | -1.44 (시리우스) ~ 6.50 |
| proper name 있는 별 | 358개 |
| bayer 명칭 있는 별 | 1,517개 |

### 컬럼 설명

| 컬럼 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `hip` | int | Hipparcos 카탈로그 ID (0 = 미지정) | 32349 |
| `ra` | float | 적경 Right Ascension (시간, 0~24) | 6.7525 |
| `dec` | float | 적위 Declination (도, -90~+90) | -16.7161 |
| `mag` | float | 겉보기 등급 (작을수록 밝음) | -1.44 |
| `spect` | str | 분광형 | A1V |
| `con` | str | 소속 별자리 약어 (IAU 3글자) | CMa |
| `proper` | str | 고유명 (있는 경우) | Sirius |
| `dist` | float | 거리 (파섹) | 2.64 |
| `bayer` | str | 바이어 명칭 | Alp |

### 필터링 근거

- **mag ≤ 6.5**: 인간 육안 한계 등급. Bortle 1(완전 어둠) 환경에서 볼 수 있는 최대 범위.
- Bortle 등급별 한계 등급 매핑은 백엔드에서 처리:
  - Bortle 1 → mag 6.5 / Bortle 4 → mag 5.5 / Bortle 7 → mag 4.0 / Bortle 9 → mag 3.0

---

## 2. constellations.json

### 출처

- **Stellarium** `modern_st` skyculture — https://github.com/Stellarium/stellarium
  - 경로: `skycultures/modern_st/index.json`
  - Sky & Telescope 잡지 기반 현대 별자리 선 정의
- 라이선스: GPL-2.0
- 한국어 이름: IAU 공식 별자리명의 한국천문학회 표준 번역
- 신화/설명: 그리스 신화 및 별자리 유래 요약 (직접 작성)

### 전처리 과정

```python
import json

with open('stellarium_modern_st.json') as f:
    st = json.load(f)

constellations = []
for c in st['constellations']:
    code = c['id'].split()[-1]  # "CON modern_st And" → "And"
    
    # lines → line_pairs 변환
    # Stellarium 형식: [[a, b, c], [d, e]] (연결된 별 시퀀스)
    # 출력 형식: [[a,b], [b,c], [d,e]] (개별 선분 쌍)
    line_pairs = []
    for line in c.get('lines', []):
        for i in range(len(line) - 1):
            line_pairs.append([line[i], line[i+1]])
    
    entry = {
        "code": code,
        "name_ko": KO_NAMES[code],      # 한국어 이름 매핑
        "name_en": c['common_name']['english'],
        "name_la": c['common_name']['native'],
        "line_pairs": line_pairs,        # [[HIP_A, HIP_B], ...]
        "myth": MYTHS[code]              # 신화/설명 텍스트
    }
    constellations.append(entry)

with open('constellations.json', 'w', encoding='utf-8') as f:
    json.dump(constellations, f, ensure_ascii=False, indent=2)
```

### 결과

| 항목 | 값 |
|------|-----|
| 별자리 수 | 88 |
| 총 별자리 선 수 | 844 |
| 별자리 선에 사용된 고유 별 수 | 745 |
| 한국어 이름 | 88개 모두 포함 |
| 신화/설명 | 88개 모두 포함 |

### JSON 구조

```json
{
  "code": "UMa",
  "name_ko": "큰곰자리",
  "name_en": "Great Bear",
  "name_la": "Ursa Major",
  "line_pairs": [[54061, 53910], [53910, 58001], ...],
  "myth": "님프 칼리스토가 변한 곰. 제우스의 사랑을 받아 헤라의 질투로 곰이 되었다."
}
```

- `line_pairs`: 각 원소는 `[HIP_A, HIP_B]` 형태. 두 별을 잇는 선분 하나를 의미.
- `stars.csv`의 `hip` 컬럼과 조인하여 좌표를 얻은 뒤 선을 그림.

---

## 3. 데이터 정합성 검증

### 별자리 선 ↔ stars.csv 매칭

| 항목 | 값 |
|------|-----|
| 별자리 선에 사용된 HIP ID | 745개 |
| stars.csv에 존재하는 HIP ID | 744개 |
| **커버리지** | **99.9%** |

누락 1건: `HIP 55203` (큰곰자리) — HYG 데이터베이스에 해당 ID가 존재하지 않음.
큰곰자리 19개 별 중 18개가 매칭되므로 별자리 선 시각화에 실질적 영향 없음.

### 별자리 코드 매칭

- `stars.csv`의 `con` 컬럼 고유값: 88개
- `constellations.json`의 `code` 고유값: 88개
- **교집합: 88개 (100% 일치)**

---

## 4. 사용 방법 (백엔드 예시)

```python
import pandas as pd
import json

# 별 데이터 로드
stars = pd.read_csv('data/stars.csv')

# 별자리 정의 로드
with open('data/constellations.json', encoding='utf-8') as f:
    constellations = json.load(f)

# 특정 별자리의 별 목록
uma_stars = stars[stars['con'] == 'UMa']

# 별자리 선 그리기용 좌표 조회
uma_def = next(c for c in constellations if c['code'] == 'UMa')
for hip_a, hip_b in uma_def['line_pairs']:
    star_a = stars[stars['hip'] == hip_a].iloc[0]
    star_b = stars[stars['hip'] == hip_b].iloc[0]
    # (star_a['ra'], star_a['dec']) → (star_b['ra'], star_b['dec']) 선 그리기
```

---

## 5. 재생성 방법

원본 데이터에서 다시 생성하려면:

```bash
# 1. HYG Database 다운로드
curl -L -o hygdata_v41.csv \
  "https://raw.githubusercontent.com/astronexus/HYG-Database/refs/heads/main/hyg/CURRENT/hygdata_v41.csv"

# 2. Stellarium skyculture 다운로드 (GitHub API 사용)
curl -sL "https://api.github.com/repos/Stellarium/stellarium/contents/skycultures/modern_st/index.json" \
  | python3 -c "import json,sys,base64; print(base64.b64decode(json.load(sys.stdin)['content']).decode())" \
  > stellarium_modern_st.json

# 3. 전처리 스크립트 실행 (위 코드 참조)
```

---

## 6. 라이선스

| 데이터 | 라이선스 | 비고 |
|--------|----------|------|
| HYG Database | CC-BY-SA | 출처 표기 필요 |
| Stellarium skyculture | GPL-2.0 | 별자리 선 정의 |
| 한국어 이름 | Public Domain | 한국천문학회 표준 |
| 신화/설명 텍스트 | 자체 작성 | 워크샵용 |
