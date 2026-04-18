"use client";

import { useCraftStore } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Download, ArrowLeft, Wand2 } from "lucide-react";

export function EditView() {
  const { selectedImageId, generations, addGeneration, setSelectedImage, apiKey, credits, setView } = useCraftStore();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const gen = generations.find((g) => g.id === selectedImageId);

  const handleRemix = async () => {
    if (!prompt.trim()) { toast.error("Enter edit instructions"); return; }
    if (credits < 1) { toast.error("Not enough credits"); return; }

    setLoading(true);
    useCraftStore.getState().useCredits(1);

    try {
      const editPrompt = gen ? `${gen.prompt}. Modify: ${prompt.trim()}` : prompt.trim();
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: editPrompt, settings: { aspectRatio: gen?.settings.aspectRatio || "1:1", quality: "turbo", style: gen?.settings.style || "Photorealistic" }, apiKey }),
      });
      const data = await res.json();
      if (data.url) {
        setResultUrl(data.url);
        addGeneration({ prompt: editPrompt, url: data.url, settings: { aspectRatio: gen?.settings.aspectRatio || "1:1", quality: "turbo", style: gen?.settings.style || "Photorealistic" } });
        toast.success("Remix complete!");
      } else {
        toast.error(data.error || "Remix failed");
        useCraftStore.getState().addCredits(1, "Refund - remix failed");
      }
    } catch {
      toast.error("Network error");
      useCraftStore.getState().addCredits(1, "Refund - error");
    }
    setLoading(false);
  };

  if (!gen) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-gray-500">No image selected for editing</p>
        <button onClick={() => setView("gallery")} className="craft-btn mt-4 text-sm px-6 py-2">
          <ArrowLeft className="w-4 h-4" /> Go to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => { setSelectedImage(null); setView("gallery"); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Gallery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="craft-card">
          <h3 className="font-display font-semibold text-sm mb-3">Original</h3>
          <img src={gen.url} alt="Original" className="w-full rounded-xl" />
        </div>
        <div className="craft-card min-h-[300px] flex items-center justify-center">
          {loading ? (
            <div className="text-center"><Loader2 className="w-10 h-10 text-[#f0653a] animate-spin mx-auto mb-3" /><p className="text-gray-400 text-sm">Remixing...</p></div>
          ) : resultUrl ? (
            <div className="w-full">
              <h3 className="font-display font-semibold text-sm mb-3">Remixed</h3>
              <img src={resultUrl} alt="Remixed" className="w-full rounded-xl" />
            </div>
          ) : (
            <div className="text-center px-8">
              <Wand2 className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Remix result will appear here</p>
            </div>
          )}
        </div>
      </div>

      <div className="craft-card">
        <label className="text-sm font-medium text-gray-300 mb-2 block">Edit Instructions</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Make the background blue, add text 'Hello World', change to dark theme..."
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50 resize-none h-24"
        />
        <div className="flex gap-3 mt-3">
          <button onClick={handleRemix} disabled={loading || !prompt.trim()} className="craft-btn flex-1 py-2.5 text-sm disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            Remix (1 cr)
          </button>
        </div>
      </div>
    </div>
  );
}
