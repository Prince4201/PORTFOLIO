"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate percentage scrolled
      const progress = scrollPosition / (documentHeight - windowHeight);
      setScrollProgress(progress);

      // Show button after scrolling past the hero animation (approx 4.5 screens down)
      if (scrollPosition > windowHeight * 4.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center cursor-pointer group"
          onClick={scrollToTop}
        >
          {/* SVG for circular progress */}
          <svg className="absolute w-14 h-14 transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-white/10"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={24 * 2 * Math.PI}
              strokeDashoffset={24 * 2 * Math.PI - scrollProgress * (24 * 2 * Math.PI)}
              className="text-white transition-all duration-150 ease-out"
            />
          </svg>
          
          <div className="w-10 h-10 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-300">
            <ArrowUp className="w-5 h-5" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
