"use client";

import { UserPlus, Gift, Users } from "lucide-react";

export function ReferralsView() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Referrals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="craft-card"><UserPlus className="w-5 h-5 text-[#f0653a] mb-2" /><div className="text-2xl font-bold">0</div><div className="text-xs text-gray-500">Total Referrals</div></div>
        <div className="craft-card"><Gift className="w-5 h-5 text-[#fbbf24] mb-2" /><div className="text-2xl font-bold">0</div><div className="text-xs text-gray-500">Credits Awarded</div></div>
        <div className="craft-card"><Users className="w-5 h-5 text-green-400 mb-2" /><div className="text-2xl font-bold">0</div><div className="text-xs text-gray-500">Active Referred</div></div>
      </div>
      <div className="craft-card text-center py-12 text-gray-500 text-sm">Referral tracking will be available after connecting a real database.</div>
    </div>
  );
}
