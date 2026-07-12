"use client";

import { motion } from "framer-motion";

export default function TextMarquee({ words }: { words: string[] }) {
  // Use exactly 6 sets (30 items) to restore the perfect, tighter gap between boxes that you liked
  const items = [...words, ...words, ...words, ...words, ...words, ...words];

  // Restore the original radius of 1200 that provided the exact 3D curve you liked
  const radius = 1200;

  return (
    <div className="relative z-20 bg-black py-20 overflow-hidden select-none h-[200px] w-full">

      {/* 3D Scene Wrapper */}
      <div className="absolute inset-0 flex justify-center items-center" style={{ perspective: "2000px" }}>
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: [0, -360],
            z: -radius // Pushes the cylinder back so the front sits at exactly Z=0
          }}
          transition={{
            rotateY: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 100, // Slightly slower again
              ease: "linear",
            },
            z: { duration: 0 }
          }}
        >
          {items.map((word, idx) => {
            const angle = (360 / items.length) * idx;
            return (
              <div
                key={idx}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="pointer-events-auto px-8 py-3.5 rounded-full border border-white/20 bg-gradient-to-r from-blue-600/40 via-rose-600/40 to-blue-600/40 bg-[length:200%_auto] animate-gradient"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <span className="text-white text-sm md:text-base font-semibold tracking-wide drop-shadow-lg whitespace-nowrap">
                    {word}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* 2D Fade Edges overlaying the 3D scene perfectly.
          By keeping these OUTSIDE the 3D perspective, they perfectly mask the edges and fix the left-side popping issue! */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
