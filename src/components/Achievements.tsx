"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Zap, Rocket, Brain, Diamond, Flame, Sparkles } from "lucide-react";

const achievements = [
  { text: "Solved 100+ DSA Problems", icon: Zap },
  { text: "Built Multiple Full Stack Projects", icon: Rocket },
  { text: "Developed AI-Based Products", icon: Brain },
  { text: "Founded Brainchain Labs", icon: Diamond },
  { text: "Exploring Startup Development", icon: Flame },
  { text: "Active Technology Learner", icon: Sparkles },
];

function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.15;
    const y = (e.clientY - top - height / 2) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section className="relative z-20 bg-black py-20 md:py-32 px-4 sm:px-8 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            Milestones
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <MagneticCard key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: idx * 0.08 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                  className="group flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 cursor-pointer h-full hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                >
                  <div className="w-12 h-12 rounded-xl border border-white/20 bg-transparent flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-white tracking-tight group-hover:text-zinc-200 transition-colors duration-300">
                    {item.text}
                  </h3>
                </motion.div>
              </MagneticCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
