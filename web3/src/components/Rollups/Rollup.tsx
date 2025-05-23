import { Canvas } from "@react-three/fiber";
import React from "react";
import MagnifyingGlass from "./MagnifiingGlass";

export const Rollup = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll text-white">
      <div className="flex h-screen relative">
        {/* 3D Side - Parallax Layer */}
        <div className="w-1/2 h-screen">
          <Canvas camera={{ position: [0, 0, 20], fov: 45 }} style={{ background: "#1e2432" }}>
            <MagnifyingGlass />
          </Canvas>
        </div>

        {/* Text Side */}
        <div className="w-1/2 flex flex-col justify-center p-8 space-y-10" style={{ backgroundColor: "#1e2432" }}>
          <h1 className="text-4xl font-bold">🔍 Rollups Explained</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar, elit quis luctus volutpat, felis enim
            laoreet tortor, vitae convallis magna libero ac nisi...
          </p>
          <p>
            Curabitur auctor, turpis a fringilla luctus, justo sapien vestibulum orci, vel pharetra sapien libero id mi.
          </p>
        </div>
      </div>
    </div>
  );
};
