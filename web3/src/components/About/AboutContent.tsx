"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Footer } from "../Footer/Footer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const AboutContent = () => {
  const [totalEthBridged, setTotalEthBridged] = useState(0);
  const [activeBridges, setActiveBridges] = useState(0);
  const [uniqueChains, setUniqueChains] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [bridgeVolumeData, setBridgeVolumeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monthly Volume (USD)",
        data: [],
        backgroundColor: "#38bdf8",
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bridge data
        const bridgeResponse = await fetch("https://bridges.llama.fi/bridges");
        const bridgeData = await bridgeResponse.json();

        // Calculate total monthly volume across all bridges
        const total = bridgeData.bridges.reduce((sum: number, bridge: any) => {
          return sum + (bridge.monthlyVolume || 0);
        }, 0);

        // Count unique chains across all bridge
        const allChains = new Set();
        bridgeData.bridges.forEach((bridge: any) => {
          bridge.chains.forEach((chain: string) => {
            allChains.add(chain.toLowerCase());
          });
        });

        const topBridges = [...bridgeData.bridges]
          .sort((a, b) => (b.monthlyVolume || 0) - (a.monthlyVolume || 0))
          .slice(0, 5);

        const chartData = {
          labels: topBridges.map((bridge) => bridge.displayName),
          datasets: [
            {
              label: "Monthly Volume (USD)",
              data: topBridges.map((bridge) => bridge.monthlyVolume || 0),
              backgroundColor: "rgba(244, 63, 94, 0.8)", // rose-500 with opacity
              borderRadius: 8,
              barThickness: 28,
            },
          ],
        };

        setTotalEthBridged(total);
        setActiveBridges(bridgeData.bridges.length);
        setUniqueChains(allChains.size);
        setBridgeVolumeData(chartData);
      } catch (error) {
        console.error("Failed to fetch bridge data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollRef} className="h-screen w-full overflow-y-scroll text-white snap-y snap-mandatory relative scrollbar-hide">
      {/* Scroll Dots */}
      <div className="fixed top-1/2 right-4 pr-[6px] transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth" })}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              activeIndex === i ? "bg-orange-500 scale-125" : "bg-gray-400 hover:bg-orange-400"
            }`}
          />
        ))}
      </div>

      {/* Section 1: About */}
      <section id="section-0" className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-8 backdrop-blur-md bg-white/80 rounded-2xl m-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
          <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
            About This Project
          </h2>
          <p className="text-2xl text-gray-700">
            Explore how Ethereum's multi-layer ecosystem transfers value. This project indexes and visualizes token
            flows across L1 and L2 to reveal key patterns, bridge usage, and scaling behaviors.
          </p>
          <p className="text-xl text-gray-700">
            All data is pulled from the Ethereum blockchain and categorized by bridge, layer direction, and transaction
            metrics.
          </p>
        </div>
      </section>

      {/* Section 2: Stats */}
      <section id="section-1" className="h-screen flex items-center justify-center snap-start">
        <div className="max-w-6xl mx-auto p-6 backdrop-blur-md bg-white/80 rounded-2xl m-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg w-full">
          <h3 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400 mb-8">
            Live Layer Activity Stats
          </h3>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex flex-col gap-6 w-full lg:w-1/3">
              {[
                {
                  label: "Total ETH Bridged Last Month",
                  value: totalEthBridged,
                },
                { label: "Active Bridges", value: activeBridges },
                { label: "Supported Networks", value: uniqueChains },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-r from-rose-500 to-orange-400 rounded-lg p-6 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="text-3xl font-semibold text-white">
                    <CountUp end={stat.value} duration={2.5} separator="," decimals={0} />
                  </div>
                  <div className="mt-2 text-base text-white/90">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="w-full lg:w-2/3 bg-gradient-to-r from-rose-500/10 to-orange-400/10 rounded-lg p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-400">
                Top 5 Bridges by Monthly Volume
              </h4>
              <div className="h-[300px] w-full">
                <Bar
                  data={bridgeVolumeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: { color: "#1f2937" },
                      },
                      tooltip: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                          label: function (context) {
                            let value = context.raw as number;
                            return `$${value.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: "#1f2937",
                          maxRotation: 45,
                          minRotation: 45,
                        },
                        grid: { display: false },
                      },
                      y: {
                        ticks: {
                          color: "#1f2937",
                          callback: function (value) {
                            return (
                              "$" +
                              value.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })
                            );
                          },
                        },
                        grid: { color: "#e5e7eb" },
                      },
                    },
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
