/** API 클라이언트 — Backend HTTP 통신 + 에러 핸들링 */

import type { ConstellationDetail, Location, ObserveRequest, ObserveResponse } from '../types'

const BASE_URL = '/api'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = '서버 오류가 발생했습니다'
    try {
      const body = await response.json()
      if (body.detail) {
        message = typeof body.detail === 'string' ? body.detail : JSON.stringify(body.detail)
      }
    } catch {
      // JSON 파싱 실패 시 기본 메시지 사용
    }
    throw new Error(message)
  }
  return response.json()
}

export async function postObserve(params: ObserveRequest): Promise<ObserveResponse> {
  const response = await fetch(`${BASE_URL}/observe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  return handleResponse<ObserveResponse>(response)
}

export async function getLocations(): Promise<Location[]> {
  const response = await fetch(`${BASE_URL}/locations`)
  return handleResponse<Location[]>(response)
}

export async function getConstellation(code: string): Promise<ConstellationDetail> {
  const response = await fetch(`${BASE_URL}/constellations/${code}`)
  return handleResponse<ConstellationDetail>(response)
}
