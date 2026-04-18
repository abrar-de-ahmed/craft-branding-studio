"use client";

import { useEffect, useState } from "react";
import { useCraftStore } from "@/lib/store";
import { Landing } from "@/components/craft/landing";
import { Studio } from "@/components/craft/studio";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AuthModals } from "@/components/craft/auth-modals";
import { AddCreditsModal } from "@/components/craft/add-credits-modal";
import { ImageDetailModal } from "@/components/craft/image-detail-modal";
import { SettingsModal } from "@/components/craft/settings-modal";

export default function Home() {
  const {
    user,
    currentView,
    showModal,
    isAdmin,
    setAdmin,
    setView,
    setReferredBy,
  } = useCraftStore();

  const [hydrated, setHydrated] = useState(false);

  // ALL useEffects must be BEFORE the early return
  useEffect(() => {
    useCraftStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  // Check URL params for admin, referral
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true") {
        setAdmin(true);
      }
      const ref = params.get("ref");
      if (ref) {
        setReferredBy(ref);
      }
    }
  }, [setAdmin, setReferredBy]);

  // Auto-redirect logged-in users to create view
  useEffect(() => {
    if (hydrated && user && currentView === "qs") {
      setView("create");
    }
  }, [hydrated, user, currentView, setView]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#f0653a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Admin flow
  if (isAdmin) {
    return (
      <>
        <AdminLogin />
        <AdminLayout />
      </>
    );
  }

  // Logged in → Studio
  if (user && currentView !== "qs") {
    return (
      <>
        <Studio />
        <AuthModals />
        <AddCreditsModal />
        <ImageDetailModal />
        <SettingsModal />
      </>
    );
  }

  // Not logged in → Landing page
  return (
    <>
      <Landing />
      <AuthModals />
      <AddCreditsModal />
    </>
  );
}
