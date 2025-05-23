import React from "react";
import GraphScene from "../Dashboard/GraphScene";
import GlassOverlay from "../Dashboard/GlassOverlay";
import { AboutContent } from "./AboutContent";

export const About = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Graph */}
      <div className="absolute inset-0 z-0">
        <GraphScene />
      </div>

      {/* Blur overlay */}
      <div className="absolute inset-0 z-10">
        <GlassOverlay />
      </div>

      {/* UI on top */}
      <div className="relative z-20">
        <AboutContent />
      </div>
    </div>
  );
};
