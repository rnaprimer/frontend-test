'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '@/components/ui/use-mobile';

const slides = [
  {
    id: 1,
    number: '01',
    title: 'THE ORIGIN',
    subtitle: 'ROOTED IN HISTORY',
    description: 'Harvested from the finest volcanic soil, crafted for eternal prestige.',
    tags: ['Classic', 'Heritage'],
    bgClass: 'bg-[var(--color-muted-bronze)]',
    imageSrc: '/3.png',
  },
  {
    id: 2,
    number: '02',
    title: 'THE CRAFT',
    subtitle: 'SCULPTED BY NATURE',
    description: 'Each curve and texture holds a story of pure geological perfection.',
    tags: ['Sculpted', 'Prestige'],
    bgClass: 'bg-[var(--color-antique-gold)]',
    imageSrc: '/4.png',
  },
  {
    id: 3,
    number: '03',
    title: 'THE LEGACY',
    subtitle: 'BEYOND TIME',
    description: 'A timeless artifact that transcends generations and digital spaces.',
    tags: ['Artifact', 'Legend'],
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
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title || "Gallery Image"}
                      width={1200}
                      height={1600}
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
      <section 
        ref={mobileRef} 
        className="relative w-full bg-[var(--background)] lg:hidden z-40 pb-[30vh] overflow-x-clip max-w-full [--card-top-offset:56px] [--card-stack-gap:16px] sm:[--card-top-offset:80px] md:[--card-top-offset:128px] md:[--card-stack-gap:28px]"
      >
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
  const isMobile = useIsMobile();
  
  // Dynamic scale ranges matching:
  // Mobile: Card 1 -> 1 to 0.985 to 0.97; Card 2 -> 1 to 0.985; Card 3 -> 1.
  // Desktop/Tablet: Card 1 -> 1 to 0.97 to 0.94; Card 2 -> 1 to 0.97; Card 3 -> 1.
  const scaleStep = isMobile ? 0.015 : 0.03;
  const maxStackOnTop = total - 1 - index;
  
  const inputRange: number[] = [];
  const outputRange: number[] = [];
  
  for (let k = 0; k <= total; k++) {
    const val = k / total;
    inputRange.push(val);
    if (k <= index) {
      outputRange.push(1);
    } else {
      const stackedCount = Math.min(k - index, maxStackOnTop);
      outputRange.push(1 - stackedCount * scaleStep);
    }
  }

  const scale = useTransform(scrollYProgress, inputRange, outputRange, { clamp: true });

  const start = index / total;
  const end = (index + 1) / total;
  const yOffset = useTransform(scrollYProgress, [start, end], [0, -20], { clamp: true });
  
  const isLast = index === total - 1;
  const shadowOpacity = useTransform(
    scrollYProgress, 
    [start, end], 
    [0, isLast ? 0 : 0.12], 
    { clamp: true }
  );

  return (
    <motion.div
      className={`sticky w-full flex flex-col justify-between md:grid md:grid-cols-[40%_60%] gap-4 sm:gap-6 md:gap-12 items-stretch md:items-center overflow-hidden bg-[var(--background)] border border-[#111]/5 shadow-[0_-20px_30px_-15px_rgba(0,0,0,0.12)] origin-top will-change-transform transform-gpu rounded-[32px] pt-8 pb-4 px-6 sm:pt-10 sm:pb-6 sm:px-8 md:pt-14 md:pb-8 md:px-12 h-[72vh] sm:h-[78vh] md:h-[85vh] min-h-[460px] sm:min-h-[540px] md:min-h-[620px] max-h-[600px] sm:max-h-[680px] md:max-h-[760px] max-w-full ${index > 0 ? '-mt-[10vh]' : 'mt-[2vh]'}`}
      style={{ 
        top: `calc(var(--card-top-offset, 56px) + ${index} * var(--card-stack-gap, 16px))`,
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

      {/* Left side: Project Info */}
      <div className="relative z-20 flex flex-col justify-center pr-0 md:pr-8 select-none">
        {/* Project Number */}
        <div className="text-[18vw] sm:text-[14vw] md:text-[10vw] font-serif font-bold text-[#111]/10 leading-none tracking-tighter -mb-3 md:-mb-5">
          {slide.number}
        </div>
        
        {/* Project Title */}
        <h3 className="text-lg sm:text-2xl md:text-4xl font-serif font-extrabold text-[#111] tracking-tight uppercase mb-2 sm:mb-3">
          {slide.title}
        </h3>
        
        {/* Project Description */}
        <p className="text-xs sm:text-sm md:text-base text-[#111]/70 font-sans font-light leading-relaxed mb-4 sm:mb-6 max-w-md">
          {slide.description}
        </p>

        {/* Buttons / Tags */}
        <div className="flex flex-wrap gap-3">
          {slide.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex} 
              className="px-5 py-2 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-[#111] bg-white border border-[#111]/15 rounded-full shadow-sm hover:bg-[#111] hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right side: Project Image */}
      <div className="relative z-20 flex items-center justify-center w-full min-h-[220px] sm:min-h-[280px] md:min-h-[420px] mt-4 sm:mt-6 md:mt-0 translate-y-[-40px] sm:translate-y-[-20px] md:translate-y-0 overflow-visible">
        <Image
          src={slide.imageSrc}
          alt={slide.title || "Gallery Image"}
          width={800}
          height={1200}
          className="film-grade object-contain w-full h-[180px] sm:h-[220px] md:h-auto max-h-[25vh] sm:max-h-[30vh] md:max-h-[55vh] drop-shadow-sm scale-[1.05] sm:scale-[1.1] md:scale-[1.12] overflow-visible"
          style={{
            transform: 'translate3d(0,0,0)',
          }}
        />
      </div>
    </motion.div>
  );
}
