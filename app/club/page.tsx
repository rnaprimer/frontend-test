'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, Check } from 'lucide-react'
import ExploreNavbar from "@/components/explore/ExploreNavbar"

// Custom Asterisk Logo SVG component
function AsteriskLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} flex-shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="50"
        cy="50"
        rx="46"
        ry="34"
        fill="black"
        transform="rotate(-40 50 50)"
      />
      <g 
        stroke="white" 
        strokeWidth="5.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M45 25 Q50 50 55 75" />
        <path d="M22 45 Q50 50 75 55" />
        <path d="M28 70 Q50 50 70 30" />
      </g>
    </svg>
  )
}

export default function ClubPage() {
  const [activeForm, setActiveForm] = useState<'join' | 'contact' | null>(null)
  
  // Form input states
  const [joinData, setJoinData] = useState({ name: '', email: '', handle: '' })
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' })
  
  // Submission success states
  const [joinSubmitted, setJoinSubmitted] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!joinData.name || !joinData.email) return
    setJoinSubmitted(true)
    setTimeout(() => {
      setJoinSubmitted(false)
      setJoinData({ name: '', email: '', handle: '' })
      setActiveForm(null)
    }, 4000)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactData.name || !contactData.email || !contactData.message) return
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactData({ name: '', email: '', message: '' })
      setActiveForm(null)
    }, 4000)
  }

  return (
    <main className="w-full min-h-screen bg-white text-black relative flex flex-col overflow-x-hidden font-sans">
      
      <ExploreNavbar />

      {/* Grid Layout: Left image, Right interactive menu */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto px-6 md:px-12 pb-16 lg:pb-0 items-center gap-8 md:gap-16">
        
        {/* Left Side: Community Illustration */}
        <div className="w-full flex items-center justify-center relative aspect-video lg:aspect-auto lg:h-[70vh] min-h-[300px]">
          <div className="relative w-full h-full max-h-[550px] flex items-center justify-center">
            <Image
              src="/community.png"
              alt="Potato Community illustration"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side: Options Stack */}
        <div className="w-full flex flex-col justify-center py-6 lg:py-12 z-10">
          
          <div className="flex flex-col gap-12 md:gap-20">
            
            {/* Option 1: JOIN THE COMMUNITY */}
            <div className="w-full flex flex-col">
              <button
                onClick={() => {
                  setActiveForm(activeForm === 'join' ? null : 'join')
                }}
                className="w-full text-left group flex items-center gap-4 md:gap-6 py-4 cursor-pointer outline-none focus:outline-none"
              >
                {/* Custom Asterisk rotated dynamically */}
                <motion.div
                  animate={{ rotate: activeForm === 'join' ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="group-hover:scale-105 transition-transform duration-300"
                >
                  <AsteriskLogo className="w-8 h-8 md:w-12 md:h-12" />
                </motion.div>
                
                <span className="text-xl sm:text-3xl md:text-[2.5rem] font-extrabold tracking-tight uppercase group-hover:opacity-70 transition-opacity select-none">
                  [JOIN THE COMMUNITY]
                </span>
              </button>
              
              {/* Divider under Option 1 */}
              <div className="w-full h-[3px] bg-black" />

              {/* Join form slide-down content */}
              <AnimatePresence initial={false}>
                {activeForm === 'join' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    {joinSubmitted ? (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="py-8 flex flex-col items-center justify-center text-center gap-4"
                      >
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                          <Check className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold tracking-wider">WELCOME TO THE CLUB</h3>
                        <p className="text-sm text-gray-500 max-w-xs font-mono">You've successfully joined the PotatoBae community.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleJoinSubmit} className="pt-8 pb-4 flex flex-col gap-6 w-full max-w-md">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">YOUR NAME</label>
                          <input
                            type="text"
                            required
                            placeholder="POTATO ENTHUSIAST"
                            value={joinData.name}
                            onChange={(e) => setJoinData({ ...joinData, name: e.target.value })}
                            className="w-full border-b border-black py-2.5 outline-none font-mono text-sm uppercase placeholder:opacity-40 focus:border-b-2 transition-all"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">EMAIL ADDRESS</label>
                          <input
                            type="email"
                            required
                            placeholder="HELLO@POTATO.COM"
                            value={joinData.email}
                            onChange={(e) => setJoinData({ ...joinData, email: e.target.value })}
                            className="w-full border-b border-black py-2.5 outline-none font-mono text-sm uppercase placeholder:opacity-40 focus:border-b-2 transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">SOCIAL HANDLE (OPTIONAL)</label>
                          <input
                            type="text"
                            placeholder="@POTATOBAE"
                            value={joinData.handle}
                            onChange={(e) => setJoinData({ ...joinData, handle: e.target.value })}
                            className="w-full border-b border-black py-2.5 outline-none font-mono text-sm uppercase placeholder:opacity-40 focus:border-b-2 transition-all"
                          />
                        </div>

                        <button
                          type="submit"
                          className="mt-2 w-full py-4 bg-black text-white hover:bg-neutral-800 transition-colors font-bold text-sm tracking-widest uppercase"
                        >
                          SUBMIT APPLICATION
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Option 2: CONTACT US */}
            <div className="w-full flex flex-col">
              <button
                onClick={() => {
                  setActiveForm(activeForm === 'contact' ? null : 'contact')
                }}
                className="w-full text-left group flex items-center gap-4 md:gap-6 py-4 cursor-pointer outline-none focus:outline-none"
              >
                {/* Custom Asterisk rotated dynamically */}
                <motion.div
                  animate={{ rotate: activeForm === 'contact' ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="group-hover:scale-105 transition-transform duration-300"
                >
                  <AsteriskLogo className="w-8 h-8 md:w-12 md:h-12" />
                </motion.div>
                
                <span className="text-xl sm:text-3xl md:text-[2.5rem] font-extrabold tracking-tight uppercase group-hover:opacity-70 transition-opacity select-none">
                  [CONTACT US]
                </span>
              </button>
              
              {/* Divider under Option 2 */}
              <div className="w-full h-[3px] bg-black" />

              {/* Contact form slide-down content */}
              <AnimatePresence initial={false}>
                {activeForm === 'contact' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    {contactSubmitted ? (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="py-8 flex flex-col items-center justify-center text-center gap-4"
                      >
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                          <Check className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold tracking-wider">MESSAGE SENT</h3>
                        <p className="text-sm text-gray-500 max-w-xs font-mono">We will get back to you as soon as possible.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="pt-8 pb-4 flex flex-col gap-6 w-full max-w-md">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">YOUR NAME</label>
                          <input
                            type="text"
                            required
                            placeholder="POTATO LOVER"
                            value={contactData.name}
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            className="w-full border-b border-black py-2.5 outline-none font-mono text-sm uppercase placeholder:opacity-40 focus:border-b-2 transition-all"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">EMAIL ADDRESS</label>
                          <input
                            type="email"
                            required
                            placeholder="HELLO@POTATO.COM"
                            value={contactData.email}
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            className="w-full border-b border-black py-2.5 outline-none font-mono text-sm uppercase placeholder:opacity-40 focus:border-b-2 transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold tracking-widest uppercase text-gray-500">YOUR MESSAGE</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="TELL US ANYTHING..."
                            value={contactData.message}
                            onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                            className="w-full border-b border-black py-2.5 outline-none font-mono text-sm uppercase placeholder:opacity-40 focus:border-b-2 transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="mt-2 w-full py-4 bg-black text-white hover:bg-neutral-800 transition-colors font-bold text-sm tracking-widest uppercase"
                        >
                          SEND MESSAGE
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-xs font-mono tracking-widest text-neutral-400 select-none">
        POTATOBAE EST. 2026
      </footer>

    </main>
  )
}
