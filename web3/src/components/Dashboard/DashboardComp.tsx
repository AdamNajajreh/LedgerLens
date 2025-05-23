"use client";

import Image from "next/image";

export default function DashboardComp() {
  return (
    <main className="min-h-screen px-6 pt-12 text-black flex flex-col items-center space-y-12">
      {/* Hero section */}
      <section className="w-full max-w-4xl backdrop-blur-2xl bg-white/5 rounded-xl p-6 shadow-md ring-1 ring-white/10 text-center">
        <h2 className="text-2xl font-bold mb-2">🔍 Explore Blockchain Networks as Interactive Graphs</h2>
        <p className="text-base">
          Navigate, analyze, and understand blockchain data through intuitive graph-based exploration.
        </p>
      </section>

      {/* Why Graphs section */}
      <section className="w-full max-w-4xl backdrop-blur-2xl bg-white/5 rounded-xl p-6 shadow-md ring-1 ring-white/10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">🧠 Why Graphs?</h3>
          <p className="text-sm leading-relaxed">
            Blockchain data is inherently interconnected—transactions link wallets, contracts, and blocks. LedgerLens
            reveals these relationships visually, helping you detect patterns, trace funds, and uncover insights that
            static tables can't.
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <Image
            src="/examplegraphimage.png"
            alt="Graph illustration"
            width={300}
            height={300}
            className="w-full h-auto rounded-md"
          />
        </div>
      </section>
    </main>
  );
}
