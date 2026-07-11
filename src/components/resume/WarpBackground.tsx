"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Starfield() {
  const count = 1500;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Setup particle positions and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 60 + 2; // Start slightly away from absolute center
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const z = Math.random() * 200 - 150; // Deep z-axis
      
      const speed = Math.random() * 3 + 1; // High speed
      
      temp.push({ x, y, z, speed, theta, radius });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Mouse interaction state
  const mouse = useRef({ x: 0, y: 0 });
  
  useFrame((state, delta) => {
    // Smoothly track mouse
    mouse.current.x += (state.pointer.x * 10 - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y * 10 - mouse.current.y) * 0.05;

    // Shift camera slightly based on mouse
    state.camera.position.x = mouse.current.x;
    state.camera.position.y = mouse.current.y;
    state.camera.lookAt(0, 0, -100);

    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Move particle towards camera
      particle.z += particle.speed * 120 * delta;
      
      // If particle passes camera, reset far back
      if (particle.z > 50) {
        particle.z = -200;
        particle.x = Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 60 + 2);
        particle.y = Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 60 + 2);
      }

      dummy.position.set(particle.x, particle.y, particle.z);
      // Stretch along Z axis to create motion blur / warp lines
      dummy.scale.set(0.1, 0.1, particle.speed * 10);
      dummy.updateMatrix();
      
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Cool glowing colors for the warp streaks (red and blue theme)
  const colors = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const color = new THREE.Color();
    const palette = ["#ef4444", "#3b82f6", "#f87171", "#60a5fa", "#b91c1c", "#1d4ed8", "#ffffff"];
    for (let i = 0; i < count; i++) {
      color.set(palette[Math.floor(Math.random() * palette.length)]);
      temp[i * 3] = color.r;
      temp[i * 3 + 1] = color.g;
      temp[i * 3 + 2] = color.b;
    }
    return temp;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.5, 0.5, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={0.7} />
    </instancedMesh>
  );
}

export default function WarpBackground() {
  return (
    <div className="absolute inset-0 bg-black z-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <color attach="background" args={["#000000"]} />
        <Starfield />
      </Canvas>
      {/* Central vignette/darkness hole to emphasize speed and frame the resume */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.8) 100%)'
      }}></div>
    </div>
  );
}
