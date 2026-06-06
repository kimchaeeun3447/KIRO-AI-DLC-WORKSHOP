/** 레이아웃 — 밤하늘 배경 + 글래스모피즘 컨테이너 */

import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* 오로라 배경 블롭 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full
          bg-gradient-to-br from-indigo-900/30 via-violet-900/20 to-transparent
          blur-3xl animate-pulse" style={{ animationDuration: '20s' }} />
        <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full
          bg-gradient-to-tl from-cyan-900/20 via-indigo-900/15 to-transparent
          blur-3xl animate-pulse" style={{ animationDuration: '25s' }} />
      </div>
      {/* 콘텐츠 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
