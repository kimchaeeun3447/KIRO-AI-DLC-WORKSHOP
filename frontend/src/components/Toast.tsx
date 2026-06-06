/** 에러 토스트 — 한국어 메시지 + 자동 사라짐 */

import { useEffect } from 'react'
import { useStore } from '../store'

export function Toast() {
  const error = useStore((s) => s.error)
  const clearError = useStore((s) => s.clearError)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  if (!error) return null

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl
        bg-rose-900/60 backdrop-blur-md border border-rose-400/30
        text-rose-100 shadow-lg shadow-rose-900/20 max-w-md text-center"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center gap-3">
        <span className="text-rose-300">⚠️</span>
        <span className="text-sm">{error}</span>
        <button
          onClick={clearError}
          className="ml-2 text-rose-300 hover:text-rose-100 transition-colors"
          aria-label="닫기"
          data-testid="toast-close-button"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
