/** API 타입 정의 — SPEC §7 API 스키마 기반 */

export interface ObserveRequest {
  latitude: number
  longitude: number
  datetime_utc: string
  bortle_class: number
}

export interface VisibleStar {
  hip: number
  ra: number
  dec: number
  mag: number
  proper: string | null
  con: string
  alt: number
  az: number
}

export interface StarCoord {
  hip: number
  alt: number
  az: number
}

export interface LinePair {
  from: StarCoord
  to: StarCoord
}

export interface ConstellationResult {
  code: string
  name_ko: string
  score: number
  visible_star_count: number
  total_star_count: number
  avg_altitude: number
  line_pairs_with_coords: LinePair[]
}

export interface SunEvents {
  sunset: string | null
  sunrise: string | null
  civil_twilight_end: string | null
  astronomical_twilight_end: string | null
  astronomical_twilight_start: string | null
}

export interface MoonPhase {
  phase: number
  illumination: number
  phase_name: string
  emoji: string
}

export interface ObserveResponse {
  visible_stars: VisibleStar[]
  constellations: ConstellationResult[]
  top3: string[]
  sun: SunEvents
  moon: MoonPhase
  limiting_magnitude: number
}

export interface Location {
  key: string
  name: string
  lat: number
  lon: number
  default_bortle: number
}

export interface ConstellationStar {
  hip: number
  proper: string | null
  bayer: string | null
  mag: number
}

export interface ConstellationDetail {
  code: string
  name_ko: string
  name_en: string
  name_la: string
  myth: string
  stars: ConstellationStar[]
}

/** Bortle 등급 → 환경 설명 */
export const BORTLE_DESCRIPTIONS: Record<number, string> = {
  1: '최상의 어둠',
  2: '전형적 어두운 곳',
  3: '시골 하늘',
  4: '시골/교외 경계',
  5: '교외 하늘',
  6: '밝은 교외',
  7: '교외/도시 경계',
  8: '도시 하늘',
  9: '도심',
}

export const BORTLE_LIMITING_MAG: Record<number, number> = {
  1: 6.5, 2: 6.3, 3: 6.0, 4: 5.5, 5: 5.0,
  6: 4.5, 7: 4.0, 8: 3.5, 9: 3.0,
}
