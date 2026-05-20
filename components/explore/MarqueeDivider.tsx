'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';

const textContent =
  'Potatoप्यार ◆ Potatoجان ◆ Potatoপ্রিয় ◆ Potatoகாதல் ◆ Potatoప్రేమ ◆ Potatoપ્રેમ ◆ Potatoਪਿਆਰ ◆ Potatoପ୍ରେମ ◆ Potatoಪ್ರೀತಿ ◆ Potatoप्रेम ◆ Potatoസ്നേഹം ◆ ';

export default function MarqueeDivider() {
  const { scrollY } = useScroll();

  // Tie the base movement directly to scroll position for that "only moves when scrolling" feel.
  // Lenis provides the natural inertia/settling effect.
  // We use a continuous transform and rely on the wrapping layout.
  // To make it infinite, we just map scrollY to a large negative X translation
  // and ensure we have enough duplicated text to never run out of visual bounds
  // within reasonable scroll limits, or we use a modulo.
  // Since the page is fixed height, mapping is easy, but a modulo is safer.

  // We'll wrap at -50% assuming we duplicate the massive text block twice.
  const x = useTransform(scrollY, (y) => `${-(y * 0.009) % 50}%`);
  // Calculate skew based on scroll velocity for that physical stretch feel
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [5, -5]);

  return (
    <div className="relative z-[100] w-[100vw] overflow-hidden bg-[#d8ff65] mix-blend-multiply flex items-center py-2 border-y border-[#d8ff65]/50 shadow-[0_0_20px_rgba(216,255,101,0.3)]">
      {/* 
        Container with double the content to allow seamless wrapping.
        Each span takes up exactly 50% of the total width.
      */}
      <motion.div
        className="flex whitespace-nowrap will-change-transform items-center"
        style={{ x, skewX }}
      >
        <span className="flex text-[#111] font-sans font-bold uppercase tracking-widest text-sm md:text-base px-4">
          {textContent.repeat(5)}
        </span>
        <span className="flex text-[#111] font-sans font-bold uppercase tracking-widest text-sm md:text-base px-4">
          {textContent.repeat(5)}
        </span>
      </motion.div>
    </div>
  );
}
