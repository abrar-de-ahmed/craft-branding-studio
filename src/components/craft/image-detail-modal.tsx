"use client";

import { useCraftStore } from "@/lib/store";
import { X, Download, Trash2 } from "lucide-react";

export function ImageDetailModal() {
  const { selectedImageId, generations, setSelectedImage, deleteGeneration } = useCraftStore();

  if (!selectedImageId) return null;
  const gen = generations.find((g) => g.id === selectedImageId);
  if (!gen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src={gen.url} alt={gen.prompt} className="w-full rounded-t-2xl" />
          <button onClick={() => setSelectedImage(null)} className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-white text-sm">{gen.prompt}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <span className="px-2 py-1 rounded bg-white/5">{gen.settings.aspectRatio}</span>
            <span className="px-2 py-1 rounded bg-white/5">{gen.settings.quality}</span>
            <span className="px-2 py-1 rounded bg-white/5">{gen.settings.style}</span>
            {gen.transparent && <span className="px-2 py-1 rounded bg-white/5">Transparent</span>}
          </div>
          <div className="flex gap-3">
            <a href={gen.url} target="_blank" download className="craft-btn flex-1 py-2.5 text-sm justify-center">
              <Download className="w-4 h-4" /> Download
            </a>
            <button onClick={() => { deleteGeneration(gen.id); setSelectedImage(null); }} className="craft-btn-outline flex-1 py-2.5 text-sm text-red-400 border-red-400/20 hover:bg-red-400/10">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
