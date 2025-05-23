"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { div } from "three/tsl";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const AboutContent = () => {
  const bridgeVolumeData = {
    labels: ["Arbitrum", "Optimism", "zkSync", "Base", "Starknet"],
    datasets: [
      {
        label: "ETH Bridged (in thousands)",
        data: [150, 120, 90, 75, 60],
        backgroundColor: "#38bdf8",
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  return (
    <div>asdasdasdasd</div>
    // <main className="min-h-screen px-6 py-12 text-white flex flex-col items-center space-y-16 bg-[#1e2432]">
    //   {/* Intro Section */}
    //   <section className="w-full max-w-4xl backdrop-blur-2xl bg-white/5 rounded-xl p-8 shadow-md ring-1 ring-white/10 text-center space-y-4">
    //     <h1 className="text-4xl font-bold">🔍 About This Project</h1>
    //     <p className="text-base leading-relaxed text-gray-200">
    //       This application provides a detailed exploration of asset flows
    //       between Ethereum's Layer 1 (L1) mainnet and its Layer 2 (L2) scaling
    //       solutions. By indexing transaction data and categorizing inbound and
    //       outbound transfers, it reveals how tokens move across layers and which
    //       bridges facilitate the most activity.
    //     </p>
    //     <p className="text-base leading-relaxed text-gray-200">
    //       The goal is to offer developers, researchers, and analysts clear
    //       insights into inter-layer connectivity, supporting decisions in
    //       infrastructure development, cross-chain interoperability, and protocol
    //       usage patterns.
    //     </p>
    //     <p className="text-base leading-relaxed text-gray-200">
    //       All data is indexed directly from the Ethereum blockchain and
    //       categorized by bridge type, token flow direction, and transaction
    //       volume.
    //     </p>
    //   </section>

    //   {/* Stats + Chart Section */}
    //   <section className="w-full max-w-6xl backdrop-blur-2xl bg-white/5 rounded-xl p-8 shadow-md ring-1 ring-white/10 flex flex-col lg:flex-row gap-10 items-start">
    //     <div className="flex flex-col gap-6 w-full lg:w-1/3">
    //       {[
    //         { label: "Total ETH Bridged", value: 124350 },
    //         { label: "Active Bridges", value: 7 },
    //         { label: "Total L2 Transactions", value: 3250000 },
    //       ].map((stat, i) => (
    //         <motion.div
    //           key={i}
    //           className="bg-[#2d3748] rounded-lg p-6 shadow-md"
    //           initial={{ opacity: 0, y: 20 }}
    //           whileInView={{ opacity: 1, y: 0 }}
    //           transition={{ delay: i * 0.2 }}
    //         >
    //           <div className="text-3xl font-semibold text-[#38bdf8]">
    //             <CountUp end={stat.value} duration={2.5} separator="," />
    //           </div>
    //           <div className="mt-2 text-base text-gray-300">{stat.label}</div>
    //         </motion.div>
    //       ))}
    //     </div>

    //     <motion.div
    //       className="w-full lg:w-2/3 bg-[#2d3748] rounded-lg p-6"
    //       initial={{ opacity: 0 }}
    //       whileInView={{ opacity: 1 }}
    //       transition={{ duration: 0.8 }}
    //     >
    //       <h3 className="text-lg font-semibold mb-4 text-white">
    //         📊 Most Used L2 Bridges
    //       </h3>
    //       <div className="h-[300px] w-full">
    //         <Bar
    //           data={bridgeVolumeData}
    //           options={{
    //             responsive: true,
    //             maintainAspectRatio: false,
    //             plugins: {
    //               legend: {
    //                 labels: { color: "#e2e8f0" },
    //               },
    //               tooltip: {
    //                 mode: "index",
    //                 intersect: false,
    //               },
    //             },
    //             scales: {
    //               x: {
    //                 ticks: { color: "#cbd5e1" },
    //                 grid: { display: false },
    //               },
    //               y: {
    //                 ticks: { color: "#cbd5e1" },
    //                 grid: { color: "#334155" },
    //               },
    //             },
    //           }}
    //         />
    //       </div>
    //     </motion.div>
    //   </section>
    // </main>
  );
};
