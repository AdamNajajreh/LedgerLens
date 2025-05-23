"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group, Euler, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

interface MagnifyingGlassProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  bobSpeed?: number;
}

export default function MagnifyingGlass({ 
  position = [0, 0, -10],
  scale = 0.04,
  rotationSpeed = 0.6,
  bobSpeed = 2
}: MagnifyingGlassProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/glass.glb");
  const currentPosition = useRef(new Vector3(...position));
  const currentScale = useRef(scale);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      
      // Smooth position transition
      currentPosition.current.lerp(new Vector3(...position), 0.05);
      groupRef.current.position.copy(currentPosition.current);
      
      // Smooth scale transition
      currentScale.current += (scale - currentScale.current) * 0.05;
      groupRef.current.scale.setScalar(currentScale.current);
      
      // Animation
      groupRef.current.rotation.y = t * rotationSpeed; // spin
      groupRef.current.position.y += Math.sin(t * bobSpeed) * 0.01; // bob
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 10]} intensity={2} />

      <group ref={groupRef}>
        <primitive
          object={scene}
          rotation={new Euler(1.5, 0.3, -0.2)} // Tilted to look cool
        />
      </group>
    </>
  );
}
