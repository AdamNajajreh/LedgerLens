"use client";

import { useEffect, useRef } from "react";
import { Network, DataSet } from "vis-network/standalone/esm/vis-network";

export default function AppPage() {
  const graphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!graphRef.current) return;

    const nodes = new DataSet([
      {
        id: "Ethereum",
        label: "Ethereum",
        shape: "circularImage",
        image: "/eth.png",
        size: 120,
        x: -300,
        y: 1,
        borderWidth: 4,
        color: {
          border: "#6366f1",
          background: "#ffffff",
          highlight: {
            border: "#000000",
            background: "#ffffff",
          },
        },
        font: { size: 18, color: "#111" },
      },
      {
        id: "Optimism",
        label: "Optimism",
        shape: "circularImage",
        image: "/Optimism.png",
        size: 60,
        x: 300,
        y: 0,
        borderWidth: 4,
        color: {
          border: "#ef4444",
          background: "#ffffff",
          highlight: {
            border: "#000000",
            background: "#ffffff",
          },
        },
        font: { size: 18, color: "#111" },
      },
      {
        id: "eth-bubble-1",
        shape: "circularImage",
        image: "/eth.png",
        size: 20,
        label: "",
        physics: false,
      },
      {
        id: "eth-bubble-2",
        shape: "circularImage",
        image: "/eth.png",
        size: 20,
        label: "",
        physics: false,
      },
    ]);

    const edges = new DataSet([
      {
        from: "Ethereum",
        to: "Optimism",
        arrows: { to: { enabled: true, scaleFactor: 2.5 } },
        label: "Outflow\n1.2 ETH",
        font: {
          size: 16,
          vadjust: -30,
          face: "monospace",
          color: "#000",
          align: "middle",
        },
        width: 3,
        smooth: {
          type: "curvedCW",
          roundness: -0.4,
          forceDirection: "horizontal",
        },
        color: { color: "green", highlight: "green" },
      },
      {
        from: "Optimism",
        to: "Ethereum",
        arrows: { to: { enabled: true, scaleFactor: 2.5 } },
        label: "Inflow\n0.8 ETH",
        font: {
          size: 16,
          vadjust: 30,
          face: "monospace",
          color: "#000",
          align: "middle",
        },
        width: 3,
        smooth: {
          type: "curvedCCW",
          roundness: 0.4,
          forceDirection: "horizontal",
        },
        color: { color: "red", highlight: "red" },
      },
    ]);

    const network = new Network(
      graphRef.current,
      { nodes, edges },
      {
        layout: {
          improvedLayout: true,
        },
        physics: {
          enabled: false,
        },
        interaction: {
          hover: true,
        },
      }
    );
    setTimeout(() => {
      const ethNode = nodes.get("Ethereum");
      const opNode = nodes.get("Optimism");

      if (ethNode && opNode) {
        nodes.remove(["Ethereum", "Optimism"]);
        nodes.add([ethNode, opNode]);
      }
    }, 100);

    let t1 = 0;
    let t2 = 0.5; // staggered start

    function getBezierPos(t: number, from: any, to: any, roundness: number) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      const cp = {
        x: mx,
        y: my - roundness * dist,
      };

      const x = Math.pow(1 - t, 2) * from.x + 2 * (1 - t) * t * cp.x + Math.pow(t, 2) * to.x;
      const y = Math.pow(1 - t, 2) * from.y + 2 * (1 - t) * t * cp.y + Math.pow(t, 2) * to.y;

      return { x, y };
    }

    function animateBubbles() {
      const eth = network.getPositions(["Ethereum"])["Ethereum"];
      const op = network.getPositions(["Optimism"])["Optimism"];
      if (!eth || !op) return;

      t1 += 0.003;
      t2 += 0.003;
      if (t1 > 1) t1 = 0;
      if (t2 > 1) t2 = 0;

      const pos1 = getBezierPos(t1, eth, op, -0.2); // Outflow
      const pos2 = getBezierPos(t2, op, eth, 0.4); // Inflow

      nodes.update([
        { id: "eth-bubble-1", x: pos1.x, y: pos1.y },
        { id: "eth-bubble-2", x: pos2.x, y: pos2.y },
      ]);

      requestAnimationFrame(animateBubbles);
    }

    requestAnimationFrame(animateBubbles);

    return () => network.destroy();
  }, []);

  return (
    <div className="pt-32 w-full h-screen text-black flex flex-col" style={{ background: "#e4e6ea" }}>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">From: 20 000 000 To: 20 100 000 </h1>
      </div>
      <div ref={graphRef} className="flex-grow" />
    </div>
  );
}
