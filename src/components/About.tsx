"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const details = [
    { label: "Degree", value: "B.Tech Computer Science Engineering" },
    { label: "Current Year", value: "3rd Year" },
    { label: "Specialization", value: "Full Stack Development & Artificial Intelligence" },
    { label: "Location", value: "India" },
  ];

  const stats = [
    { number: 100, suffix: "+", label: "DSA Problems Solved" },
    { number: 5, suffix: "+", label: "Projects Built" },
    { number: 2, suffix: "", label: "AI Products" },
    { number: 1, suffix: "", label: "Startup Founded" },
  ];

  return (
    <section id="about" className="relative z-20 bg-black py-20 md:py-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="mb-12 md:mb-16"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "circOut" } }
            }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 md:mb-6"
          >
            My Story
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed"
          >
            I am a <span className="text-white font-medium">Computer Science student</span> focused on creating AI-powered products and scalable web applications. Through <span className="text-white font-medium">Brainchain Labs</span>, I explore innovative solutions in education, automation, creator tools, and intelligent software systems.
          </motion.p>
        </motion.div>

        {/* Animated stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-zinc-500 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 space-y-12 text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
            {[
              { title: "Who I Am", text: "I am a B.Tech Computer Science Engineering student passionate about technology, innovation, and entrepreneurship." },
              { title: "What I Do", text: "I build full-stack applications, AI-powered platforms, automation tools, and startup-oriented products." },
              { title: "What Drives Me", text: "I enjoy turning ideas into real products that people can use. My goal is to create meaningful technology that improves learning, productivity, and digital experiences." },
              { title: "Career Vision", text: "To become a technology entrepreneur building globally impactful AI products and software companies." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.1 }}
                className="group"
              >
                <h3 className="text-white text-2xl font-medium tracking-tight mb-4 flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${idx % 2 === 0 ? 'bg-blue-500' : 'bg-rose-500'} group-hover:w-4 transition-all duration-300`} />
                  {item.title}
                </h3>
                <p className="group-hover:text-zinc-300 transition-colors duration-300 pl-5">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 transform-gpu sticky top-32"
              style={{ transformPerspective: 1000 }}
            >
              <h3 className="text-sm tracking-widest text-zinc-500 uppercase font-medium mb-6">Personal Info</h3>
              <ul className="space-y-6">
                {details.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="border-b border-white/10 pb-4 last:border-0 last:pb-0 hover:bg-white/5 p-2 rounded-lg transition-colors duration-300"
                  >
                    <span className="block text-zinc-500 text-sm mb-1">{item.label}</span>
                    <span className="block text-white font-medium">{item.value}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
