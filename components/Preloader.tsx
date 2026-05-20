'use client'

import { useEffect, useState } from 'react'


export default function Preloader() {
  const [stage, setStage] = useState<'entry' | 'idle' | 'exit' | 'hidden'>('entry')

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = 'hidden'

    // Transition from entry to idle animation
    const entryTimer = setTimeout(() => {
      setStage('idle')
    }, 800)

    // Start exit transition
    const exitTimer = setTimeout(() => {
      setStage('exit')
    }, 2800)

    // Unmount and restore scroll
    const hideTimer = setTimeout(() => {
      setStage('hidden')
      document.body.style.overflow = ''
    }, 3800)

    return () => {
      clearTimeout(entryTimer)
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (stage === 'hidden') return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        stage === 'exit' ? 'opacity-0 backdrop-blur-md pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ultra-subtle film grain overlay for cinematic feel */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className={`relative flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          stage === 'entry'
            ? 'opacity-0 scale-[0.96]'
            : stage === 'idle'
            ? 'opacity-100 scale-100 animate-preloader-idle'
            : 'opacity-0 scale-[1.05] blur-sm'
        }`}
      >
        {/* Inline SVG for zero-latency, instant loading */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-auto max-w-[180px] sm:max-w-[220px] drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          {/* Outlined tilted ellipse representing the outer boundary */}
          <ellipse
            cx="100"
            cy="100"
            rx="72"
            ry="46"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            transform="rotate(-33 100 100)"
          />

          {/* Organic hand-drawn asterisk using quadratic curves for natural bends */}
          <g stroke="white" strokeWidth="8.5" strokeLinecap="round" fill="none">
            {/* Top-Left to Bottom-Right stroke */}
            <path d="M 86,80 Q 98,99 110,125" />
            {/* Top-Right to Bottom-Left stroke */}
            <path d="M 115,75 Q 100,100 88,120" />
            {/* Left to Right stroke */}
            <path d="M 75,96 Q 98,102 125,105" />
          </g>
        </svg>
      </div>
    </div>
  )
}
