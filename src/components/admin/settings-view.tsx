"use client";

import { useState } from "react";
import { Settings, Save, Globe, CreditCard, Shield } from "lucide-react";
import { toast } from "sonner";

export function SettingsView() {
  const [siteName, setSiteName] = useState("Craft AI Branding Studio");
  const [siteUrl, setSiteUrl] = useState("craftstudio.com");
  const [stripeKey, setStripeKey] = useState("");
  const [authKey, setAuthKey] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Settings</h1>

      <div className="craft-card space-y-4">
        <h3 className="font-display font-semibold flex items-center gap-2"><Globe className="w-5 h-5 text-[#f0653a]" /> General</h3>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Site Name</label>
          <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f0653a]/50" />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Site URL</label>
          <input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f0653a]/50" />
        </div>
        <button onClick={() => toast.success("Settings saved")} className="craft-btn px-4 py-2 text-sm"><Save className="w-4 h-4" /> Save</button>
      </div>

      <div className="craft-card space-y-4">
        <h3 className="font-display font-semibold flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#fbbf24]" /> Payment</h3>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Stripe Secret Key</label>
          <input value={stripeKey} onChange={(e) => setStripeKey(e.target.value)} type="password" placeholder="sk_live_..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50" />
        </div>
        <p className="text-xs text-gray-600">UI placeholder only. No real payment processing configured.</p>
      </div>

      <div className="craft-card space-y-4">
        <h3 className="font-display font-semibold flex items-center gap-2"><Shield className="w-5 h-5 text-green-400" /> Security</h3>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Authorization.net Key</label>
          <input value={authKey} onChange={(e) => setAuthKey(e.target.value)} type="password" placeholder="Enter key..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50" />
        </div>
      </div>
    </div>
  );
}
