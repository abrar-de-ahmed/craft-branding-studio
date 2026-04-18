"use client";

import { useState } from "react";
import { Megaphone, Plus, Save, Clock, Eye } from "lucide-react";
import { toast } from "sonner";

export function AnnouncementsView() {
  const [announcements, setAnnouncements] = useState([
    { id: "1", title: "Welcome to Craft!", message: "We're excited to launch Craft AI Branding Studio. Start creating stunning brand assets today with 50 free credits.", date: "2026-04-01", active: true },
    { id: "2", title: "New: Transparent Backgrounds", message: "You can now generate images with transparent backgrounds. Just enable the option before generating.", date: "2026-04-10", active: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Announcements</h1>
        <button className="craft-btn text-sm px-4 py-2"><Plus className="w-4 h-4" /> New</button>
      </div>
      <div className="space-y-4">
        {announcements.map((a) => (
          <div key={a.id} className="craft-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold flex items-center gap-2"><Megaphone className="w-4 h-4 text-[#f0653a]" />{a.title}</h3>
              <span className={`px-2 py-0.5 rounded text-xs ${a.active ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}>{a.active ? "Active" : "Inactive"}</span>
            </div>
            <p className="text-sm text-gray-400">{a.message}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
