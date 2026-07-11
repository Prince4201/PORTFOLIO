"use client";

import { useEffect, useState } from "react";
import { motion, MotionValue, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";

import { FileText } from "lucide-react";

export default function Overlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Aspiring Full Stack Developer",
    "AI Builder",
    "Startup Founder",
    "Problem Solver",
    "Future Entrepreneur"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Instead of relying on CSS opacity which might have ghosting, we strictly control visibility.
  const [currentSection, setCurrentSection] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) {
      setCurrentSection(1);
    } else if (latest >= 0.2 && latest < 0.8) {
      setCurrentSection(2);
    } else {
      setCurrentSection(3);
    }
  });

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-white p-4 sm:p-8">

      <AnimatePresence mode="wait">
        {currentSection === 1 && (
          <motion.div
            key="section1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
              Prince Jaiswal
            </h1>
            <p className="text-lg sm:text-xl md:text-3xl text-zinc-400 tracking-wide font-light max-w-3xl">
              A Creative Learner
            </p>
          </motion.div>
        )}

        {currentSection === 2 && (
          <motion.div
            key="section2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-24 pointer-events-none"
          >
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-medium tracking-tight leading-tight max-w-5xl text-center flex flex-col items-center gap-2 sm:gap-4">
              <span className="text-zinc-400 italic font-light text-2xl sm:text-3xl md:text-5xl mb-1 sm:mb-2">I am a</span>
              <div className="h-[60px] md:h-[80px] overflow-hidden flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-600 block text-3xl sm:text-4xl md:text-7xl text-center"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h2>
          </motion.div>
        )}

        {currentSection === 3 && (
          <motion.div
            key="section3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-24 text-center pointer-events-none"
          >
            <div className="mb-8 sm:mb-12">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                Prince Jaiswal
              </h1>
              <p className="text-lg sm:text-xl md:text-3xl text-zinc-400 tracking-wide font-light max-w-3xl mx-auto">
                Building AI Products, Full Stack Applications, and Startup Solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto">
              <a href="#projects" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                View Projects
              </a>
              <a href="#brainchain" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-xl border border-white/10 transform hover:scale-105">
                Explore Brainchain Labs
              </a>
              <a href="#contact" className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent text-zinc-300 font-medium hover:text-white transition-all duration-300 underline underline-offset-8 decoration-white/20 hover:decoration-white/50">
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strategic Resume Icon Button used to perfectly cover the AI Watermark */}
      <motion.a
        href="/resume"
        style={{ 
          opacity: useTransform(scrollYProgress, (v) => v >= 0.99 ? 0 : 1),
          pointerEvents: useTransform(scrollYProgress, (v) => v >= 0.99 ? "none" : "auto")
        }}
        className="fixed bottom-9 right-10 z-[9999] w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20 text-white shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-300 group"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-300" />
        <FileText size={26} strokeWidth={2} className="relative z-10 text-blue-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
      </motion.a>

    </div>
  );
}
