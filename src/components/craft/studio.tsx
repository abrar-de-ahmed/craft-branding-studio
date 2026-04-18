"use client";

import { useCraftStore, type ViewType } from "@/lib/store";
import { CreateView } from "./create-view";
import { GalleryView } from "./gallery-view";
import { StylesView } from "./styles-view";
import { CreditsView } from "./credits-view";
import { HomeView } from "./home-view";
import { ReferView } from "./refer-view";
import {
  Home,
  Wand2,
  Image,
  Palette,
  Coins,
  Settings,
  LogOut,
  Gift,
} from "lucide-react";

const navItems: { icon: typeof Home; label: string; view: ViewType }[] = [
  { icon: Home, label: "Home", view: "create" },
  { icon: Wand2, label: "Create", view: "create" },
  { icon: Image, label: "Gallery", view: "gallery" },
  { icon: Palette, label: "Styles", view: "styles" },
  { icon: Coins, label: "Credits", view: "credits" },
  { icon: Gift, label: "Refer", view: "refer" },
];

export function Studio() {
  const { user, credits, currentView, setView, logout, openModal } = useCraftStore();

  const renderView = () => {
    switch (currentView) {
      case "create":
        return <CreateView />;
      case "gallery":
        return <GalleryView />;
      case "styles":
        return <StylesView />;
      case "credits":
        return <CreditsView />;
      case "refer":
        return <ReferView />;
      case "settings":
        return null; // handled by modal
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0a0a0a] border-r border-white/10 p-4 sticky top-0 h-screen">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-8 mt-2">
          <div className="w-8 h-8 rounded-full bg-[#f0653a] flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-display font-bold text-lg">Craft</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label + item.view}
              onClick={() => setView(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentView === item.view
                  ? "bg-[#f0653a]/10 text-[#f0653a] border border-[#f0653a]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
          <button
            onClick={() => openModal("settings")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
          <div className="px-3 py-3">
            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
            <div className="flex items-center gap-1 mt-1">
              <Coins className="w-3 h-3 text-[#fbbf24]" />
              <span className="text-xs font-medium text-[#fbbf24]">{credits} credits</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#f0653a] flex items-center justify-center">
            <span className="text-white font-bold text-xs">C</span>
          </div>
          <span className="font-display font-bold text-sm">Craft</span>
        </div>
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-[#fbbf24]" />
          <span className="text-xs font-medium text-[#fbbf24]">{credits}</span>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 h-16 flex items-center justify-around px-2">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.label + item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
              currentView === item.view ? "text-[#f0653a]" : "text-gray-500"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:p-6 p-4 pt-20 lg:pt-6 pb-24 lg:pb-6 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}
