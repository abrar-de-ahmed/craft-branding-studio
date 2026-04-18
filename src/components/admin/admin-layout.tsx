"use client";

import { useCraftStore, type AdminViewType } from "@/lib/store";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Image,
  DollarSign,
  UserPlus,
  FileText,
  Settings,
  AlertTriangle,
  Download,
  FileSearch,
  ToggleLeft,
  Megaphone,
  ArrowLeft,
} from "lucide-react";
import { AdminLogin } from "./admin-login";
import { DashboardView } from "./dashboard-view";
import { UsersView } from "./users-view";
import { TransactionsView } from "./transactions-view";
import { GenerationsView } from "./generations-view";
import { ApiCostsView } from "./api-costs-view";
import { ReferralsView } from "./referrals-view";
import { ContentView } from "./content-view";
import { SettingsView } from "./settings-view";
import { ErrorLogsView } from "./error-logs-view";
import { ExportView } from "./export-view";
import { AuditLogsView } from "./audit-logs-view";
import { FeatureFlagsView } from "./feature-flags-view";
import { AnnouncementsView } from "./announcements-view";

const adminNavItems: { icon: typeof LayoutDashboard; label: string; view: AdminViewType }[] = [
  { icon: LayoutDashboard, label: "Dashboard", view: "dashboard" },
  { icon: Users, label: "Users", view: "users" },
  { icon: Receipt, label: "Transactions", view: "transactions" },
  { icon: Image, label: "Generations", view: "generations" },
  { icon: DollarSign, label: "API Costs", view: "api-costs" },
  { icon: UserPlus, label: "Referrals", view: "referrals" },
  { icon: FileText, label: "Content", view: "content" },
  { icon: Settings, label: "Settings", view: "settings" },
  { icon: AlertTriangle, label: "Error Logs", view: "error-logs" },
  { icon: Download, label: "Export", view: "export" },
  { icon: FileSearch, label: "Audit Logs", view: "audit-logs" },
  { icon: ToggleLeft, label: "Feature Flags", view: "feature-flags" },
  { icon: Megaphone, label: "Announcements", view: "announcements" },
];

export function AdminLayout() {
  const { isAdmin, adminView, setAdminView, setAdmin } = useCraftStore();

  if (!isAdmin) return null;

  const renderView = () => {
    switch (adminView) {
      case "dashboard": return <DashboardView />;
      case "users": return <UsersView />;
      case "transactions": return <TransactionsView />;
      case "generations": return <GenerationsView />;
      case "api-costs": return <ApiCostsView />;
      case "referrals": return <ReferralsView />;
      case "content": return <ContentView />;
      case "settings": return <SettingsView />;
      case "error-logs": return <ErrorLogsView />;
      case "export": return <ExportView />;
      case "audit-logs": return <AuditLogsView />;
      case "feature-flags": return <FeatureFlagsView />;
      case "announcements": return <AnnouncementsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <>
      <AdminLogin />
      <div className="min-h-screen bg-black flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0a0a0a] border-r border-white/10 p-4 sticky top-0 h-screen overflow-y-auto">
          <div className="flex items-center gap-2 px-2 mb-6 mt-2">
            <div className="w-8 h-8 rounded-full bg-[#f0653a] flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <div>
              <span className="font-display font-bold text-sm block">Admin Panel</span>
              <span className="text-[10px] text-gray-500">Craft Studio</span>
            </div>
          </div>

          <nav className="flex-1 space-y-0.5">
            {adminNavItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setAdminView(item.view)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  adminView === item.view
                    ? "bg-[#f0653a]/10 text-[#f0653a]"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => { setAdmin(false); if (typeof window !== "undefined") window.location.href = "/"; }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-all mt-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-auto">{renderView()}</main>
      </div>
    </>
  );
}
