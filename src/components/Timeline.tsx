"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineItems = [
  {
    year: "2024",
    title: "The Beginning",
    description: "Started learning programming and software development.",
  },
  {
    year: "2025",
    title: "Mastering the Stack",
    description: "Focused on full-stack development and modern web technologies.",
  },
  {
    year: "2026",
    title: "Building Products",
    description: "Built TOONVERSE-AI and CreatorFind AI. Started Brainchain Labs.",
  },
  {
    year: "Future Goals",
    title: "Scaling Up",
    description: "Launch scalable SaaS products, build AI-focused startups, and create products used by thousands of users.",
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative z-20 bg-black py-32 px-8">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            My Journey
          </h2>
        </motion.div>

        <div className="relative ml-4 md:ml-12 space-y-16 py-8">
          {/* Faded background line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />
          
          {/* Animated active line */}
          <motion.div 
            className="absolute left-[-1px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 via-rose-500 to-transparent origin-top z-10"
            style={{ scaleY: lineHeight }}
          />

          {timelineItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
              className="relative pl-8 md:pl-12 group cursor-default"
            >
              <motion.div 
                className="absolute -left-[9px] top-2 w-4 h-4 bg-black border-2 border-zinc-600 rounded-full z-20 transition-colors duration-300 group-hover:border-rose-400 group-hover:bg-rose-400 group-hover:shadow-[0_0_20px_rgba(251,113,133,0.8)]"
                whileHover={{ scale: 1.5 }}
              />
              <span className="block text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                {item.year}
              </span>
              <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-4 group-hover:text-rose-200 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl group-hover:text-zinc-300 transition-colors duration-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
