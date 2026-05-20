'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function FinaleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const scaleArtwork = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const yArtwork = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] flex flex-col items-center justify-end overflow-hidden bg-[var(--background)] z-50 -mt-[15vh] lg:mt-0"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#e8dbbe_0%,_transparent_70%)] opacity-30 blur-3xl z-0 pointer-events-none"></div>

      {/* Typography removed as per request */}

      {/* Footer Artwork - 2.png */}
      <motion.div
        className="absolute bottom-0 z-30 flex items-end justify-center pointer-events-none w-full"
        style={{ 
          scale: scaleArtwork, 
          y: yArtwork,
          willChange: 'transform'
        }}
      >
        <Image
          src="/2.png"
          alt="PotatoBae Grandpa"
          width={2000}
          height={2000}
          className="film-grade relative w-full h-[85vh] object-cover object-bottom scale-[1.25] lg:scale-100 lg:w-[120vw] lg:h-auto lg:object-contain lg:max-w-none lg:object-bottom"
          style={{
            background: 'transparent',
            filter: 'drop-shadow(0 -30px 60px rgba(0,0,0,0.15))',
            transform: 'translate3d(0,0,0)'
          }}
        />
      </motion.div>
    </section>
  );
}
