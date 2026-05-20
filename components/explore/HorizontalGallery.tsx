'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: '',
    subtitle: '',
    bgClass: 'bg-[var(--color-muted-bronze)]',
    imageSrc: '/3.png',
  },
  {
    id: 2,
    title: '',
    subtitle: '',
    bgClass: 'bg-[var(--color-antique-gold)]',
    imageSrc: '/4.png',
  },
  {
    id: 3,
    title: '',
    subtitle: '',
    bgClass: 'bg-[var(--color-maroon)]',
    imageSrc: '/5.png',
  },
];

export default function HorizontalGallery() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: desktopScrollYProgress } = useScroll({
    target: desktopRef,
  });

  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileRef,
    offset: ['start start', 'end start']
  });

  const x = useTransform(desktopScrollYProgress, [0, 1], ['0%', '-66.6666%']);

  return (
    <>
      {/* DESKTOP: Horizontal Parallax Gallery (1024px+) */}
      <section ref={desktopRef} className="relative h-[300vh] bg-transparent hidden lg:block">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex h-full w-[300vw]">
            {slides.map((slide) => {
              return (
                <div
                  key={slide.id}
                  className="relative h-full w-screen flex flex-col items-center justify-center overflow-hidden"
                >
                  {/* Rectangular Frame (Behind the characters so they break out) */}
                  <div
                    className="absolute z-10 pointer-events-none border-[2px] border-[#111] opacity-90"
                    style={{
                      top: '12vh',
                      bottom: '5vh',
                      left: '8.5vw',
                      right: '8.5vw',
                    }}
                  ></div>

                  {/* Image Layer (In front of the frame) */}
                  <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none pb-[5vh]">
                    <img
                      src={slide.imageSrc}
                      alt={slide.title}
                      className="film-grade object-contain w-full h-[85vh]"
                      style={{
                        maxWidth: 'none',
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
                      }}
                    />
                  </div>

                  {/* Overlay Text Behind Image */}
                  <div className="absolute z-0 text-center pointer-events-none w-full flex flex-col items-center justify-center">
                    <h2 className="ink-bleed text-[12vw] font-serif text-[var(--foreground)] opacity-[0.12] mix-blend-multiply tracking-tighter whitespace-nowrap">
                      {slide.title}
                    </h2>
                  </div>

                  {/* Subtitle floating in foreground */}
                  <div className="absolute z-20 bottom-10 text-center pointer-events-none">
                    <p className="text-2xl text-[var(--foreground)] font-sans font-light uppercase tracking-[0.5em] opacity-60">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* MOBILE & TABLET: Sticky Vertical Slides (<1024px) */}
      <section ref={mobileRef} className="relative w-full bg-[var(--background)] lg:hidden z-40 pb-[5vh]">
        {slides.map((slide, index) => {
          return (
            <MobileStickySlide 
              key={slide.id} 
              slide={slide} 
              index={index} 
              total={slides.length} 
              scrollYProgress={mobileScrollYProgress} 
            />
          );
        })}
      </section>
    </>
  );
}

// Sub-component for Mobile Slides to safely use framer-motion hooks
function MobileStickySlide({ 
  slide, 
  index, 
  total, 
  scrollYProgress 
}: { 
  slide: typeof slides[0], 
  index: number, 
  total: number, 
  scrollYProgress: any 
}) {
  const start = index / total;
  const end = (index + 1) / total;
  
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.98], { clamp: true });
  const yOffset = useTransform(scrollYProgress, [start, end], ['0px', '-20px'], { clamp: true });
  // Subtle depth hint instead of heavy blackout
  const shadowOpacity = useTransform(scrollYProgress, [start, end], [0, 0.12], { clamp: true });

  return (
    <motion.div
      className={`sticky w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--background)] shadow-[0_-20px_30px_-15px_rgba(0,0,0,0.12)] origin-top will-change-transform rounded-[32px] ${index > 0 ? '-mt-[10vh]' : 'mt-[2vh]'}`}
      style={{ 
        top: `calc(8vh + ${index * 20}vh)`,
        scale, 
        y: yOffset,
        zIndex: index + 10 
      }}
    >
      {/* Soft depth overlay */}
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none z-50 rounded-[32px]"
        style={{ opacity: shadowOpacity }}
      />

      {/* Vintage Print Registration Marks */}
      <div className="absolute top-4 left-5 text-[#111] text-[10px] opacity-20 font-mono pointer-events-none">+</div>
      <div className="absolute bottom-4 right-5 text-[#111] text-[10px] opacity-20 font-mono pointer-events-none">+</div>

      {/* Encodaged Overlay Text */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none -mt-8">
        <h2 
          className="ink-bleed font-serif text-[#111] opacity-[0.06] mix-blend-multiply tracking-tighter text-center px-2 whitespace-nowrap"
          style={{ fontSize: 'clamp(4.5rem, 20vw, 10rem)', lineHeight: '0.9' }}
        >
          {slide.title}
        </h2>
      </div>

      {/* Highly compact, scaled up image layer */}
      <div className="relative z-20 w-full flex items-center justify-center pointer-events-none px-4 py-10 md:px-8 md:py-14">
        <img
          src={slide.imageSrc}
          alt={slide.title}
          className="film-grade object-contain w-full max-w-[100%] md:max-w-[90%] h-auto drop-shadow-sm scale-[1.18] md:scale-[1.12]"
          style={{
            transform: 'translate3d(0,0,0)',
            maxHeight: '55vh'
          }}
        />
      </div>

      {/* Refined compact subtitle */}
      <div className="absolute z-20 bottom-5 md:bottom-8 text-center pointer-events-none w-full">
        <p 
          className="text-[#111] font-sans font-medium uppercase opacity-80"
          style={{ fontSize: 'clamp(0.8rem, 2.2vw, 1.2rem)', letterSpacing: '0.4em' }}
        >
          {slide.subtitle}
        </p>
      </div>
    </motion.div>
  );
}
