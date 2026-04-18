"use client";

import { mockAdminTransactions } from "@/lib/admin-data";
import { Search } from "lucide-react";
import { useState } from "react";

export function TransactionsView() {
  const [search, setSearch] = useState("");
  const filtered = mockAdminTransactions.filter((t) => t.userName.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Transactions</h1>
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." className="w-full bg-[#111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50" />
      </div>
      <div className="craft-card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">
            <th className="text-left p-4 font-medium text-gray-400">User</th>
            <th className="text-left p-4 font-medium text-gray-400">Type</th>
            <th className="text-left p-4 font-medium text-gray-400">Description</th>
            <th className="text-left p-4 font-medium text-gray-400">Credits</th>
            <th className="text-left p-4 font-medium text-gray-400">Amount</th>
            <th className="text-left p-4 font-medium text-gray-400">Status</th>
            <th className="text-left p-4 font-medium text-gray-400">Date</th>
          </tr></thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 text-white">{t.userName}</td>
                <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs ${t.type === "purchase" ? "bg-green-500/10 text-green-400" : t.type === "usage" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>{t.type}</span></td>
                <td className="p-4 text-gray-300">{t.description}</td>
                <td className={`p-4 font-medium ${t.credits > 0 ? "text-green-400" : "text-red-400"}`}>{t.credits > 0 ? "+" : ""}{t.credits}</td>
                <td className="p-4 text-gray-300">{t.amount > 0 ? `$${t.amount}` : "-"}</td>
                <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs ${t.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{t.status}</span></td>
                <td className="p-4 text-gray-400 text-xs">{new Date(t.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
