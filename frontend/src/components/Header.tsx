/** 헤더 — 로고 + 현재 위치 + 시각 표시 */

export function Header() {
  return (
    <header className="relative z-10 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          ✦ StarGazer
        </h1>
      </div>
      <div className="mt-2 h-px bg-gradient-to-r from-cyan-400/50 via-violet-400/50 to-pink-400/50" />
    </header>
  )
}
