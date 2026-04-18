"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface FeatureFlag { id: string; name: string; description: string; enabled: boolean; }

export function FeatureFlagsView() {
  const [flags, setFlags] = useState<FeatureFlag[]>([
    { id: "1", name: "Transparent BG", description: "Allow users to generate images with transparent backgrounds", enabled: true },
    { id: "2", name: "Character Reference", description: "Enable character consistency across generations", enabled: true },
    { id: "3", name: "4x Upscale", description: "Allow 4x upscaling of generated images", enabled: false },
    { id: "4", name: "Referral System", description: "Enable referral program with bonus credits", enabled: true },
    { id: "5", name: "Google OAuth", description: "Allow sign-in with Google account", enabled: true },
    { id: "6", name: "Bulk Generation", description: "Allow generating multiple images at once", enabled: false },
  ]);

  const toggleFlag = (id: string) => {
    setFlags((prev) => prev.map((f) => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Feature Flags</h1>
        <button onClick={() => toast.success("Feature flags saved")} className="craft-btn text-sm px-4 py-2"><Save className="w-4 h-4" /> Save All</button>
      </div>
      <div className="space-y-3">
        {flags.map((flag) => (
          <div key={flag.id} className="craft-card flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm">{flag.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{flag.description}</p>
            </div>
            <button onClick={() => toggleFlag(flag.id)} className={`w-12 h-6 rounded-full transition-colors relative ${flag.enabled ? "bg-[#f0653a]" : "bg-[#333]"}`}>
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${flag.enabled ? "translate-x-7" : "translate-x-1"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
