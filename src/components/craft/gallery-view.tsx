"use client";

import { useCraftStore } from "@/lib/store";
import { useState } from "react";
import { Image, Trash2, Download, Clock, Search } from "lucide-react";

export function GalleryView() {
  const { generations, deleteGeneration } = useCraftStore();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = generations.filter((g) =>
    g.prompt.toLowerCase().includes(search.toLowerCase())
  );

  const selected = generations.find((g) => g.id === selectedId);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Gallery</h1>
          <p className="text-gray-400 text-sm">{generations.length} designs created</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search designs..."
            className="bg-[#111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50 w-full sm:w-64 transition-colors"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="craft-card text-center py-20">
          <Image className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">
            {generations.length === 0 ? "No designs yet. Create your first one!" : "No matching designs found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((gen) => (
            <div
              key={gen.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#111] border border-white/5 cursor-pointer hover:border-[#f0653a]/30 transition-all"
              onClick={() => setSelectedId(gen.id)}
            >
              <img src={gen.url} alt={gen.prompt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end opacity-0 group-hover:opacity-100">
                <div className="p-3 w-full">
                  <p className="text-white text-xs truncate mb-2">{gen.prompt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-[10px]">{gen.settings.aspectRatio}</span>
                    <div className="flex gap-1">
                      <a
                        href={gen.url}
                        target="_blank"
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Download className="w-3 h-3 text-white" />
                      </a>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteGeneration(gen.id); }}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedId(null)}>
          <div className="bg-[#111] rounded-2xl border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img src={selected.url} alt={selected.prompt} className="w-full" />
            <div className="p-6 space-y-3">
              <p className="text-white text-sm">{selected.prompt}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="px-2 py-1 rounded bg-white/5">{selected.settings.aspectRatio}</span>
                <span className="px-2 py-1 rounded bg-white/5">{selected.settings.quality}</span>
                <span className="px-2 py-1 rounded bg-white/5">{selected.settings.style}</span>
                <span className="px-2 py-1 rounded bg-white/5 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(selected.timestamp).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-3">
                <a href={selected.url} target="_blank" download className="craft-btn flex-1 py-2.5 text-sm justify-center">
                  <Download className="w-4 h-4" /> Download
                </a>
                <button onClick={() => setSelectedId(null)} className="craft-btn-outline flex-1 py-2.5 text-sm">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
