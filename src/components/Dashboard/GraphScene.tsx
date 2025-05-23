'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Group } from 'three'

function GraphModel() {
  const ref = useRef<Group>(null)
  const [velocity, setVelocity] = useState(0)

  const { scene } = useGLTF('/graph.glb')

  // Apply scroll-induced rotation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += velocity
    }
    // Apply damping
    if (velocity !== 0) {
      setVelocity((v) => Math.abs(v) < 0.0001 ? 0 : v * 0.95)
    }
  })

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const direction = e.deltaY > 0 ? 1 : -1
      setVelocity((v) => v + direction * 0.01)
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return <primitive object={scene} ref={ref} />
}

useGLTF.preload('/graph.glb')

export default function GraphScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <GraphModel />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
