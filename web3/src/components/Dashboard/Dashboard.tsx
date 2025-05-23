import React from "react";
import GraphScene from "./GraphScene";
import GlassOverlay from "./GlassOverlay";
import DashboardComp from "./DashboardComp";

export const Dashboard = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <GraphScene />
      </div>

      <div className="fixed inset-0 z-10">
        <GlassOverlay />
      </div>

      <div className="relative z-20 pt-32">
        <DashboardComp />
      </div>
    </div>
  );
};
