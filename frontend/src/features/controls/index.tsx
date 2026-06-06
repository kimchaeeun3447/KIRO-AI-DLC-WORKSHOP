/** Controls 패널 — 모든 입력 컴포넌트 조합 */

import { LocationSelect } from './LocationSelect'
import { CoordinateInput } from './CoordinateInput'
import { DateTimePicker } from './DateTimePicker'
import { BortleSlider } from './BortleSlider'

export function Controls() {
  return (
    <section
      className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50
        rounded-2xl p-4 space-y-4"
      aria-label="관측 조건 설정"
    >
      <div className="flex flex-wrap gap-4">
        <LocationSelect />
        <CoordinateInput />
        <DateTimePicker />
      </div>
      <BortleSlider />
    </section>
  )
}
