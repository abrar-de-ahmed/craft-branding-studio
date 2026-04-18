"use client";

import { AlertTriangle, Search } from "lucide-react";
import { useState } from "react";

const mockErrors = [
  { id: "1", message: "API rate limit exceeded", level: "warning", timestamp: "2026-04-18T10:30:00Z", source: "api/generate" },
  { id: "2", message: "Invalid API key format", level: "error", timestamp: "2026-04-18T09:15:00Z", source: "auth" },
  { id: "3", message: "Image generation timeout", level: "warning", timestamp: "2026-04-17T22:00:00Z", source: "api/generate" },
  { id: "4", message: "Database connection pool exhausted", level: "error", timestamp: "2026-04-17T18:30:00Z", source: "db" },
];

export function ErrorLogsView() {
  const [search, setSearch] = useState("");
  const filtered = mockErrors.filter((e) => e.message.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Error Logs</h1>
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search errors..." className="w-full bg-[#111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50" />
      </div>
      {filtered.map((err) => (
        <div key={err.id} className={`craft-card flex items-start gap-3 ${err.level === "error" ? "border-red-500/20" : "border-yellow-500/20"}`}>
          <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${err.level === "error" ? "text-red-400" : "text-yellow-400"}`} />
          <div>
            <p className="text-sm text-white">{err.message}</p>
            <div className="flex gap-3 mt-1 text-xs text-gray-500">
              <span>{err.source}</span>
              <span>{new Date(err.timestamp).toLocaleString()}</span>
              <span className={`px-1.5 py-0.5 rounded ${err.level === "error" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}>{err.level}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
