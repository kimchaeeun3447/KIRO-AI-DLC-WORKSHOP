# Backend — Domain Entities (Pydantic Models)

## Request Models

### ObserveRequest
```
latitude: float       # -90 ~ 90
longitude: float      # -180 ~ 180
datetime_utc: str     # ISO 8601 UTC
bortle_class: int     # 1 ~ 9
```

## Response Models

### ObserveResponse
```
visible_stars: list[VisibleStar]
constellations: list[ConstellationResult]
top3: list[str]                          # IAU 코드 3개
sun: SunEvents
moon: MoonPhase
limiting_magnitude: float
```

### VisibleStar
```
hip: int
ra: float
dec: float
mag: float
proper: str | None
con: str
alt: float
az: float
```

### ConstellationResult
```
code: str
name_ko: str
score: float                              # 0~10, 소수점 1자리
visible_star_count: int
total_star_count: int
avg_altitude: float
line_pairs_with_coords: list[LinePair]
```

### LinePair
```
from_star: StarCoord   # {hip, alt, az}
to_star: StarCoord     # {hip, alt, az}
```

### StarCoord
```
hip: int
alt: float
az: float
```

### SunEvents
```
sunset: str | None          # ISO 8601 with +09:00
sunrise: str | None
civil_twilight_end: str | None
astronomical_twilight_end: str | None
astronomical_twilight_start: str | None
```

### MoonPhase
```
phase: float               # 0~1
illumination: float        # 0~1
phase_name: str            # 한국어
emoji: str                 # 🌑~🌕
```

### Location (GET /api/locations)
```
key: str
name: str
lat: float
lon: float
default_bortle: int
```

### ConstellationDetail (GET /api/constellations/{code})
```
code: str
name_ko: str
name_en: str
name_la: str
myth: str
stars: list[ConstellationStar]   # mag 오름차순
```

### ConstellationStar
```
hip: int
proper: str | None
bayer: str | None
mag: float
```
