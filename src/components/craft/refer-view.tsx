"use client";

import { useCraftStore } from "@/lib/store";
import { Gift, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ReferView() {
  const { referralCode, addCredits } = useCraftStore();
  const [copied, setCopied] = useState(false);

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}?ref=${referralCode}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaimBonus = () => {
    addCredits(10, "Referral bonus claimed");
    toast.success("10 bonus credits added!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Refer & Earn</h1>
        <p className="text-gray-400 text-sm">Share Craft with friends and earn free credits</p>
      </div>

      <div className="craft-card text-center py-12">
        <Gift className="w-16 h-16 text-[#fbbf24] mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold mb-2">Earn 10 Free Credits</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
          For every friend who signs up using your referral link, you both get 10 free credits.
        </p>

        <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-3 mb-6">
          <input
            readOnly
            value={referralLink}
            className="flex-1 bg-transparent text-sm text-gray-300 outline-none font-mono"
          />
          <button onClick={handleCopy} className="craft-btn px-4 py-2 text-sm">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="text-xs text-gray-500 mb-6">
          Your referral code: <span className="font-mono text-[#f0653a]">{referralCode}</span>
        </div>

        <button onClick={handleClaimBonus} className="craft-btn px-6 py-3 text-sm">
          <Gift className="w-4 h-4" /> Claim Demo Bonus (10 cr)
        </button>
      </div>

      <div className="craft-card">
        <h3 className="font-display font-semibold mb-3">How It Works</h3>
        <div className="space-y-3">
          {[
            "Share your unique referral link with friends",
            "Your friend signs up using your link",
            "You both receive 10 free credits automatically",
            "No limit on referrals — earn unlimited credits!",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f0653a]/20 flex items-center justify-center text-xs font-bold text-[#f0653a] flex-shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
