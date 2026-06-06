/** 천체 돔 투영 — Alt/Az → SVG 좌표 변환 */

const SVG_SIZE = 500
const CENTER = SVG_SIZE / 2
const RADIUS = SVG_SIZE / 2 - 20

/**
 * Alt/Az를 SVG (x, y)로 변환한다 (zenith 중심 투영).
 * alt: 0°=가장자리, 90°=중심
 * az: 0°=N (위쪽), 시계방향
 */
export function altAzToSvg(alt: number, az: number): { x: number; y: number } {
  // 거리: 고도 90°→0 (중심), 0°→RADIUS (가장자리)
  const r = RADIUS * (1 - alt / 90)
  // 각도: az 0°=위쪽(N), 시계방향. SVG에서는 -90° 오프셋
  const angle = ((az - 180) * Math.PI) / 180
  const x = CENTER + r * Math.sin(angle)
  const y = CENTER - r * Math.cos(angle)
  return { x, y }
}

export { SVG_SIZE, CENTER, RADIUS }
