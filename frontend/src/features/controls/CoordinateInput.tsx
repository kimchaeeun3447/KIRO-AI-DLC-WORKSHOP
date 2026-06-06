/** 위경도 직접 입력 */

import { useState } from 'react'
import { useStore } from '../../store'

export function CoordinateInput() {
  const latitude = useStore((s) => s.latitude)
  const longitude = useStore((s) => s.longitude)
  const setCoordinates = useStore((s) => s.setCoordinates)

  const [latStr, setLatStr] = useState(latitude.toString())
  const [lonStr, setLonStr] = useState(longitude.toString())

  const handleBlur = () => {
    const lat = parseFloat(latStr)
    const lon = parseFloat(lonStr)
    if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
      setCoordinates(lat, lon)
    }
  }

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="lat-input" className="text-xs text-slate-400">위도</label>
        <input
          id="lat-input"
          data-testid="lat-input"
          type="number"
          step="0.001"
          min={-90}
          max={90}
          value={latStr}
          onChange={(e) => setLatStr(e.target.value)}
          onBlur={handleBlur}
          className="w-24 bg-slate-800/60 backdrop-blur border border-slate-600/50
            rounded-lg px-2 py-2 text-sm text-white focus:outline-none
            focus:ring-2 focus:ring-cyan-500/50"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="lon-input" className="text-xs text-slate-400">경도</label>
        <input
          id="lon-input"
          data-testid="lon-input"
          type="number"
          step="0.001"
          min={-180}
          max={180}
          value={lonStr}
          onChange={(e) => setLonStr(e.target.value)}
          onBlur={handleBlur}
          className="w-24 bg-slate-800/60 backdrop-blur border border-slate-600/50
            rounded-lg px-2 py-2 text-sm text-white focus:outline-none
            focus:ring-2 focus:ring-cyan-500/50"
        />
      </div>
    </div>
  )
}
