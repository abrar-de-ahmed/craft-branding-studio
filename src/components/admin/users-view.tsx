"use client";

import { mockAdminUsers } from "@/lib/admin-data";
import { Search } from "lucide-react";
import { useState } from "react";

export function UsersView() {
  const [search, setSearch] = useState("");
  const filtered = mockAdminUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Users</h1>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full bg-[#111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50" />
        </div>
      </div>
      <div className="craft-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">
              <th className="text-left p-4 font-medium text-gray-400">User</th>
              <th className="text-left p-4 font-medium text-gray-400">Credits</th>
              <th className="text-left p-4 font-medium text-gray-400">Generations</th>
              <th className="text-left p-4 font-medium text-gray-400">Plan</th>
              <th className="text-left p-4 font-medium text-gray-400">Status</th>
              <th className="text-left p-4 font-medium text-gray-400">Joined</th>
            </tr></thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4"><div className="text-white font-medium">{u.name}</div><div className="text-xs text-gray-500">{u.email}</div></td>
                  <td className="p-4">{u.credits}</td>
                  <td className="p-4">{u.generations}</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded text-xs bg-white/5">{u.plan}</span></td>
                  <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs ${u.status === "active" ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}>{u.status}</span></td>
                  <td className="p-4 text-gray-400 text-xs">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
