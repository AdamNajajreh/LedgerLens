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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const AboutContent = () => {
  const bridgeVolumeData = {
    labels: ["zkSync", "Arbitrum", "StarkNet", "Optimism", "Base"],
    datasets: [
      {
        label: "ETH Bridged",
        data: [3727077, 3557939, 915654, 788447, 390437],
        backgroundColor: "#38bdf8",
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  return (
    <div className="h-screen w-full overflow-y-scroll text-white snap-y snap-mandatory relative">
      {/* Section 1: Introduction */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
          <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            🔍 About This Project
          </h2>
          <p className="text-2xl text-gray-700">
            Explore how Ethereum's multi-layer ecosystem transfers value. This
            project indexes and visualizes token flows across L1 and L2 to
            reveal key patterns, bridge usage, and scaling behaviors.
          </p>
          <p className="text-xl text-gray-700">
            All data is pulled from the Ethereum blockchain and categorized by
            bridge, layer direction, and transaction metrics.
          </p>
        </div>
      </section>

      {/* Section 2: Stats + Chart */}
      <section className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-6xl mx-auto p-6 backdrop-blur-md bg-white/80 rounded-2xl m-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg w-full">
          <h3 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400 mb-8">
            🚀 Live Layer Activity Stats
          </h3>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Stats */}
            <div className="flex flex-col gap-6 w-full lg:w-1/3">
              {[
                { label: "Total ETH Bridged", value: 39870000000 },
                { label: "Active Bridges", value: 150 },
                { label: "Total L2 Transactions", value: 42000000 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-[#2d3748] rounded-lg p-6 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="text-3xl font-semibold text-[#38bdf8]">
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  </div>
                  <div className="mt-2 text-base text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <motion.div
              className="w-full lg:w-2/3 bg-[#2d3748] rounded-lg p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-white">
                📊 Most Used L2 Bridges
              </h4>
              <div className="h-[300px] w-full">
                <Bar
                  data={bridgeVolumeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: { color: "#e2e8f0" },
                      },
                      tooltip: {
                        mode: "index",
                        intersect: false,
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: "#cbd5e1" },
                        grid: { display: false },
                      },
                      y: {
                        ticks: { color: "#cbd5e1" },
                        grid: { color: "#334155" },
                      },
                    },
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
