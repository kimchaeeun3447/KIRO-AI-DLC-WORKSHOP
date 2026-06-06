/** Zustand 단일 스토어 — 입력 상태 + API 응답 + UI 상태 */

import { create } from 'zustand'
import { postObserve, getLocations } from './api/client'
import type { Location, ObserveResponse } from './types'

interface AppState {
  // 입력 상태
  locations: Location[]
  selectedLocationKey: string
  latitude: number
  longitude: number
  datetime: string // ISO UTC
  bortle: number

  // API 응답
  response: ObserveResponse | null
  loading: boolean
  error: string | null

  // UI 상태
  selectedConstellation: string | null

  // Actions
  initLocations: () => Promise<void>
  setLocation: (key: string) => void
  setCoordinates: (lat: number, lon: number) => void
  setDatetime: (dt: string) => void
  setBortle: (b: number) => void
  setSelectedConstellation: (code: string | null) => void
  fetchObservation: () => Promise<void>
  clearError: () => void
}

// 기본값: 서울 강남, 현재 시각
function nowUTC(): string {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

export const useStore = create<AppState>((set, get) => ({
  // 초기값
  locations: [],
  selectedLocationKey: 'seoul_gangnam',
  latitude: 37.498,
  longitude: 127.028,
  datetime: nowUTC(),
  bortle: 8,
  response: null,
  loading: false,
  error: null,
  selectedConstellation: null,

  initLocations: async () => {
    try {
      const locs = await getLocations()
      set({ locations: locs })
    } catch (e) {
      set({ error: e instanceof Error ? e.message : '위치 목록을 불러올 수 없습니다' })
    }
  },

  setLocation: (key: string) => {
    const loc = get().locations.find((l) => l.key === key)
    if (loc) {
      set({
        selectedLocationKey: key,
        latitude: loc.lat,
        longitude: loc.lon,
        bortle: loc.default_bortle,
      })
      get().fetchObservation()
    }
  },

  setCoordinates: (lat: number, lon: number) => {
    set({ latitude: lat, longitude: lon, selectedLocationKey: '' })
    get().fetchObservation()
  },

  setDatetime: (dt: string) => {
    set({ datetime: dt })
    get().fetchObservation()
  },

  setBortle: (b: number) => {
    set({ bortle: b })
    get().fetchObservation()
  },

  setSelectedConstellation: (code: string | null) => {
    set({ selectedConstellation: code })
  },

  fetchObservation: async () => {
    // 300ms 디바운스
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      const { latitude, longitude, datetime, bortle } = get()
      set({ loading: true })
      try {
        const res = await postObserve({
          latitude,
          longitude,
          datetime_utc: datetime,
          bortle_class: bortle,
        })
        set({ response: res, error: null })
      } catch (e) {
        set({ error: e instanceof Error ? e.message : '관측 데이터를 불러올 수 없습니다' })
      } finally {
        set({ loading: false })
      }
    }, 300)
  },

  clearError: () => set({ error: null }),
}))
