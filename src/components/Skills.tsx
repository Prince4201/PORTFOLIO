"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

const skillGroups = [
  {
    title: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    description: "Crafting beautiful, responsive, and highly interactive user interfaces."
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "REST APIs"],
    description: "Building robust, scalable server-side architecture and seamless API integrations."
  },
  {
    title: "Databases",
    skills: ["MongoDB", "Firebase", "Supabase"],
    description: "Designing efficient data models and managing scalable cloud databases."
  },
  {
    title: "Artificial Intelligence",
    skills: ["Python", "Machine Learning", "Gemini API", "OpenAI API"],
    description: "Integrating intelligent features and automated capabilities into digital products."
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "Vercel", "Render", "Postman", "VS Code"],
    description: "Streamlining development workflows and orchestrating smooth deployments."
  }
];

function SkillCard({ group, idx }: { group: any; idx: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, zIndex: 10 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10 cursor-pointer overflow-hidden"
      style={{ transformPerspective: 1000 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold text-white tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-rose-400 transition-all duration-300">
          {group.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-6 h-10 group-hover:text-zinc-300 transition-colors duration-300">
          {group.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill: string, sIdx: number) => (
            <motion.span
              key={sIdx}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              className="px-3 py-1.5 rounded-full bg-white/10 text-zinc-300 text-xs font-medium border border-white/5 transition-colors shadow-inner"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 bg-transparent py-20 md:py-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 text-glow">
            Technical Arsenal
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => (
            <SkillCard key={idx} group={group} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
