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
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-auto max-w-[180px] sm:max-w-[220px] drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <g clipPath="url(#clip0_7960_43945)">
            {/* The preloader background is pure black, so this matches seamlessly */}
            <rect width="180" height="180" rx="37" fill="black" />
            <g style={{ transform: 'scale(95%)', transformOrigin: 'center' }}>
              <path
                fill="white"
                d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z"
              />
              <path
                fill="white"
                d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_7960_43945">
              <rect width="180" height="180" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  )
}
