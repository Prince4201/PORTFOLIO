"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const navItems = ["Home", "About", "Skills", "Brainchain", "Projects", "Contact"];

function MagneticItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };
  
  const mouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      let currentSection = navItems[0];
      
      for (const item of navItems) {
        const id = item.toLowerCase().replace(" ", "");
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is at or above 300px from the top of the viewport,
          // we consider it the active section.
          if (rect.top <= 300) {
            currentSection = item;
          }
        }
      }
      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4"
    >
      <motion.nav 
        className={`flex items-center gap-1 md:gap-2 p-1.5 rounded-full transition-all duration-500 overflow-x-auto no-scrollbar border ${
          isScrolled 
            ? "bg-[#050505]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent"
        }`}
      >
        {navItems.map((item) => (
          <MagneticItem key={item}>
            <a
              href={`#${item.toLowerCase().replace(" ", "")}`}
              onClick={() => setActive(item)}
              className={`relative px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors whitespace-nowrap block ${
                active === item ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {active === item && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-white/15 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </a>
          </MagneticItem>
        ))}
      </motion.nav>
    </motion.div>
  );
}
