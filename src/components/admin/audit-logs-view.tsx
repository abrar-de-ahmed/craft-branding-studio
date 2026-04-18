"use client";

import { Search, Shield } from "lucide-react";
import { useState } from "react";

const mockAuditLogs = [
  { id: "1", action: "admin_login", user: "admin@craft.studio", ip: "192.168.1.1", timestamp: "2026-04-18T10:30:00Z" },
  { id: "2", action: "settings_update", user: "admin@craft.studio", ip: "192.168.1.1", timestamp: "2026-04-18T10:25:00Z" },
  { id: "3", action: "user_suspend", user: "admin@craft.studio", ip: "192.168.1.1", timestamp: "2026-04-17T15:00:00Z" },
];

export function AuditLogsView() {
  const [search, setSearch] = useState("");
  const filtered = mockAuditLogs.filter((l) => l.action.includes(search.toLowerCase()) || l.user.includes(search.toLowerCase()));
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Audit Logs</h1>
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="w-full bg-[#111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50" />
      </div>
      <div className="craft-card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">
            <th className="text-left p-4 font-medium text-gray-400">Action</th>
            <th className="text-left p-4 font-medium text-gray-400">User</th>
            <th className="text-left p-4 font-medium text-gray-400">IP</th>
            <th className="text-left p-4 font-medium text-gray-400">Timestamp</th>
          </tr></thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className="border-b border-white/5">
                <td className="p-4"><span className="flex items-center gap-2 text-white"><Shield className="w-3 h-3 text-[#f0653a]" />{log.action}</span></td>
                <td className="p-4 text-gray-400">{log.user}</td>
                <td className="p-4 text-gray-500 font-mono text-xs">{log.ip}</td>
                <td className="p-4 text-gray-400 text-xs">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
