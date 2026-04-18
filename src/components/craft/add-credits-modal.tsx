"use client";

import { useCraftStore } from "@/lib/store";
import { X, Coins, Check } from "lucide-react";
import { toast } from "sonner";

const creditPacks = [
  { name: "Starter", credits: 50, price: 2.5, priceStr: "$2.50" },
  { name: "Standard", credits: 200, price: 10, priceStr: "$10" },
  { name: "Popular", credits: 500, price: 25, priceStr: "$25", popular: true },
  { name: "Business", credits: 1000, price: 50, priceStr: "$50" },
];

export function AddCreditsModal() {
  const { showModal, openModal, addCredits } = useCraftStore();

  if (showModal !== "add-credits") return null;

  const handleBuy = (pack: typeof creditPacks[0]) => {
    addCredits(pack.credits, `${pack.name} Pack - ${pack.credits} credits`);
    toast.success(`${pack.credits} credits added to your account!`);
    openModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => openModal(null)}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-lg w-full p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#fbbf24]" />
            <h2 className="font-display text-xl font-bold">Add Credits</h2>
          </div>
          <button onClick={() => openModal(null)} className="p-1 rounded-lg hover:bg-white/5">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-6">Choose a credit pack to continue creating designs</p>

        <div className="space-y-3">
          {creditPacks.map((pack) => (
            <button
              key={pack.name}
              onClick={() => handleBuy(pack)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                pack.popular
                  ? "border-[#f0653a]/40 bg-[#f0653a]/5 hover:border-[#f0653a]/60"
                  : "border-white/10 bg-[#1a1a1a] hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                {pack.popular && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #f0653a, #fbbf24)" }}>BEST VALUE</span>
                )}
                <div className="text-left">
                  <div className="font-semibold text-sm">{pack.name}</div>
                  <div className="text-xs text-gray-500">{pack.credits} credits</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-lg">{pack.priceStr}</div>
                <div className="text-[10px] text-gray-500">
                  {pack.credits > 0 ? `$${(pack.price / pack.credits * 100).toFixed(0)} per 100 cr` : ""}
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[10px] text-gray-600 text-center mt-4">Demo mode: credits are added instantly. No real payment processed.</p>
      </div>
    </div>
  );
}
