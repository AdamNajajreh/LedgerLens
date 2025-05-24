"use client";

import { useEffect, useRef } from "react";
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

const minBlock = 20000001;
const maxBlock = 20000010;

export default function AppPage() {
  const graphRef = useRef<HTMLDivElement | null>(null);
  
  const networkRef = useRef<Network | null>(null);
  const nodesRef = useRef<DataSet<any>>(new DataSet());
  const edgesRef = useRef<DataSet<any>>(new DataSet());

  const [minIncludedBlock, setMinIncludedBlock] = useState(minBlock);

  // Update edge labels when block filter changes
  useEffect(() => {
    const inSum = mockTransfers
      .filter((t) => t.blockNumber >= minIncludedBlock && t.direction === "IN")
      .reduce((acc, t) => acc + t.amount, 0);

    const outSum = mockTransfers
      .filter((t) => t.blockNumber >= minIncludedBlock && t.direction === "OUT")
      .reduce((acc, t) => acc + t.amount, 0);

    const edges = edgesRef.current;

    const outEdge = edges.get("outflow");
    const inEdge = edges.get("inflow");

    if (outEdge) {
      edges.update({
        ...outEdge,
        label: `Outflow\n${outSum.toFixed(1)} ETH`,
      });
    }

    if (inEdge) {
      edges.update({
        ...inEdge,
        label: `Inflow\n${inSum.toFixed(1)} ETH`,
      });
    }
  }, [minIncludedBlock]);
  
  const [dbStatus, setDbStatus] = useState<{ status: string; message: string; timestamp?: string } | null>(null);

  const testDbConnection = async () => {
    try {
      const response = await fetch("/api/bridge");
      const data = await response.json();
      console.log(data);
      setDbStatus(data);
    } catch (error) {
      setDbStatus({
        status: "error",
        message: "Failed to connect to API endpoint",
      });
    }
  };
  

  useEffect(() => {
    if (!graphRef.current) return;

    const nodes = nodesRef.current;
    const edges = edgesRef.current;

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
        y: 1,
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

    if (!edges.get("outflow")) {
      edges.add([
        {
          id: "outflow",
          from: "Ethereum",
          to: "Optimism",
          arrows: { to: { enabled: true, scaleFactor: 2.5 } },
          label: "Outflow\n0 ETH",
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
          label: "Inflow\n0 ETH",
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
    }

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
      nodes.remove(["Ethereum", "Optimism"]);
      nodes.add([eth, op]);
    }, 100);

    // Animate bubbles
    let t1 = 0;
    let t2 = 0.5;

    function getBezierPos(t: number, from: any, to: any, roundness: number) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      const cp = { x: mx, y: my - roundness * dist };

      return {
        x:
          Math.pow(1 - t, 2) * from.x +
          2 * (1 - t) * t * cp.x +
          Math.pow(t, 2) * to.x,
        y:
          Math.pow(1 - t, 2) * from.y +
          2 * (1 - t) * t * cp.y +
          Math.pow(t, 2) * to.y,
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

      const pos1 = getBezierPos(t1, eth, op, -0.2);
      const pos2 = getBezierPos(t2, op, eth, 0.4);

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
    <div
      className="pt-16 w-full h-screen text-black flex flex-col"
      style={{ background: "#e4e6ea" }}
    >
      <div className="px-8">
        <label className="block text-lg font-semibold mb-2">
          From Block: {minIncludedBlock}
        </label>
        <input
          type="range"
          min={minBlock}
          max={maxBlock}
          step={1}
          value={minIncludedBlock}
          onChange={(e) => setMinIncludedBlock(Number(e.target.value))}
          className="w-full"
        />
      </div>

    <div className="pt-32 w-full h-screen text-black flex flex-col" style={{ background: "#e4e6ea" }}>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">From: 20 000 000 To: 20 100 000 </h1>
      </div>
      <div ref={graphRef} className="flex-grow" />
    </div>
  );
}
