"use client";

import { Download, FileText, Database, Image as ImageIcon } from "lucide-react";

export function ExportView() {
  const handleExport = (type: string) => {
    const data = { exported: new Date().toISOString(), type };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `craft-export-${type}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportOptions = [
    { icon: Database, label: "Users Data", type: "users", desc: "Export all user accounts and profiles" },
    { icon: FileText, label: "Transactions", type: "transactions", desc: "Export all transaction records" },
    { icon: ImageIcon, label: "Generations", type: "generations", desc: "Export generation history (metadata only)" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Export Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {exportOptions.map((opt) => (
          <div key={opt.type} className="craft-card craft-card-hover">
            <opt.icon className="w-8 h-8 text-[#f0653a] mb-3" />
            <h3 className="font-display font-semibold mb-1">{opt.label}</h3>
            <p className="text-xs text-gray-500 mb-4">{opt.desc}</p>
            <button onClick={() => handleExport(opt.type)} className="craft-btn w-full py-2 text-sm">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
