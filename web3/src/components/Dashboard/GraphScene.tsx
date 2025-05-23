"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Group } from "three";

function GraphModel() {
  const ref = useRef<Group>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0);

  const { scene } = useGLTF("/graph.glb");

  // Apply rotation with gradual slowdown
  useFrame(() => {
    if (ref.current) {
      if (isScrolling) {
        // Set full speed while scrolling
        setRotationSpeed(0.01);
      } else if (rotationSpeed > 0) {
        // Gradually decrease speed when not scrolling
        setRotationSpeed(prev => Math.max(0, prev - 0.0005));
      }
      ref.current.rotation.y += scrollDirection * rotationSpeed;
    }
  });

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      const direction = e.deltaY > 0 ? 1 : -1;
      setIsScrolling(true);
      setScrollDirection(direction);

      // Clear any existing timeout
      clearTimeout(scrollTimeout);

      // Set a timeout to stop rotation shortly after scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 50);
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return <primitive object={scene} ref={ref} />;
}

useGLTF.preload("/graph.glb");

export default function GraphScene() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <GraphModel />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
