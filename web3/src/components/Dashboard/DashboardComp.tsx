"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function DashboardComp() {
  const router = useRouter();
  const [totalTVL, setTotalTVL] = useState(0);
  const [chainCount, setChainCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.llama.fi/v2/chains");
        const data = await response.json();
        
        // Calculate total TVL
        const total = data.reduce((sum: number, chain: any) => {
          return sum + (chain.tvl || 0);
        }, 0);
        
        // Get number of chains
        const chains = data.length;
        
        setTotalTVL(total);
        setChainCount(chains);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Format TVL to billions
  const formatTVL = (value: number) => {
    const billions = value / 1e9;
    return billions.toFixed(1) + 'B';
  };

  return (
    <div className="min-h-screen pt-12 text-black flex flex-col items-center space-y-12">
      {/* Hero section */}
      <section className="w-full max-w-5xl backdrop-blur-md bg-white/80 rounded-2xl p-8 shadow-lg ring-1 ring-white/10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            Decentralized Data Explorer
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Visualize, analyze, and understand blockchain networks through interactive graph exploration
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/dashboard/app")}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-400 text-white rounded-lg hover:opacity-90 transition-all"
            >
              Start Exploring
            </button>
            <button
              onClick={() => router.push("/dashboard/about")}
              className="px-6 py-3 border from-rose-500 text-black rounded-lg hover:bg-orange-400 hover:text-white transition-all"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-lg ring-1 ring-white/10">
          <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
          <p className="text-gray-600">
            Track transactions, smart contracts, and wallet interactions in real-time across multiple networks
          </p>
        </div>
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-lg ring-1 ring-white/10">
          <h3 className="text-xl font-semibold mb-2">Multi-chain Support</h3>
          <p className="text-gray-600">
            Explore data across Ethereum, Layer 2s, and other EVM-compatible networks seamlessly
          </p>
        </div>
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-lg ring-1 ring-white/10">
          <h3 className="text-xl font-semibold mb-2">Advanced Visualization</h3>
          <p className="text-gray-600">Interactive graphs and charts to understand complex blockchain relationships</p>
        </div>
      </section>

      {/* Network Stats */}
      <section className="w-full max-w-5xl backdrop-blur-md bg-white/80 rounded-2xl p-8 shadow-lg ring-1 ring-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center">Network Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-700">1.2M+</div>
            <div className="text-gray-600">Daily Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-600">
              ${formatTVL(totalTVL)}
            </div>
            <div className="text-gray-600">TVL</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-500">
              {chainCount}+
            </div>
            <div className="text-gray-600">Networks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-400">50K+</div>
            <div className="text-gray-600">Active Wallets</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-5xl backdrop-blur-md bg-gradient-to-r from-rose-500 to-orange-400 rounded-2xl p-8 shadow-lg text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore the Blockchain?</h2>
        <p className="text-lg mb-6 opacity-90">
          Join thousands of developers and analysts using LedgerLens to understand blockchain data
        </p>
        <button className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-opacity-90 transition-all">
          Get Started Now
        </button>
      </section>
      <Footer></Footer>
    </div>
  );
}
