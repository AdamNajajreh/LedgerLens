"use client";

import React from "react";
import Image from "next/image";
import { Footer } from "../Footer/Footer";

export const Layers_content = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll text-white snap-y snap-mandatory relative">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
          <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            Ethereum's Layer Architecture
          </h2>
          <p className="text-2xl text-gray-700">
            Discover how Ethereum's multi-layer architecture enables scalability, security, and innovation
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
          </div>
        </div>
      </section>

      {/* Layer 2 Section */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-6xl mx-auto space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
          <h3 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            Layer 2: Scaling Solutions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rollup-based Solutions */}
            <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-2xl font-semibold mb-4 text-rose-500">Rollups</h4>
              <p className="text-gray-700 mb-4">
                Execute transactions off-chain and submit compressed data to Ethereum:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Optimistic Rollups</strong> – Assume validity, rely on fraud proofs if challenged.
                </li>
                <li>
                  <strong>ZK Rollups</strong> – Use cryptographic proofs for fast, secure verification.
                </li>
                <li>
                  <strong>Validium</strong> – Off-chain data storage for even greater scalability.
                </li>
              </ul>
            </div>

            {/* Other Layer 2s */}
            <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-2xl font-semibold mb-4 text-orange-400">Alternative Layer 2s</h4>
              <p className="text-gray-700 mb-4">Other approaches to scaling with varying trust and data models:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>State Channels</strong> – Fast, off-chain interactions with eventual settlement on Ethereum.
                </li>
                <li>
                  <strong>Plasma</strong> – Child chains that submit periodic proofs to Ethereum.
                </li>
                <li>
                  <strong>Sidechains</strong> – Independent chains with bridges to Ethereum; less secure but flexible.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 3 Section */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-6xl mx-auto space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
          <h3 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            Layer 3: Application Layer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* DeFi Protocols */}
            <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-2xl font-semibold mb-4 text-rose-500">DeFi Protocols</h4>
              <p className="text-gray-700">
                Decentralized financial applications for lending, trading, derivatives, and yield generation.
              </p>
            </div>

            {/* NFT Marketplaces */}
            <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-2xl font-semibold mb-4 text-orange-400">NFT Marketplaces</h4>
              <p className="text-gray-700">
                Platforms for creating, trading, showcasing, and managing non-fungible tokens and digital collectibles.
              </p>
            </div>

            {/* Gaming & Metaverse */}
            <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-2xl font-semibold mb-4 text-rose-500">Gaming & Metaverse</h4>
              <p className="text-gray-700">
                Interactive experiences that use blockchain for digital ownership, in-game assets, and immersive
                economies.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};
