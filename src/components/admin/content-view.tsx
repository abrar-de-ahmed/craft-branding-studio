"use client";

import { useState } from "react";
import { FileText, Plus, Save } from "lucide-react";
import { toast } from "sonner";

export function ContentView() {
  const [pages, setPages] = useState([
    { title: "Welcome Guide", slug: "/welcome", status: "published" },
    { title: "Pricing FAQ", slug: "/pricing-faq", status: "published" },
    { title: "API Documentation", slug: "/docs/api", status: "draft" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Content</h1>
        <button className="craft-btn text-sm px-4 py-2"><Plus className="w-4 h-4" /> New Page</button>
      </div>
      <div className="craft-card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">
            <th className="text-left p-4 font-medium text-gray-400">Title</th>
            <th className="text-left p-4 font-medium text-gray-400">Slug</th>
            <th className="text-left p-4 font-medium text-gray-400">Status</th>
          </tr></thead>
          <tbody>
            {pages.map((p, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="p-4 text-white flex items-center gap-2"><FileText className="w-4 h-4 text-gray-500" />{p.title}</td>
                <td className="p-4 text-gray-400 font-mono text-xs">{p.slug}</td>
                <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs ${p.status === "published" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
