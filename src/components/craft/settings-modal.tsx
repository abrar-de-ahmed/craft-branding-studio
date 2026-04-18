"use client";

import { useCraftStore } from "@/lib/store";
import { X, Key, Save, User, Bell, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SettingsModal() {
  const { showModal, openModal, apiKey, isDemo, setApiKey, user } = useCraftStore();
  const [keyInput, setKeyInput] = useState(apiKey);

  if (showModal !== "settings") return null;

  const handleSaveKey = () => {
    setApiKey(keyInput.trim());
    toast.success(keyInput.trim().length > 10 ? "API key saved! Real mode enabled." : "Demo mode active. Enter a real API key for real generations.");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => openModal(null)}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold">Settings</h2>
          <button onClick={() => openModal(null)} className="p-1 rounded-lg hover:bg-white/5">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a1a] mb-4">
          <div className="w-10 h-10 rounded-full bg-[#f0653a] flex items-center justify-center">
            <span className="text-white font-bold">{user?.name?.[0]?.toUpperCase() || "U"}</span>
          </div>
          <div>
            <div className="text-sm font-medium">{user?.name || "User"}</div>
            <div className="text-xs text-gray-500">{user?.email || "user@example.com"}</div>
          </div>
        </div>

        {/* API Key */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Key className="w-4 h-4 text-[#f0653a]" /> API Key
          </label>
          <input
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter your API key for real generations"
            type="password"
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50"
          />
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs ${isDemo ? "text-[#fbbf24]" : "text-green-400"}`}>
              {isDemo ? "Demo Mode" : "Real Mode"}
            </span>
            <button onClick={handleSaveKey} className="craft-btn px-4 py-1.5 text-xs">
              <Save className="w-3 h-3" /> Save
            </button>
          </div>
        </div>

        {/* Notification (placeholder) */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#1a1a1a] mb-4">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Email Notifications</span>
          </div>
          <div className="w-10 h-6 rounded-full bg-[#333] relative cursor-not-allowed">
            <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
