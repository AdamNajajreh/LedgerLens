import React from "react";
import { Layers_content } from "./Layers_content";
import GraphScene from "../Dashboard/GraphScene";
import GlassOverlay from "../Dashboard/GlassOverlay";

export const Layers = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <GraphScene />
      </div>

      <div className="fixed inset-0 z-10">
        <GlassOverlay />
      </div>
      <div className="relative z-20">
        <Layers_content></Layers_content>
      </div>
    </div>
  );
};
