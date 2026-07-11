"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useScroll, useTransform, useMotionValueEvent, MotionValue, motion } from "framer-motion";

const FRAME_COUNT = 126;

function getFrameUrl(index: number) {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
}

import Overlay from "./Overlay";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Object-fit: cover logic for canvas
      // We apply a slight zoom (10%) to crop out corner watermarks from AI generators
      const zoomFactor = 1.1; 
      const hRatio = (canvas.width * zoomFactor) / img.width;
      const vRatio = (canvas.height * zoomFactor) / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    if (img.complete) {
      render();
    } else {
      img.onload = render;
    }
  };

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  
  // Fade out the canvas and slightly zoom it into the darkness right before the section ends
  const canvasOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0.85, 1], [1, 1.15]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    drawImage(Math.round(latest));
  });

  useEffect(() => {
    if (images.length > 0) {
      drawImage(0);
      const handleResize = () => drawImage(Math.round(currentIndex.get()));
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [images]);

  return (
    <div id="home" ref={containerRef} className="relative h-[500vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.canvas 
          ref={canvasRef} 
          style={{ opacity: canvasOpacity, scale: canvasScale }}
          className="block h-full w-full object-cover z-0 origin-center" 
        />
        
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}
