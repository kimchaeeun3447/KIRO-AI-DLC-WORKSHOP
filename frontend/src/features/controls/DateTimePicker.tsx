/** 날짜/시간 입력 — KST 표시, UTC 저장 */

import { useStore } from '../../store'

export function DateTimePicker() {
  const datetime = useStore((s) => s.datetime)
  const setDatetime = useStore((s) => s.setDatetime)

  // UTC → KST 로컬 표시용 변환
  const toLocalString = (utc: string): string => {
    const d = new Date(utc)
    const offset = d.getTimezoneOffset()
    const local = new Date(d.getTime() - offset * 60000)
    return local.toISOString().slice(0, 16)
  }

  // 로컬 입력 → UTC 변환
  const handleChange = (value: string) => {
    const local = new Date(value)
    setDatetime(local.toISOString().replace(/\.\d{3}Z$/, 'Z'))
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="datetime-input" className="text-xs text-slate-400">
        관측 시각 (KST)
      </label>
      <input
        id="datetime-input"
        data-testid="datetime-input"
        type="datetime-local"
        value={toLocalString(datetime)}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-slate-800/60 backdrop-blur border border-slate-600/50
          rounded-lg px-3 py-2 text-sm text-white focus:outline-none
          focus:ring-2 focus:ring-cyan-500/50"
      />
    </div>
  )
}
