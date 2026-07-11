"use client";

import { motion } from "framer-motion";

export default function TextMarquee({ words }: { words: string[] }) {
  const tripled = [...words, ...words, ...words];

  return (
    <div className="relative z-20 bg-black py-10 overflow-hidden select-none">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div
        className="flex gap-5 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {tripled.map((word, idx) => (
          <div key={idx} className="flex-shrink-0">
            <div 
              className="px-7 py-3.5 rounded-full border border-white/20 bg-gradient-to-r from-blue-600/40 via-rose-600/40 to-blue-600/40 bg-[length:200%_auto] animate-gradient"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <span className="text-white text-sm md:text-base font-semibold tracking-wide">
                {word}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
