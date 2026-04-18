"use client";

import { DollarSign, TrendingDown, AlertCircle } from "lucide-react";

export function ApiCostsView() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">API Costs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="craft-card"><DollarSign className="w-5 h-5 text-[#f0653a] mb-2" /><div className="text-2xl font-bold">$0.00</div><div className="text-xs text-gray-500">Today&apos;s Cost</div></div>
        <div className="craft-card"><TrendingDown className="w-5 h-5 text-green-400 mb-2" /><div className="text-2xl font-bold">$0.00</div><div className="text-xs text-gray-500">This Month</div></div>
        <div className="craft-card"><AlertCircle className="w-5 h-5 text-[#fbbf24] mb-2" /><div className="text-2xl font-bold">$0.00</div><div className="text-xs text-gray-500">Avg Cost/Gen</div></div>
      </div>
      <div className="craft-card text-center py-12 text-gray-500 text-sm">API cost tracking will be available when connected to a real image generation API.</div>
    </div>
  );
}
