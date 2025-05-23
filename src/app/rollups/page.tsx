"use client";

import MagnifyingGlass from "@/components/Rollups/MagnifiingGlass";
import { Canvas } from "@react-three/fiber";

export default function Rollups() {
  return (
    <div className="h-screen w-full overflow-y-scroll text-white">
      <div className="flex h-[200vh] relative">
        {/* 3D Side - Parallax Layer */}
        <div className="sticky top-0 w-1/3 h-screen">
          <Canvas
            camera={{ position: [0, 0, 20], fov: 45 }}
            style={{ background: "#1e2432" }}
          >
            <MagnifyingGlass />
          </Canvas>
        </div>

        {/* Text Side */}
        <div
          className=" p-12 flex flex-col justify-center space-y-10"
          style={{ backgroundColor: "#1e2432" }}
        >
          <h1 className="text-4xl font-bold">🔍 Rollups Explained</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            pulvinar, elit quis luctus volutpat, felis enim laoreet tortor,
            vitae convallis magna libero ac nisi...
          </p>
          <p>
            Curabitur auctor, turpis a fringilla luctus, justo sapien vestibulum
            orci, vel pharetra sapien libero id mi.
          </p>
        </div>
      </div>
    </div>
  );
}
