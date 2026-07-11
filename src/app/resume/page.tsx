"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import WarpBackground from "@/components/resume/WarpBackground";

export default function ResumePage() {
  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center selection:bg-white/30">
      {/* 3D Warp Background */}
      <WarpBackground />

      {/* Floating UI Container */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl h-[85vh] mx-4 flex flex-col"
      >
        {/* Header / Controls */}
        <div className="flex items-center justify-between mb-6 px-2 md:px-0">
          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg"
            >
              <ArrowLeft size={18} />
              <span>Back to Portfolio</span>
            </motion.button>
          </Link>
          
          <a href="/resume.pdf" download="Prince_Jaiswal_Resume.pdf">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-white bg-blue-600 hover:bg-red-600 px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300 border border-white/10"
            >
              <Download size={18} />
              <span className="font-medium">Download PDF</span>
            </motion.button>
          </a>
        </div>

        {/* Floating Glassmorphism Resume Viewer */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="flex-1 w-full bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.05)] relative"
        >
          {/* Subtle reflection overlay for glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none z-10" />
          
          <iframe 
            src="/resume.pdf#view=FitH" 
            className="w-full h-full border-none relative z-0 rounded-3xl"
            title="Prince Jaiswal Resume"
          />
        </motion.div>
      </motion.div>
    </main>
  );
}
