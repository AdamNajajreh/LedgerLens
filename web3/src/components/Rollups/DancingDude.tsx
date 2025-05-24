"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function DancingDude() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/dancing/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const defaultClip = animations[0];
    if (defaultClip && actions[defaultClip.name]) {
      actions[defaultClip.name].reset().play().setLoop(THREE.LoopRepeat, Infinity);
    }
  }, [actions, animations]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} scale={0.2} position={[20, -10, -5]}>
      <primitive object={scene} />
    </group>
  );
}
