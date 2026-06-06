/** Bortle 등급 슬라이더 + 환경 설명 + 한계 등급 */

import { useStore } from '../../store'
import { BORTLE_DESCRIPTIONS, BORTLE_LIMITING_MAG } from '../../types'

export function BortleSlider() {
  const bortle = useStore((s) => s.bortle)
  const setBortle = useStore((s) => s.setBortle)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="bortle-slider" className="text-xs text-slate-400">
        광공해 (Bortle {bortle})
      </label>
      <input
        id="bortle-slider"
        data-testid="bortle-slider"
        type="range"
        min={1}
        max={9}
        value={bortle}
        onChange={(e) => setBortle(Number(e.target.value))}
        className="w-full accent-amber-400"
        aria-valuemin={1}
        aria-valuemax={9}
        aria-valuenow={bortle}
        aria-label={`Bortle 등급 ${bortle}`}
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>{BORTLE_DESCRIPTIONS[bortle]}</span>
        <span className="text-amber-400">
          한계 등급: {BORTLE_LIMITING_MAG[bortle]}
        </span>
      </div>
    </div>
  )
}
