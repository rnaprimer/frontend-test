import Link from 'next/link'
import { Menu } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-transparent">
      {/* Left side: Logo */}
      <div className="flex items-center gap-3">
        {/* Custom Logo replicating the uploaded image */}
        <svg
          viewBox="0 0 100 100"
          className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black tilted oval */}
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="34"
            fill="black"
            transform="rotate(-40 50 50)"
          />
          {/* Hand-drawn style white asterisk */}
          <g stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M45 25 Q50 50 55 75" />
            <path d="M22 45 Q50 50 75 55" />
            <path d="M28 70 Q50 50 70 30" />
          </g>
        </svg>
        <span className="font-bold text-black text-lg md:text-2xl tracking-tight">
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

      {/* Right side: Mobile Menu (Hamburger) */}
      <div className="md:hidden flex items-center">
        <button className="text-black p-2 focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}
