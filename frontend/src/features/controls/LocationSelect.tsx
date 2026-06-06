/** 위치 선택 드롭다운 */

import { useStore } from '../../store'

export function LocationSelect() {
  const locations = useStore((s) => s.locations)
  const selectedKey = useStore((s) => s.selectedLocationKey)
  const setLocation = useStore((s) => s.setLocation)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="location-select" className="text-xs text-slate-400">
        관측 위치
      </label>
      <select
        id="location-select"
        data-testid="location-select"
        value={selectedKey}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-slate-800/60 backdrop-blur border border-slate-600/50
          rounded-lg px-3 py-2 text-sm text-white focus:outline-none
          focus:ring-2 focus:ring-cyan-500/50"
      >
        <option value="">직접 입력</option>
        {locations.map((loc) => (
          <option key={loc.key} value={loc.key}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  )
}
