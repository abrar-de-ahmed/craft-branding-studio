"use client";

import { useCraftStore } from "@/lib/store";
import { Palette, Plus } from "lucide-react";

interface BrandStyle {
  id: string;
  name: string;
  colors: string[];
  fonts: string[];
  notes: string;
}

export function StylesView() {
  const { generations } = useCraftStore();

  const sampleStyles: BrandStyle[] = [
    { id: "1", name: "My Brand", colors: ["#f0653a", "#fbbf24", "#000000"], fonts: ["Space Grotesk", "DM Sans"], notes: "Bold, modern, energetic" },
    { id: "2", name: "Minimal Clean", colors: ["#ffffff", "#333333", "#f0653a"], fonts: ["Inter", "Helvetica"], notes: "Clean, minimal, corporate" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Brand Styles</h1>
          <p className="text-gray-400 text-sm">Manage your brand guidelines and style presets</p>
        </div>
        <button className="craft-btn text-sm px-4 py-2">
          <Plus className="w-4 h-4" /> New Style
        </button>
      </div>

      {sampleStyles.map((style) => (
        <div key={style.id} className="craft-card craft-card-hover">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-[#f0653a]" />
            <h3 className="font-display font-bold text-lg">{style.name}</h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {style.colors.map((color) => (
              <div key={color} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-400 font-mono">{color}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {style.fonts.map((font) => (
              <span key={font} className="px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-300">{font}</span>
            ))}
          </div>
          <p className="text-sm text-gray-500">{style.notes}</p>
        </div>
      ))}

      {/* Recent as reference */}
      {generations.length > 0 && (
        <div className="craft-card">
          <h3 className="font-display font-semibold text-sm text-gray-300 mb-3">Your Recent Designs for Reference</h3>
          <div className="grid grid-cols-4 gap-3">
            {generations.slice(0, 4).map((gen) => (
              <div key={gen.id} className="aspect-square rounded-lg overflow-hidden border border-white/5">
                <img src={gen.url} alt={gen.prompt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
