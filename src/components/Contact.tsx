"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function MoonSphere() {
  const moonRef = useRef<THREE.Group>(null);

  // High quality equirectangular moon map
  const texture = useTexture("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg");

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (moonRef.current) {
      // Rotate the moon towards the mouse position ultra-smoothly
      const targetRotationY = mouse.x * (Math.PI / 4);
      const targetRotationX = -mouse.y * (Math.PI / 8);

      // Slower lerp for a premium, heavy, smooth feel
      moonRef.current.rotation.y += (targetRotationY - moonRef.current.rotation.y) * 0.02;
      moonRef.current.rotation.x += (targetRotationX - moonRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={moonRef} position={[0, -6.5, 0]}>
      {/* Gentle floating animation for a magical, anti-gravity feel */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>

        {/* Core Moon Mesh */}
        <mesh>
          <sphereGeometry args={[5, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            bumpMap={texture}
            bumpScale={0.03}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c5c86a2e-a600-4a86-91b3-443ad0b1c10f", 
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        console.error("Form submission error", result);
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 peer";
  const labelClasses = "absolute left-4 top-4 text-zinc-500 text-sm transition-all duration-300 peer-focus:text-xs peer-focus:top-2 peer-focus:text-blue-400 pointer-events-none";

  return (
    <section id="contact" className="relative z-20 bg-transparent py-40 px-8 border-t border-white/10 overflow-hidden min-h-[100vh] flex flex-col justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* True WebGL 3D Moon Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }}>
          {/* Beautiful 3D Starfield Background */}
          <Stars radius={10} depth={50} count={3000} factor={4} saturation={1} fade speed={1.5} />

          {/* Ambient lighting */}
          <ambientLight intensity={0.2} />

          {/* Main Key Light */}
          <directionalLight position={[-5, 5, 5]} intensity={2.5} color="#ffffff" />

          {/* Purple Fill Light */}
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#8b5cf6" />

          {/* Deep Blue Rim Light */}
          <directionalLight position={[5, -5, -5]} intensity={4} color="#3b82f6" />

          {/* Deep Purple Rim Light */}
          <directionalLight position={[-5, -5, -5]} intensity={4} color="#a855f7" />

          <MoonSphere />
        </Canvas>

        {/* Subtle CSS glowing rim over the canvas for extra integration */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6 block"
          >
            Get in touch
          </motion.span>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "circOut" } }
            }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-tight text-glow"
          >
            Let&apos;s Build <br /> Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-rose-400 to-purple-500 bg-[length:200%_auto] animate-gradient text-glow-blue">
              Amazing.
            </span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="text-xl text-zinc-300 font-light mb-12 leading-relaxed"
          >
            Whether you&apos;re looking for a developer, collaborator, or startup partner, I&apos;m always open to discussing new opportunities.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "circOut", delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="bg-[#0a0a0a]/80 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.1)] relative overflow-hidden group hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.2)]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl pointer-events-none group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="relative group/input">
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={`${inputClasses} ${formState.name ? "pt-6 pb-2" : ""}`}
                />
                <label htmlFor="name" className={`${labelClasses} ${formState.name ? "text-xs top-2 text-zinc-300" : ""}`}>
                  Your Name
                </label>
              </div>

              <div className="relative group/input">
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={`${inputClasses} ${formState.email ? "pt-6 pb-2" : ""}`}
                />
                <label htmlFor="email" className={`${labelClasses} ${formState.email ? "text-xs top-2 text-zinc-300" : ""}`}>
                  Your Email
                </label>
              </div>

              <div className="relative group/input">
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`${inputClasses} resize-none ${formState.message ? "pt-6 pb-2" : ""}`}
                />
                <label htmlFor="message" className={`${labelClasses} ${formState.message ? "text-xs top-2 text-zinc-300" : ""}`}>
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn hover:scale-[1.02] active:scale-95"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Sending...
                    </motion.div>
                  ) : isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-600 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Message Sent!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform duration-300"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Glassmorphism Floating Footer Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-3 text-xs text-zinc-400 font-light shadow-2xl hover:bg-white/10 transition-colors duration-300 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          <span>© 2026 Prince Jaiswal</span>
          <span className="w-[1px] h-3 bg-white/20 mx-1"></span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">Crafted with passion</span>
        </div>
      </motion.div>
    </section>
  );
}
