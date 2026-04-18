import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  name: string;
}

export interface Transaction {
  id: string;
  type: "purchase" | "usage" | "referral";
  amount: number;
  credits: number;
  description: string;
  timestamp: number;
}

export interface Generation {
  id: string;
  prompt: string;
  url: string;
  settings: {
    aspectRatio: string;
    quality: string;
    style: string;
  };
  timestamp: number;
  transparent?: boolean;
}

export type ViewType = "qs" | "create" | "gallery" | "styles" | "credits" | "refer" | "settings";
export type AdminViewType =
  | "dashboard"
  | "users"
  | "transactions"
  | "generations"
  | "api-costs"
  | "referrals"
  | "content"
  | "settings"
  | "error-logs"
  | "export"
  | "audit-logs"
  | "feature-flags"
  | "announcements";

interface CraftStore {
  user: User | null;
  credits: number;
  transactions: Transaction[];
  generations: Generation[];
  apiKey: string;
  isDemo: boolean;
  referralCode: string;
  referredBy: string;
  currentView: ViewType;
  showModal: string | null;
  selectedImageId: string | null;
  isAdmin: boolean;
  adminView: AdminViewType;

  // Actions
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  googleLogin: () => void;
  logout: () => void;
  setView: (view: ViewType) => void;
  openModal: (modal: string | null) => void;
  addCredits: (amount: number, description: string) => void;
  useCredits: (amount: number) => boolean;
  setApiKey: (key: string) => void;
  addGeneration: (gen: Omit<Generation, "id" | "timestamp">) => void;
  deleteGeneration: (id: string) => void;
  setSelectedImage: (id: string | null) => void;
  setReferredBy: (code: string) => void;
  setAdmin: (val: boolean) => void;
  setAdminView: (view: AdminViewType) => void;
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function generateReferralCode(): string {
  return "CRAFT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const useCraftStore = create<CraftStore>()(
  persist(
    (set, get) => ({
      user: null,
      credits: 0,
      transactions: [],
      generations: [],
      apiKey: "",
      isDemo: true,
      referralCode: "",
      referredBy: "",
      currentView: "qs",
      showModal: null,
      selectedImageId: null,
      isAdmin: false,
      adminView: "dashboard",

      login: (email: string, _password: string) => {
        const name = email.split("@")[0];
        set({
          user: { email, name },
          credits: get().credits || 50,
          referralCode: get().referralCode || generateReferralCode(),
        });
        return true;
      },

      signup: (name: string, email: string, _password: string) => {
        set({
          user: { email, name },
          credits: 50,
          referralCode: generateReferralCode(),
          transactions: [
            {
              id: generateId(),
              type: "purchase",
              amount: 0,
              credits: 50,
              description: "Welcome bonus - 50 free credits",
              timestamp: Date.now(),
            },
          ],
        });
        return true;
      },

      googleLogin: () => {
        const email = "user@gmail.com";
        set({
          user: { email, name: "Google User" },
          credits: get().credits || 50,
          referralCode: get().referralCode || generateReferralCode(),
        });
      },

      logout: () => {
        set({
          user: null,
          isAdmin: false,
          adminView: "dashboard",
          currentView: "qs",
        });
      },

      setView: (view) => set({ currentView: view }),

      openModal: (modal) => set({ showModal: modal }),

      addCredits: (amount, description) => {
        const tx: Transaction = {
          id: generateId(),
          type: "purchase",
          amount: amount > 0 ? amount : 0,
          credits: amount === 50 ? 50 : amount === 200 ? 200 : amount === 500 ? 500 : amount === 1000 ? 1000 : amount,
          description,
          timestamp: Date.now(),
        };
        set((s) => ({
          credits: s.credits + tx.credits,
          transactions: [...s.transactions, tx],
        }));
      },

      useCredits: (amount) => {
        const { credits } = get();
        if (credits < amount) return false;
        set((s) => ({
          credits: s.credits - amount,
          transactions: [
            ...s.transactions,
            {
              id: generateId(),
              type: "usage",
              amount: 0,
              credits: -amount,
              description: `Used ${amount} credit(s)`,
              timestamp: Date.now(),
            },
          ],
        }));
        return true;
      },

      setApiKey: (key) =>
        set({ apiKey: key, isDemo: key.length <= 10 }),

      addGeneration: (gen) => {
        const newGen: Generation = {
          ...gen,
          id: generateId(),
          timestamp: Date.now(),
        };
        set((s) => ({
          generations: [newGen, ...s.generations],
        }));
      },

      deleteGeneration: (id) =>
        set((s) => ({
          generations: s.generations.filter((g) => g.id !== id),
        })),

      setSelectedImage: (id) => set({ selectedImageId: id }),

      setReferredBy: (code) => set({ referredBy: code }),

      setAdmin: (val) => set({ isAdmin: val, adminView: "dashboard" }),

      setAdminView: (view) => set({ adminView: view }),
    }),
    {
      name: "craft-storage",
      partialize: (state) => ({
        user: state.user,
        credits: state.credits,
        transactions: state.transactions,
        generations: state.generations,
        apiKey: state.apiKey,
        isDemo: state.isDemo,
        referralCode: state.referralCode,
        referredBy: state.referredBy,
        currentView: state.currentView,
      }),
    }
  )
);
