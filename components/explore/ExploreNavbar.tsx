'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ExploreNavbar() {
  const [activeTab, setActiveTab] = useState<'goback' | 'explore'>('explore');
  const router = useRouter();

  const handleGoBack = () => {
    setActiveTab('goback');
    // Allow the fluid animation to play for a brief moment before navigating
    setTimeout(() => {
      router.push('/');
    }, 250); 
  };

  const handleExplore = () => {
    setActiveTab('explore');
  };

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]">
      <div className="bg-white rounded-full p-1 sm:p-1.5 flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 backdrop-blur-sm">
        
        {/* Go Back Button */}
        <button 
          onClick={handleGoBack}
          className="relative rounded-full px-5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-center font-semibold text-xs sm:text-sm text-black whitespace-nowrap z-10 outline-none select-none transition-opacity hover:opacity-80 active:opacity-60"
        >
          {activeTab === 'goback' && (
            <motion.div
              layoutId="explore-nav-pill"
              className="absolute inset-0 bg-[#c4f092] rounded-full -z-10"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          Go back
        </button>

        {/* Explore Button */}
        <button 
          onClick={handleExplore}
          className="relative rounded-full pl-5 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-1.5 flex items-center gap-3 sm:gap-4 font-semibold text-xs sm:text-sm text-black whitespace-nowrap z-10 outline-none select-none transition-opacity hover:opacity-80 active:opacity-60"
        >
          {activeTab === 'explore' && (
            <motion.div
              layoutId="explore-nav-pill"
              className="absolute inset-0 bg-[#c4f092] rounded-full -z-10"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span>Explore</span>
        </button>
      </div>
    </nav>
  );
}

