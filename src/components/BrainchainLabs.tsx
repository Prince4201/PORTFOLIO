"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BrainchainLabs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // Moved slightly above
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section id="brainchain" ref={ref} className="relative z-20 bg-black pt-32 pb-16 px-8 overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] opacity-50 animate-pulse" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: yContent }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "circOut" }}
          className="border border-white/10 bg-white/5 rounded-[3rem] p-12 md:p-24 backdrop-blur-2xl text-center shadow-[0_0_100px_rgba(225,29,72,0.1)] hover:shadow-[0_0_150px_rgba(225,29,72,0.15)] transition-shadow duration-700"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-400 mb-6 block"
          >
            Innovation Hub
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-rose-400 to-purple-500 bg-[length:200%_auto] animate-gradient"
          >
            Brainchain Labs
          </motion.h2>
          <p className="text-2xl md:text-3xl text-zinc-300 font-light mb-16 max-w-3xl mx-auto leading-relaxed">
            Building AI-Powered Digital Products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-medium text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </span>
                Mission
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Brainchain Labs is my innovation space where I design, develop, and experiment with AI-powered software products focused on education, automation, creators, and productivity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-medium text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
                </span>
                Vision
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                To create intelligent digital products that make learning more engaging, workflows more efficient, and technology more accessible.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
