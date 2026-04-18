"use client";

import { useCraftStore } from "@/lib/store";
import { Image, Trash2 } from "lucide-react";

export function GenerationsView() {
  const { generations } = useCraftStore();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Generations</h1>
      <p className="text-gray-400 text-sm">{generations.length} total generations</p>
      {generations.length === 0 ? (
        <div className="craft-card text-center py-16"><Image className="w-12 h-12 text-gray-700 mx-auto mb-3" /><p className="text-gray-500 text-sm">No generations yet</p></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {generations.map((gen) => (
            <div key={gen.id} className="craft-card p-2">
              <img src={gen.url} alt={gen.prompt} className="w-full aspect-square rounded-lg object-cover mb-2" />
              <p className="text-xs text-gray-400 truncate">{gen.prompt}</p>
              <p className="text-[10px] text-gray-600 mt-1">{gen.settings.quality} | {gen.settings.aspectRatio} | {new Date(gen.timestamp).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
