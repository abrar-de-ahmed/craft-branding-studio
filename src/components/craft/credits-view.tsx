"use client";

import { useCraftStore } from "@/lib/store";
import { Coins, Plus, CreditCard, History, TrendingUp } from "lucide-react";

export function CreditsView() {
  const { credits, transactions, openModal } = useCraftStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Credits</h1>
        <p className="text-gray-400 text-sm">Manage your credit balance and purchase history</p>
      </div>

      {/* Balance Card */}
      <div className="craft-card" style={{ background: "linear-gradient(135deg, #1a1a1a, #111)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-400 text-sm mb-1">Available Credits</div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold">{credits}</span>
              <span className="text-gray-500 text-sm">credits</span>
            </div>
          </div>
          <button onClick={() => openModal("add-credits")} className="craft-btn px-6 py-3">
            <Plus className="w-5 h-5" /> Add Credits
          </button>
        </div>
      </div>

      {/* Credit Packs */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Credit Packs</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Starter", credits: 50, price: "$2.50" },
            { name: "Standard", credits: 200, price: "$10" },
            { name: "Popular", credits: 500, price: "$25" },
            { name: "Business", credits: 1000, price: "$50" },
          ].map((pack) => (
            <div key={pack.name} className="craft-card craft-card-hover cursor-pointer text-center" onClick={() => openModal("add-credits")}>
              <Coins className="w-8 h-8 text-[#fbbf24] mx-auto mb-2" />
              <div className="font-display font-bold text-lg">{pack.name}</div>
              <div className="text-2xl font-bold text-[#f0653a] my-1">{pack.price}</div>
              <div className="text-xs text-gray-400">{pack.credits} credits</div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Transaction History</h2>
        {transactions.length === 0 ? (
          <div className="craft-card text-center py-12">
            <History className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No transactions yet</p>
          </div>
        ) : (
          <div className="craft-card p-0 overflow-hidden">
            <div className="divide-y divide-white/5">
              {transactions.slice(0, 20).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {tx.type === "purchase" ? (
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-red-400" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium">{tx.description}</div>
                      <div className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${tx.credits > 0 ? "text-green-400" : "text-red-400"}`}>
                    {tx.credits > 0 ? "+" : ""}{tx.credits} cr
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
