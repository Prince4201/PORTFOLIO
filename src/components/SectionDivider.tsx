"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "0%"]);

  return (
    <div ref={ref} className="relative z-20 bg-transparent py-24 md:py-32 overflow-hidden select-none">
      {/* Horizontal animated line */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 h-[1px]"
        style={{ opacity, width: lineWidth }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />
      </motion.div>
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="text-center relative"
      >
        <span className="text-7xl md:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500/20 via-rose-500/20 to-blue-500/20 select-none pointer-events-none">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
