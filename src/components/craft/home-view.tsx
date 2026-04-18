"use client";

import { useCraftStore } from "@/lib/store";
import { Wand2, Image, Coins, Gift } from "lucide-react";

export function HomeView() {
  const { user, credits, generations, referralCode, setView } = useCraftStore();

  const recentGens = generations.slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Welcome back{user?.name ? `, ${user.name}` : ""}</h1>
        <p className="text-gray-400 text-sm">Here&apos;s what&apos;s happening with your account</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Coins, label: "Credits", value: credits.toString(), color: "#fbbf24" },
          { icon: Image, label: "Designs", value: generations.length.toString(), color: "#f0653a" },
          { icon: Gift, label: "Referral Code", value: referralCode || "N/A", color: "#22c55e" },
          { icon: Wand2, label: "Avg Per Day", value: generations.length > 0 ? Math.round(generations.length / 7).toString() : "0", color: "#8b5cf6" },
        ].map((stat) => (
          <div key={stat.label} className="craft-card">
            <stat.icon className="w-5 h-5 mb-2" style={{ color: stat.color }} />
            <div className="text-2xl font-display font-bold">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setView("create")} className="craft-card craft-card-hover text-left py-6">
          <Wand2 className="w-8 h-8 text-[#f0653a] mb-3" />
          <h3 className="font-display font-bold mb-1">Create New Design</h3>
          <p className="text-xs text-gray-500">Generate a logo, poster, or social media graphic</p>
        </button>
        <button onClick={() => setView("refer")} className="craft-card craft-card-hover text-left py-6">
          <Gift className="w-8 h-8 text-[#fbbf24] mb-3" />
          <h3 className="font-display font-bold mb-1">Refer a Friend</h3>
          <p className="text-xs text-gray-500">Earn 10 free credits for each referral</p>
        </button>
      </div>

      {/* Recent Generations */}
      {recentGens.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-lg mb-3">Recent Designs</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {recentGens.map((gen) => (
              <div key={gen.id} className="aspect-square rounded-xl overflow-hidden border border-white/5">
                <img src={gen.url} alt={gen.prompt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
