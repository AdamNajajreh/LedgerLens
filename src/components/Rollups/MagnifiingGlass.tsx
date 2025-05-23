"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group, Euler } from "three";
import { useFrame } from "@react-three/fiber";

export default function MagnifyingGlass() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/glass.glb");

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.6; // spin
      groupRef.current.position.y = Math.sin(t * 2) * 0.2; // bob
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 10]} intensity={2} />

      <group ref={groupRef} position={[0, 0, -10]}>
        <primitive
          object={scene}
          rotation={new Euler(1.5, 0.3, -0.2)} // Tilted to look cool
          scale={0.04}
        />
      </group>
    </>
  );
}
