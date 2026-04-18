"use client";

import { useState } from "react";
import { useCraftStore } from "@/lib/store";
import { toast } from "sonner";
import { Wand2, Download, RotateCcw, Loader2, Sparkles } from "lucide-react";

const aspectRatios = [
  { label: "1:1", value: "1:1", desc: "Square" },
  { label: "16:9", value: "16:9", desc: "Landscape" },
  { label: "9:16", value: "9:16", desc: "Portrait" },
  { label: "4:3", value: "4:3", desc: "Classic" },
  { label: "3:4", value: "3:4", desc: "Tall" },
];

const qualityOptions = [
  { label: "Turbo", value: "turbo", credits: 1, desc: "Fast, good quality" },
  { label: "Default", value: "default", credits: 2, desc: "Balanced" },
  { label: "Quality", value: "quality", credits: 3, desc: "Best quality" },
];

const styleOptions = [
  "Photorealistic",
  "Illustration",
  "Minimalist",
  "3D Render",
  "Flat Design",
  "Watercolor",
  "Pixel Art",
  "Abstract",
  "Vintage",
  "Neon",
  "Anime",
  "Corporate",
];

export function CreateView() {
  const { credits, addGeneration, isDemo, apiKey, generations } = useCraftStore();
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quality, setQuality] = useState("default");
  const [style, setStyle] = useState("Photorealistic");
  const [transparent, setTransparent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const totalCredits = (qualityOptions.find((q) => q.value === quality)?.credits || 2) + (transparent ? 1 : 0);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    if (credits < totalCredits) {
      toast.error(`Not enough credits. You need ${totalCredits}, have ${credits}`);
      return;
    }

    setLoading(true);
    setResultUrl(null);

    const success = useCraftStore.getState().useCredits(totalCredits);
    if (!success) {
      setLoading(false);
      toast.error("Failed to deduct credits");
      return;
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          settings: { aspectRatio, quality, style },
          apiKey,
          transparent,
        }),
      });
      const data = await res.json();

      if (data.url) {
        setResultUrl(data.url);
        addGeneration({
          prompt: prompt.trim(),
          url: data.url,
          settings: { aspectRatio, quality, style },
          transparent,
        });
        toast.success("Image generated!");
      } else {
        toast.error(data.error || "Generation failed");
        // Refund credits
        useCraftStore.getState().addCredits(totalCredits, "Refund - generation failed");
      }
    } catch {
      toast.error("Network error. Please try again.");
      useCraftStore.getState().addCredits(totalCredits, "Refund - network error");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Create</h1>
        <p className="text-gray-400 text-sm">Describe your brand asset and let AI bring it to life</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Controls */}
        <div className="lg:col-span-2 space-y-4">
          {/* Prompt */}
          <div className="craft-card">
            <label className="text-sm font-medium text-gray-300 mb-2 block">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A modern minimalist logo for a coffee shop called 'Brew & Co', featuring a coffee cup icon..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0653a]/50 resize-none h-32 transition-colors"
            />
          </div>

          {/* Aspect Ratio */}
          <div className="craft-card">
            <label className="text-sm font-medium text-gray-300 mb-3 block">Aspect Ratio</label>
            <div className="grid grid-cols-5 gap-2">
              {aspectRatios.map((ar) => (
                <button
                  key={ar.value}
                  onClick={() => setAspectRatio(ar.value)}
                  className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                    aspectRatio === ar.value
                      ? "bg-[#f0653a] text-white"
                      : "bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/5"
                  }`}
                >
                  {ar.label}
                  <span className="block text-[10px] opacity-70 mt-0.5">{ar.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div className="craft-card">
            <label className="text-sm font-medium text-gray-300 mb-3 block">Quality</label>
            <div className="grid grid-cols-3 gap-2">
              {qualityOptions.map((q) => (
                <button
                  key={q.value}
                  onClick={() => setQuality(q.value)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                    quality === q.value
                      ? "bg-[#f0653a] text-white"
                      : "bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/5"
                  }`}
                >
                  {q.label}
                  <span className="block text-[10px] opacity-70 mt-0.5">{q.credits} cr</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="craft-card">
            <label className="text-sm font-medium text-gray-300 mb-3 block">Style</label>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    style === s
                      ? "bg-[#f0653a]/20 text-[#f0653a] border border-[#f0653a]/30"
                      : "bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="craft-card">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`w-10 h-6 rounded-full transition-colors relative ${transparent ? "bg-[#f0653a]" : "bg-[#333]"}`}
                onClick={() => setTransparent(!transparent)}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${transparent ? "translate-x-5" : "translate-x-1"}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-300">Transparent Background</div>
                <div className="text-xs text-gray-500">+1 credit per generation</div>
              </div>
            </label>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="craft-btn w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate ({totalCredits} cr)
              </>
            )}
          </button>

          {/* Credits Info */}
          <div className="text-center text-xs text-gray-500">
            {credits} credits remaining {isDemo && <span className="text-[#fbbf24]">(Demo Mode)</span>}
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-3">
          <div className="craft-card min-h-[400px] flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-[#f0653a] animate-spin mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Creating your design...</p>
                <p className="text-gray-600 text-xs mt-1">This usually takes 2-5 seconds</p>
              </div>
            ) : resultUrl ? (
              <div className="w-full">
                <img src={resultUrl} alt="Generated" className="w-full rounded-xl" />
                <div className="flex gap-2 mt-4">
                  <a
                    href={resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="craft-btn flex-1 py-2.5 text-sm"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                  <button onClick={() => { setResultUrl(null); setPrompt(""); }} className="craft-btn-outline flex-1 py-2.5 text-sm">
                    <RotateCcw className="w-4 h-4" /> New
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center px-8">
                <Sparkles className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Your generated image will appear here</p>
                <p className="text-gray-700 text-xs mt-1">Write a prompt and click Generate</p>
              </div>
            )}
          </div>

          {/* Recent Generations */}
          {generations.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-sm font-semibold text-gray-300 mb-3">Recent Generations</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {generations.slice(0, 8).map((gen) => (
                  <div
                    key={gen.id}
                    className="aspect-square rounded-xl overflow-hidden bg-[#111] border border-white/5 cursor-pointer hover:border-[#f0653a]/30 transition-colors"
                    onClick={() => setResultUrl(gen.url)}
                  >
                    <img src={gen.url} alt={gen.prompt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
