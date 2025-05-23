'use client'

import Image from 'next/image'

export default function DashboardComp() {
  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <section className="max-w-3xl mx-auto p-6 flex justify-between items-center mb-12">
        <h1 className="text-xl font-medium">LedgerLens</h1>
        <button className="px-4 py-2 text-sm font-medium bg-cyan-100 text-cyan-900 rounded-md shadow hover:bg-cyan-200 transition">
          Launch app &gt;
        </button>
      </section>

      <section className="text-center mb-20">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          🔍 Explore Blockchain Networks as Interactive Graphs
        </h2>
        <p className="text-sm sm:text-base max-w-xl mx-auto">
          Navigate, analyze, and understand blockchain data through intuitive graph-based exploration.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">🧠 Why Graphs?</h3>
          <p className="text-sm leading-relaxed">
            Blockchain data is inherently interconnected—transactions link wallets, contracts, and blocks.
            LedgerLens reveals these relationships visually, helping you detect patterns, trace funds,
            and uncover insights that static tables can’t.
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <Image
            src="/graph-placeholder.png"
            alt="Graph illustration"
            width={300}
            height={300}
            className="w-full h-auto"
          />
        </div>
      </section>
    </main>
  )
}
