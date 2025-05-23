import React from "react";
import GlassOverlay from "@/components/Dashboard/GlassOverlay";
import GraphScene from "@/components/Dashboard/GraphScene";
import DashboardComp from "@/components/Dashboard/DashboardComp";

export default function page() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background Graph */}
      <div className="absolute inset-0 z-0">
        <GraphScene />
      </div>

      {/* Blur overlay */}
      <div className="absolute inset-0 z-10">
        <GlassOverlay />
      </div>

      {/* UI on top */}
      <div className="relative z-20 px-6 py-10">
        <DashboardComp />
      </div>
    </div>
  );
}
