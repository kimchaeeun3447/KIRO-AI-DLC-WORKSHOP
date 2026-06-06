/** SkyMap — 원형 지평선 돔 SVG + 줌/패닝 */

import { useCallback, useRef, useState } from 'react'
import { useStore } from '../../store'
import { altAzToSvg, SVG_SIZE, CENTER, RADIUS } from './projection'
import type { ConstellationResult, VisibleStar } from '../../types'

/** 별 등급 → 점 크기 (3단계) */
function starRadius(mag: number): number {
  if (mag < 1) return 3.5
  if (mag < 3) return 2.5
  return 1.5
}

export function SkyMap() {
  const response = useStore((s) => s.response)
  const selectedConstellation = useStore((s) => s.selectedConstellation)
  const setSelectedConstellation = useStore((s) => s.setSelectedConstellation)

  const svgRef = useRef<SVGSVGElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const newZoom = Math.max(1, Math.min(5, zoom - e.deltaY * 0.002))
    setZoom(newZoom)
    if (newZoom <= 1) setPan({ x: 0, y: 0 })
  }, [zoom])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      setDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }, [zoom, pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }
  }, [dragging, dragStart])

  const handleMouseUp = useCallback(() => setDragging(false), [])

  const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  const handleConstellationClick = (code: string) => {
    setSelectedConstellation(selectedConstellation === code ? null : code)
  }

  const stars: VisibleStar[] = response?.visible_stars ?? []
  const constellations: ConstellationResult[] = response?.constellations ?? []

  return (
    <div className="relative" aria-label="별자리 지도">
      {/* 줌 컨트롤 */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        <button
          onClick={() => setZoom(Math.min(5, zoom + 0.5))}
          className="w-8 h-8 bg-slate-800/60 backdrop-blur border border-slate-600/50
            rounded-lg text-white hover:bg-slate-700/60 transition-colors"
          aria-label="확대"
          data-testid="zoom-in-button"
        >+</button>
        <button
          onClick={() => { const z = Math.max(1, zoom - 0.5); setZoom(z); if (z <= 1) setPan({x:0,y:0}) }}
          className="w-8 h-8 bg-slate-800/60 backdrop-blur border border-slate-600/50
            rounded-lg text-white hover:bg-slate-700/60 transition-colors"
          aria-label="축소"
          data-testid="zoom-out-button"
        >−</button>
        <button
          onClick={resetZoom}
          className="w-8 h-8 bg-slate-800/60 backdrop-blur border border-slate-600/50
            rounded-lg text-white text-xs hover:bg-slate-700/60 transition-colors"
          aria-label="줌 리셋"
          data-testid="zoom-reset-button"
        >⟲</button>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        className="w-full max-w-[500px] mx-auto aspect-square cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="img"
        aria-label="별자리 관측 지도"
      >
        <title>별자리 관측 지도</title>
        <desc>현재 관측 조건에서 보이는 별과 별자리를 표시하는 원형 지도</desc>

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
           style={{ transformOrigin: 'center' }}>
          {/* 지평선 원 */}
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none"
            stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
          {/* 고도 보조선 30°, 60° */}
          <circle cx={CENTER} cy={CENTER} r={RADIUS * (1 - 30/90)}
            fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx={CENTER} cy={CENTER} r={RADIUS * (1 - 60/90)}
            fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="0.5" strokeDasharray="4 4" />

          {/* 방위 표시 */}
          <text x={CENTER} y={18} textAnchor="middle" className="fill-slate-400 text-xs">N</text>
          <text x={CENTER} y={SVG_SIZE - 8} textAnchor="middle" className="fill-slate-400 text-xs">S</text>
          <text x={12} y={CENTER + 4} textAnchor="middle" className="fill-slate-400 text-xs">E</text>
          <text x={SVG_SIZE - 12} y={CENTER + 4} textAnchor="middle" className="fill-slate-400 text-xs">W</text>

          {/* 별자리 선 */}
          {constellations.map((con) => (
            <g key={con.code}
               onClick={() => handleConstellationClick(con.code)}
               className="cursor-pointer">
              {con.line_pairs_with_coords.map((lp, i) => {
                const from = altAzToSvg(lp.from.alt, lp.from.az)
                const to = altAzToSvg(lp.to.alt, lp.to.az)
                return (
                  <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={selectedConstellation === con.code
                      ? 'url(#aurora-gradient)' : 'rgba(255,255,255,0.25)'}
                    strokeWidth={selectedConstellation === con.code ? 1.5 : 0.8} />
                )
              })}
            </g>
          ))}

          {/* 별 */}
          {stars.map((star) => {
            const { x, y } = altAzToSvg(star.alt, star.az)
            return (
              <circle key={star.hip} cx={x} cy={y} r={starRadius(star.mag)}
                fill="white" opacity={star.mag < 1 ? 1 : 0.8} />
            )
          })}

          {/* 별자리 라벨 */}
          {constellations.map((con) => {
            if (con.line_pairs_with_coords.length === 0) return null
            const avgAlt = con.avg_altitude
            const firstLine = con.line_pairs_with_coords[0]
            const pos = altAzToSvg(avgAlt, firstLine.from.az)
            return (
              <text key={`label-${con.code}`} x={pos.x} y={pos.y - 8}
                textAnchor="middle"
                className={`text-[9px] ${selectedConstellation === con.code
                  ? 'fill-amber-400' : 'fill-slate-300/70'}`}
                onClick={() => handleConstellationClick(con.code)}
                style={{ cursor: 'pointer' }}>
                {con.name_ko}
              </text>
            )
          })}
        </g>

        {/* 오로라 그라데이션 정의 */}
        <defs>
          <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
