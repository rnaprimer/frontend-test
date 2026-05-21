'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-4 md:px-8 py-3.5 bg-transparent">
        {/* Left side: Logo */}
        <div className="flex items-center gap-3 relative z-[101]">
          {/* Custom Logo replicating the uploaded image */}
          <svg
            viewBox="0 0 100 100"
            className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Black tilted oval, dynamically inverts when menu opens */}
            <ellipse
              cx="50"
              cy="50"
              rx="46"
              ry="34"
              fill={isOpen ? "white" : "black"}
              className="transition-colors duration-500"
              transform="rotate(-40 50 50)"
            />
            {/* Hand-drawn style asterisk */}
            <g 
              stroke={isOpen ? "black" : "white"} 
              className="transition-colors duration-500"
              strokeWidth="5.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M45 25 Q50 50 55 75" />
              <path d="M22 45 Q50 50 75 55" />
              <path d="M28 70 Q50 50 70 30" />
            </g>
          </svg>
          <span className={`font-bold text-base md:text-xl tracking-tight transition-colors duration-500 ${isOpen ? 'text-white' : 'text-black'}`}>
            POTATOBAE
          </span>
        </div>

        {/* Right side: Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          <Link
            href="/explore"
            className="text-black font-bold text-sm md:text-base tracking-wider hover:opacity-70 transition-opacity"
          >
            EXPLORE
          </Link>
          <Link
            href="#"
            className="text-black font-bold text-sm md:text-base tracking-wider hover:opacity-70 transition-opacity"
          >
            JOIN THE CLUB
          </Link>
        </div>

        {/* Right side: Mobile Menu Toggle */}
        <div className="md:hidden flex items-center relative z-[101]">
          <button 
            className={`p-2 focus:outline-none transition-colors duration-500 ${isOpen ? 'text-white' : 'text-black'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#111] flex flex-col items-center justify-center"
          >
            {/* Vintage texture overlay for mobile menu */}
            <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-screen pointer-events-none"></div>
            
            <nav className="flex flex-col items-center gap-10 relative z-[91]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                <Link
                  href="/explore"
                  onClick={() => setIsOpen(false)}
                  className="text-[#f3ebe1] text-5xl font-serif tracking-wider hover:text-[#d8ff65] transition-colors"
                >
                  Explore
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="text-[#f3ebe1] text-5xl font-serif tracking-wider hover:text-[#d8ff65] transition-colors whitespace-nowrap"
                >
                  Join the Club
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-12 text-[#f3ebe1]/30 text-sm font-mono tracking-[0.4em] uppercase"
            >
              EST. 2026
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
