"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import MagnifyingGlass from "./MagnifiingGlass";
import { number } from "framer-motion";
import { Euler } from "three";
import ImageStepper from "./ImageStepper";
import { Footer } from "../Footer/Footer";

export const Rollup = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      setSectionIndex((prev) => {
        if (prev !== index) {
          console.log("🟢 Scrolled to section:", index);
        }
        return index;
      });
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const positions: [number, number, number][] = [
    [21, 0, -10],
    [-21.5, 0, -10],
    [21, -1, -10],
    [-21.5, 3, -10],
  ];
  const rotations: [number, number, number][] = [
    [1.5, 0, 0],
    [1.5, 3, 0],
    [1.5, 0, 0],
    [1.5, 3, 0.2],
  ];

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-scroll text-white snap-y snap-mandatory relative"
    >
      {/* 3D Canvas fixed behind */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }} style={{ background: "#e4e6ea" }}>
          <MagnifyingGlass
            position={positions[sectionIndex] ?? [0, 0, -10]}
            rotation={rotations[sectionIndex] ?? [0, 0, 0]}
            rotationSpeed={0}
            bobSpeed={5}
            scale={0.035}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section className="h-screen flex items-center justify-center snap-start">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 shadow-lg">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
              Rollups Explained
            </h1>
            <p className="text-2xl text-gray-700">
              Discover how Layer 2 scaling solutions are revolutionizing blockchain technology
            </p>
            <div className="flex justify-center w-full">
              <div className="animate-bounce mt-8">
                <svg className="w-8 h-8" fill="none" stroke="black" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center snap-start">
          <div className="max-w-4xl mx-auto space-y-10 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 shadow-lg">
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
              What are Rollups?
            </h2>
            <p className="text-xl leading-relaxed text-gray-700 text-center">
              Rollups are Layer 2 scaling solutions that execute transactions outside the main Ethereum chain (Layer 1),
              but post transaction data on Layer 1. This significantly reduces gas fees and increases throughput while
              maintaining Ethereum's security.
            </p>

            {/* Smaller Illustrative Images */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-44">
              <div className="text-center">
                <img
                  src="/images/1.png"
                  alt="Congested Ethereum highway"
                  className="rounded-lg shadow-md mx-auto max-w-[200px]"
                />
                <p className="mt-2 text-gray-600 text-sm">Without Rollups</p>
              </div>

              <div className="text-center">
                <img
                  src="/images/rollup.png"
                  alt="Smooth Rollup highway"
                  className="rounded-lg shadow-md mx-auto max-w-[200px]"
                />
                <p className="mt-2 text-gray-600 text-sm">With Rollups</p>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center snap-start">
          <div className="max-w-6xl mx-auto space-y-8 p-8">
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
              Types of Rollups
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-rose-500">Optimistic Rollups</h3>
                <p className="text-gray-700">
                  Assume validity by default; fraud proofs can challenge incorrect transactions.
                </p>
                {/* <ImageStepper
                  images={["/images/1.png", "/images/1.png", "/images/1.png", "/images/kotleba.jpg"]}
                  title="Cigos"
                ></ImageStepper> */}
              </div>
              <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-orange-400">ZK Rollups</h3>
                <p className="text-gray-700">
                  Use cryptographic zero-knowledge proofs to validate transactions instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div>
          <section className="min-h-screen flex items-center justify-center snap-start">
            <div className="max-w-6xl mx-auto space-y-8 p-8">
              <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
                Benefits of Rollups
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-rose-500">Lower Fees</h3>
                  <p className="text-gray-700">Reduce transaction costs by executing off-chain.</p>
                </div>
                <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-orange-400">Higher Throughput</h3>
                  <p className="text-gray-700">Enable more transactions per second.</p>
                </div>
                <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-rose-500">Security</h3>
                  <p className="text-gray-700">Maintain Ethereum’s security guarantees via data availability.</p>
                </div>
              </div>
            </div>
          </section>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};
