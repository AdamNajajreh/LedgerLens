import { Canvas } from "@react-three/fiber";
import React from "react";
import MagnifyingGlass from "./MagnifiingGlass";

export const Rollup = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll text-white snap-y snap-mandatory relative">
      {/* Fixed Background Lens */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }} style={{ background: "#FAFAFA" }}>
          <MagnifyingGlass />
        </Canvas>
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center snap-start">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
              🔍 Rollups Explained
            </h1>
            <p className="text-2xl text-gray-700">
              Discover how Layer 2 scaling solutions are revolutionizing blockchain technology
            </p>
            <div className="flex justify-center w-full">
              <div className="animate-bounce mt-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* What are Rollups Section */}
        <section className="min-h-screen flex items-center justify-center snap-start">
          <div className="max-w-4xl mx-auto space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
              What are Rollups?
            </h2>
            <p className="text-xl leading-relaxed text-gray-700">
              Rollups are Layer 2 scaling solutions that execute transactions outside the main Ethereum chain (Layer 1)
              but post transaction data on Layer 1. This approach significantly reduces gas fees and increases
              transaction throughput while maintaining the security guarantees of the main chain.
            </p>
          </div>
        </section>

        {/* Types of Rollups Section */}
        <section className="min-h-screen flex items-center justify-center snap-start">
          <div className="max-w-6xl mx-auto space-y-8 p-8">
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
              Types of Rollups
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-rose-500">Optimistic Rollups</h3>
                <p className="text-gray-700">
                  Assume transactions are valid by default and use fraud proofs to challenge invalid transactions. They
                  provide immediate transaction confirmation with a challenge period.
                </p>
              </div>
              <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-orange-400">ZK Rollups</h3>
                <p className="text-gray-700">
                  Use zero-knowledge proofs to validate transactions. They provide immediate finality and enhanced
                  privacy through cryptographic proofs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="min-h-screen flex items-center justify-center snap-start">
          <div className="max-w-6xl mx-auto space-y-8 p-8">
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
              Benefits of Rollups
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-rose-500">Lower Fees</h3>
                <p className="text-gray-700">Significantly reduced transaction costs compared to Layer 1</p>
              </div>
              <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-orange-400">Higher Throughput</h3>
                <p className="text-gray-700">Increased transaction processing capacity</p>
              </div>
              <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-rose-500">Security</h3>
                <p className="text-gray-700">Maintains the security guarantees of the main chain</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
