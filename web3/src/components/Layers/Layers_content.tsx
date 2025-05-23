"use client";

import React from "react";
import Image from "next/image";

export const Layers_content = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll text-white snap-y snap-mandatory relative">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
          <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            🌐 Ethereum's Layer Architecture
          </h2>
          <p className="text-2xl text-gray-700">
            Discover how Ethereum's multi-layer architecture enables scalability, security, and innovation
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

      {/* Layer 1 Section */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-4xl mx-auto space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
          <h3 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            Layer 1: The Foundation
          </h3>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <p className="text-xl leading-relaxed text-gray-700 mb-4">
                Ethereum's base layer, where all transactions are ultimately settled. This layer provides:
              </p>
              <ul className="list-disc list-inside text-lg space-y-2 text-gray-700">
                <li>Decentralized consensus and security</li>
                <li>Smart contract execution</li>
                <li>Global state management</li>
                <li>Network-wide data availability</li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <div className="p-4 bg-white/10 rounded-lg">
                <div className="aspect-square relative">
                  <Image
                    src="/layer1.png"
                    alt="Layer 1 Illustration"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 2 Section */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-6xl mx-auto p-6 backdrop-blur-md bg-white/80 rounded-2xl m-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
          <h3 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400 mb-4">
            Layer 2: Scaling Solutions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Rollups Box */}
            <div className="p-4 rounded-xl bg-white/10 border border-gray-200 hover:border-gray-300 transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2 text-rose-500">Rollups</h4>
              <p className="text-gray-700 mb-2 text-sm">
                Execute transactions off-chain and post data to Layer 1:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Optimistic Rollups - Assume valid, use fraud proofs</li>
                <li>ZK Rollups - Use zero-knowledge proofs</li>
                <li>Validium - Off-chain data availability</li>
              </ul>
            </div>

            {/* Commit Chains Box */}
            <div className="p-4 rounded-xl bg-white/10 border border-gray-200 hover:border-gray-300 transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2 text-orange-400">Commit Chains</h4>
              <p className="text-gray-700 mb-2 text-sm">
                Independent chains that periodically commit to Layer 1:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Plasma - Child chains with fraud proofs</li>
                <li>State Channels - Off-chain state updates</li>
                <li>Sidechains - Independent chains with bridges</li>
              </ul>
            </div>

            {/* Data Availability Box */}
            <div className="p-4 rounded-xl bg-white/10 border border-gray-200 hover:border-gray-300 transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2 text-rose-500">Data Availability</h4>
              <p className="text-gray-700 mb-2 text-sm">
                Solutions for efficient data storage and verification:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Danksharding - Proto-danksharding implementation</li>
                <li>Data Availability Committees</li>
                <li>EIP-4844 (Blobs)</li>
              </ul>
            </div>

            {/* Other Solutions Box */}
            <div className="p-4 rounded-xl bg-white/10 border border-gray-200 hover:border-gray-300 transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2 text-orange-400">Other Solutions</h4>
              <p className="text-gray-700 mb-2 text-sm">
                Additional scaling approaches:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Optimistic Bridges - Cross-chain communication</li>
                <li>ZK Bridges - Trustless cross-chain transfers</li>
                <li>Hybrid Solutions - Combining multiple approaches</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 3 Section */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-6xl mx-auto space-y-8 p-8">
          <h3 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            Layer 3: Application Layer
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
              <h4 className="text-2xl font-semibold mb-4 text-rose-500">DeFi Protocols</h4>
              <p className="text-gray-700">
                Decentralized financial applications for lending, trading, and yield generation
              </p>
            </div>
            <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
              <h4 className="text-2xl font-semibold mb-4 text-orange-400">NFT Marketplaces</h4>
              <p className="text-gray-700">
                Platforms for creating, trading, and managing non-fungible tokens
              </p>
            </div>
            <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
              <h4 className="text-2xl font-semibold mb-4 text-rose-500">Gaming & Metaverse</h4>
              <p className="text-gray-700">
                Interactive applications leveraging blockchain for digital ownership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-6xl mx-auto space-y-8 p-8">
          <h3 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            Key Benefits
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
              <h4 className="text-2xl font-semibold mb-4 text-rose-500">Scalability</h4>
              <p className="text-gray-700">
                Process thousands of transactions per second while maintaining security
              </p>
            </div>
            <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
              <h4 className="text-2xl font-semibold mb-4 text-orange-400">Security</h4>
              <p className="text-gray-700">
                Maintain robust security guarantees through Layer 1 settlement
              </p>
            </div>
            <div className="p-8 rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
              <h4 className="text-2xl font-semibold mb-4 text-rose-500">Innovation</h4>
              <p className="text-gray-700">
                Enable new use cases and applications through specialized layers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
