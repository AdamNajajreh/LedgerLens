"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Group, Euler, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

interface MagnifyingGlassProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  rotationSpeed?: number; // applies spinning on top of the rotation
  bobSpeed?: number;
}

export default function MagnifyingGlass({
  position = [0, 0, -10],
  rotation = [1.5, 0.3, -0.2],
  scale = 1,
  rotationSpeed = 0.6,
  bobSpeed = 2,
}: MagnifyingGlassProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/glass.glb");

  const currentPosition = useRef(new Vector3(...position));
  const targetPosition = useRef(new Vector3(...position));

  const currentScale = useRef(scale);
  const targetScale = useRef(scale);

  const currentRotation = useRef(new Euler(...rotation));
  const targetRotation = useRef(new Euler(...rotation));

  // React to props
  useEffect(() => {
    targetPosition.current.set(...position);
    targetRotation.current.set(...rotation);
    targetScale.current = scale;
  }, [position, rotation, scale]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!groupRef.current) return;

    // Smoothly interpolate position
    currentPosition.current.lerp(targetPosition.current, 0.05);
    groupRef.current.position.copy(currentPosition.current);

    // Smoothly interpolate scale
    currentScale.current += (targetScale.current - currentScale.current) * 0.05;
    groupRef.current.scale.setScalar(currentScale.current);

    // Smoothly interpolate rotation
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;
    currentRotation.current.z += (targetRotation.current.z - currentRotation.current.z) * 0.05;

    // Apply rotation + spinning
    groupRef.current.rotation.set(
      currentRotation.current.x,
      currentRotation.current.y + t * rotationSpeed,
      currentRotation.current.z
    );

    // Bobbing effect (subtle float up/down)
    groupRef.current.position.y += Math.sin(t * bobSpeed) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 20]} intensity={10} />
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </>
  );
}
