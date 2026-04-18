"use client";

import { mockAdminStats } from "@/lib/admin-data";
import { Users, DollarSign, Image, TrendingUp, Activity, Star, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function DashboardView() {
  const stats = mockAdminStats;

  const statCards = [
    { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: Users, change: "+12%", up: true, color: "#f0653a" },
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, change: "+8.3%", up: true, color: "#22c55e" },
    { label: "Total Generations", value: stats.totalGenerations.toLocaleString(), icon: Image, change: "+15%", up: true, color: "#fbbf24" },
    { label: "Active Users", value: stats.activeUsers.toLocaleString(), icon: Activity, change: "-2.1%", up: false, color: "#8b5cf6" },
    { label: "Credits Used", value: stats.creditsUsed.toLocaleString(), icon: TrendingUp, change: "+22%", up: true, color: "#f0653a" },
    { label: "Credits Sold", value: stats.creditsPurchased.toLocaleString(), icon: Star, change: "+18%", up: true, color: "#fbbf24" },
    { label: "Avg Rating", value: stats.avgRating.toString(), icon: Star, change: "+0.1", up: true, color: "#22c55e" },
    { label: "Conversion", value: `${stats.conversionRate}%`, icon: TrendingUp, change: "+1.2%", up: true, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="craft-card">
            <div className="flex items-center justify-between mb-3">
              <card.icon className="w-5 h-5" style={{ color: card.color }} />
              <span className={`text-xs flex items-center gap-0.5 ${card.up ? "text-green-400" : "text-red-400"}`}>
                {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-display font-bold">{card.value}</div>
            <div className="text-xs text-gray-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>
      <div className="craft-card text-center py-8 text-gray-500 text-sm">
        Dashboard charts and analytics will be available after connecting a real database.
      </div>
    </div>
  );
}
