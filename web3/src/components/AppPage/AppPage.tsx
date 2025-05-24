"use client";

import { useEffect, useRef, useState } from "react";
import { Network, DataSet } from "vis-network/standalone/esm/vis-network";

// Simulated bridge transfer data
const mockTransfers = [
  { blockNumber: 20000001, amount: 1, direction: "IN" },
  { blockNumber: 20000002, amount: 2, direction: "OUT" },
  { blockNumber: 20000003, amount: 1, direction: "IN" },
  { blockNumber: 20000004, amount: 3, direction: "OUT" },
  { blockNumber: 20000005, amount: 2, direction: "IN" },
  { blockNumber: 20000006, amount: 4, direction: "OUT" },
  { blockNumber: 20000007, amount: 1, direction: "IN" },
  { blockNumber: 20000008, amount: 1, direction: "OUT" },
  { blockNumber: 20000009, amount: 3, direction: "IN" },
  { blockNumber: 20000010, amount: 2, direction: "OUT" },
];

const minBlock = 20000000;
const maxBlock = 20100000;

export default function AppPage() {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesRef = useRef<DataSet<any>>(new DataSet());
  const edgesRef = useRef<DataSet<any>>(new DataSet());

  const [minIncludedBlock, setMinIncludedBlock] = useState(minBlock);
  const [bridgeData, setBridgeData] = useState<any[]>([]);

  const testDbConnection = async () => {
    try {
      const response = await fetch("/api/bridge");
      const data = await response.json();
      console.log("API Response:", data);
      if (data.data) {
        setBridgeData(data.data);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Call API on component mount
  useEffect(() => {
    testDbConnection();
  }, []);

  // Update edge labels when block filter changes
  useEffect(() => {
    const inSum = bridgeData
      .filter(
        (t) => Number(t.block_number) >= minBlock && Number(t.block_number) <= minIncludedBlock && t.direction === "IN"
      )
      .reduce((acc, t) => {
        const amount = BigInt(t.amount);
        const ethAmount = Number(amount) / 1e18;
        console.log(`IN Block ${t.block_number}: ${ethAmount.toFixed(4)} ETH`);
        return acc + ethAmount;
      }, 0);

    const outSum = bridgeData
      .filter(
        (t) => Number(t.block_number) >= minBlock && Number(t.block_number) <= minIncludedBlock && t.direction === "OUT"
      )
      .reduce((acc, t) => {
        const amount = BigInt(t.amount);
        const ethAmount = Number(amount) / 1e18;
        console.log(`OUT Block ${t.block_number}: ${ethAmount.toFixed(4)} ETH`);
        return acc + ethAmount;
      }, 0);

    console.log("\nBridge Transfer Totals:");
    console.log("IN:", inSum.toFixed(4), "ETH");
    console.log("OUT:", outSum.toFixed(4), "ETH");
    console.log("Total:", (inSum + outSum).toFixed(4), "ETH");

    const edges = edgesRef.current;

    const outEdge = edges.get("outflow");
    const inEdge = edges.get("inflow");

    if (outEdge) {
      edges.update({
        ...outEdge,
        label: `${outSum.toFixed(4)} ETH`,
      });
    }

    if (inEdge) {
      edges.update({
        ...inEdge,
        label: `${inSum.toFixed(4)} ETH`,
      });
    }
  }, [minIncludedBlock, bridgeData]);

  useEffect(() => {
    if (!graphRef.current) return;

    const nodes = nodesRef.current;
    const edges = edgesRef.current;

    // Clear existing nodes and edges
    nodes.clear();
    edges.clear();

    nodes.add([
      {
        id: "Ethereum",
        label: "Ethereum",
        shape: "circularImage",
        image: "/eth.png",
        size: 120,
        x: -300,
        y: 1,
        borderWidth: 4,
        color: { border: "#6366f1", background: "#ffffff" },
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
        color: { border: "#ef4444", background: "#ffffff" },
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

    edges.add([
      {
        id: "outflow",
        from: "Ethereum",
        to: "Optimism",
        arrows: { to: { enabled: true, scaleFactor: 2.5 } },
        label: "0 ETH",
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
        id: "inflow",
        from: "Optimism",
        to: "Ethereum",
        arrows: { to: { enabled: true, scaleFactor: 2.5 } },
        label: "0 ETH",
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
        layout: { improvedLayout: true },
        physics: { enabled: false },
        interaction: { hover: true },
      }
    );

    networkRef.current = network;

    // Ensure ETH/OP nodes render on top
    setTimeout(() => {
      const eth = nodes.get("Ethereum");
      const op = nodes.get("Optimism");
      if (eth && op) {
        nodes.remove(["Ethereum", "Optimism"]);
        nodes.add([eth, op]);
      }
    }, 100);

    // Animate bubbles
    let t1 = 0;
    let t2 = 0.5;
    let animationFrameId: number;

    function getBezierPos(t: number, from: any, to: any, roundness: number) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      const cp = { x: mx, y: my - roundness * dist };

      return {
        x: Math.pow(1 - t, 2) * from.x + 2 * (1 - t) * t * cp.x + Math.pow(t, 2) * to.x,
        y: Math.pow(1 - t, 2) * from.y + 2 * (1 - t) * t * cp.y + Math.pow(t, 2) * to.y,
      };
    }

    function animateBubbles() {
      if (!networkRef.current) return;

      const positions = networkRef.current.getPositions(["Ethereum", "Optimism"]);
      const eth = positions["Ethereum"];
      const op = positions["Optimism"];

      if (!eth || !op) return;

      t1 += 0.003;
      t2 += 0.003;
      if (t1 > 1) t1 = 0;
      if (t2 > 1) t2 = 0;

      const pos1 = getBezierPos(t1, eth, op, -0.2);
      const pos2 = getBezierPos(t2, op, eth, 0.4);

      nodes.update([
        { id: "eth-bubble-1", x: pos1.x, y: pos1.y },
        { id: "eth-bubble-2", x: pos2.x, y: pos2.y },
      ]);

      animationFrameId = requestAnimationFrame(animateBubbles);
    }

    // Start animation after a short delay to ensure network is ready
    setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateBubbles);
    }, 200);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      network.destroy();
      nodes.clear();
      edges.clear();
    };
  }, []);

  return (
    <div className="pt-32 h-screen text-black flex flex-col" style={{ background: "#e4e6ea" }}>
      <div className="px-8 w-[500px] bg-white rounded-lg shadow-lg p-6 mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Block Range:</span>
          <span className="font-semibold">
            {minBlock.toLocaleString()} - {minIncludedBlock.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={minBlock}
          max={maxBlock}
          step={1000}
          value={minIncludedBlock}
          onChange={(e) => setMinIncludedBlock(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      <div className="pt-4 w-full h-screen text-black flex flex-col" style={{ background: "#e4e6ea" }}>
        <div ref={graphRef} className="flex-grow" />
      </div>
    </div>
  );
}
