'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yArtwork = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scaleArtwork = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Ambient background blur and fog */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f0ecd8_0%,_transparent_60%)] opacity-40 blur-3xl z-0 pointer-events-none"></div>

      {/* Floating Jewel Particles Overlay - Hide on mobile for performance */}
      {mounted && (
        <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 8 + 4 + 'px',
                height: Math.random() * 8 + 4 + 'px',
                background: ['#c5a059', '#50c878', '#800000', '#40e0d0'][Math.floor(Math.random() * 4)],
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                filter: 'blur(2px)',
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Artwork - 1.png */}
      {/* Outer wrapper for scroll-based parallax */}
      <motion.div
        className="absolute z-30 flex items-center justify-center w-full pointer-events-none"
        style={{
          y: yArtwork,
          scale: scaleArtwork,
          willChange: 'transform'
        }}
      >
        {/* Inner wrapper for continuous floating motion */}
        <motion.div
          animate={{
            y: [0, -10, 0], // Reduced floating height for better mobile feel
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center w-full h-full -translate-y-[8vh] lg:translate-y-0"
        >
          <img
            src="/1.png"
            alt="PotatoBae Grandmother"
            className="film-grade relative w-full h-[85vh] object-cover object-[center_80%] scale-[1.25] lg:scale-100 lg:w-[120vw] lg:h-auto lg:object-contain lg:max-w-none"
            style={{
              background: 'transparent',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))',
              transform: 'translate3d(0,0,0)'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
