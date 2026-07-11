"use client";

import { motion, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";

const projects = [
  {
    id: 1,
    title: "TOONVERSE-AI",
    category: "AI Animated Learning Platform",
    description: "Transforms educational content into visual storytelling experiences using AI-generated comic scenes, narration, and quizzes.",
    image: "https://substackcdn.com/image/fetch/$s_!RhRh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1cbae3f2-2741-4dd0-9b4f-ce4b95219ef8_1024x1024.png",
  },
  {
    id: 2,
    title: "CreatorFind AI",
    category: "Creator Outreach SaaS",
    description: "Automates creator discovery, outreach, and campaign management for agencies and businesses.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzXo8dbdac1ebZPwQEfJhWyh_t3hc5vwUgX42_QYvQzQ&s=10",
  }
];

function ProjectCard({ project, idx }: { project: any; idx: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX = useMotionValue(0.5);
  const cardY = useMotionValue(0.5);

  const rotateX = useTransform(cardY, [0, 1], [10, -10]);
  const rotateY = useTransform(cardX, [0, 1], [-10, 10]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);
    cardX.set(x / width);
    cardY.set(y / height);
  }

  function handleMouseLeave() {
    cardX.set(0.5);
    cardY.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl p-3 transition-all duration-300 hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-6">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
      </div>

      <div className="px-4 pb-6 relative z-20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-semibold text-zinc-400 tracking-[0.2em] uppercase mb-3 block group-hover:text-blue-400 transition-colors duration-300">
              {project.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:rotate-45 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-md group-hover:text-zinc-300 transition-colors duration-300">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 bg-black py-20 md:py-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            Selected Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
