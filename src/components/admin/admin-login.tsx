"use client";

import { useCraftStore } from "@/lib/store";
import { useState } from "react";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "admin123";

export function AdminLogin() {
  const { isAdmin, setAdmin } = useCraftStore();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (isAdmin) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdmin(true);
      toast.success("Admin access granted");
      setPassword("");
    } else {
      setError(true);
      toast.error("Incorrect password");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-sm w-full p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f0653a]/10 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-[#f0653a]" />
        </div>
        <h2 className="font-display text-xl font-bold mb-2">Admin Access</h2>
        <p className="text-gray-400 text-sm mb-6">Enter the admin password to continue</p>

        <form onSubmit={handleLogin} className="space-y-3">
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className={`w-full bg-[#1a1a1a] border rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none ${error ? "border-red-500/50" : "border-white/10 focus:border-[#f0653a]/50"}`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button type="submit" className="craft-btn w-full py-3 text-sm">
            <Shield className="w-4 h-4" /> Access Admin Panel
          </button>
        </form>

        <button
          onClick={() => { if (typeof window !== "undefined") window.location.href = "/"; }}
          className="text-xs text-gray-500 hover:text-gray-300 mt-4 inline-block"
        >
          Back to site
        </button>
      </div>
    </div>
  );
}
