"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCraftStore } from "@/lib/store";
import { faqItems } from "@/lib/admin-data";
import {
  Sparkles,
  Zap,
  Palette,
  Image,
  Layers,
  Star,
  ArrowRight,
  ChevronDown,
  Wand2,
  Globe,
  Shield,
  Clock,
  Users,
  TrendingUp,
  CreditCard,
  Check,
} from "lucide-react";

// ─── Animations ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export function Landing() {
  const { openModal } = useCraftStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ═══════════ HEADER ═══════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f0653a] flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-display font-bold text-lg">Craft</span>
          </div>

          {/* Center Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-sm text-gray-400 hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection("pricing")} className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</button>
            <button onClick={() => scrollToSection("faq")} className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</button>
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => openModal("login")} className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2">Log in</button>
            <button onClick={() => openModal("signup")} className="craft-btn text-sm px-5 py-2">Get Started</button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass border-t border-white/10 px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection("features")} className="block text-sm text-gray-400 hover:text-white">Features</button>
            <button onClick={() => scrollToSection("pricing")} className="block text-sm text-gray-400 hover:text-white">Pricing</button>
            <button onClick={() => scrollToSection("faq")} className="block text-sm text-gray-400 hover:text-white">FAQ</button>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { openModal("login"); setMobileMenuOpen(false); }} className="text-sm text-gray-300 hover:text-white px-4 py-2">Log in</button>
              <button onClick={() => { openModal("signup"); setMobileMenuOpen(false); }} className="craft-btn text-sm px-5 py-2">Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-[#f0653a]" />
              <span className="text-sm text-gray-300">AI-Powered Branding Studio</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Craft your brand.
              <br />
              <span style={{ color: "#f0653a" }}>Not your bill.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 mb-8">
              Professional logos, posters, social media graphics — powered by AI. Starting at just $2.50.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button onClick={() => openModal("signup")} className="craft-btn text-base px-8 py-3">
                Start Creating <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection("features")} className="craft-btn-outline text-base px-8 py-3">
                See Features
              </button>
            </motion.div>
          </motion.div>

          {/* Right Product Card */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-sm">
              {/* Gradient Card */}
              <div className="rounded-3xl p-8 flex flex-col items-center justify-center text-center" style={{ background: "linear-gradient(135deg, #f0653a, #fbbf24)", minHeight: "320px" }}>
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">AI Branding</h3>
                <p className="text-white/80 text-sm">Logo - Poster - Social</p>
              </div>
              {/* Badges */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#1a1a1a] text-white text-xs font-medium border border-white/10">
                From $2.50
              </div>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-[#1a1a1a] text-white text-xs font-medium border border-white/10">
                Credits from 50 cr
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ LIVE STATS BAR ═══════════ */}
      <StatsBar />

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">How It Works</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Three simple steps to create professional brand assets with AI</motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Wand2, step: "01", title: "Describe Your Vision", desc: "Type a prompt describing your logo, poster, or social media graphic. Be as detailed or creative as you want." },
              { icon: Zap, step: "02", title: "AI Generates", desc: "Our advanced AI model creates multiple high-quality designs based on your description in seconds." },
              { icon: Image, step: "03", title: "Download & Use", desc: "Choose your favorite design, customize it further if needed, and download it for commercial use." },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeUp} className="craft-card craft-card-hover text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f0653a]/20 to-[#fbbf24]/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[#f0653a]" />
                </div>
                <span className="text-xs font-bold text-[#f0653a] uppercase tracking-widest">{item.step}</span>
                <h3 className="font-display text-xl font-bold mt-2 mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════ FEATURES GRID ═══════════ */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">Powerful Features</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Everything you need to create stunning brand assets</motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: "Logo Design", desc: "Create unique, professional logos for your brand. Multiple styles and variations to choose from." },
              { icon: Image, title: "Poster Maker", desc: "Design eye-catching posters for events, promotions, and marketing campaigns instantly." },
              { icon: Globe, title: "Social Media", desc: "Generate perfectly sized graphics for Instagram, Facebook, Twitter, LinkedIn, and more." },
              { icon: Layers, title: "Multiple Styles", desc: "Choose from photorealistic, illustrative, minimalist, and other art styles for your designs." },
              { icon: Shield, title: "Commercial License", desc: "Full commercial rights included with every generation. Use designs for any business purpose." },
              { icon: Clock, title: "Instant Results", desc: "Get professional designs in seconds, not hours. No design experience needed." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="craft-card craft-card-hover">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0653a]/20 to-[#fbbf24]/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#f0653a]" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════ PRICING SECTION ═══════════ */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">Simple Pricing</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Pay-as-you-go credit packs. No subscription required.</motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Starter", price: "$2.50", credits: 50, popular: false, features: ["50 generation credits", "All aspect ratios", "Multiple styles", "Commercial license"] },
              { name: "Standard", price: "$10", credits: 200, popular: false, features: ["200 generation credits", "All aspect ratios", "All quality modes", "Priority support"] },
              { name: "Popular", price: "$25", credits: 500, popular: true, features: ["500 generation credits", "All aspect ratios", "Transparent BG", "Character reference", "Priority generation"] },
              { name: "Business", price: "$50", credits: 1000, popular: false, features: ["1,000 generation credits", "Everything in Popular", "4x Upscale", "Dedicated support", "API access"] },
            ].map((pack, i) => (
              <motion.div key={i} variants={fadeUp} className={`craft-card craft-card-hover relative ${pack.popular ? "border-[#f0653a]/50" : ""}`}>
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #f0653a, #fbbf24)" }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-display text-lg font-bold mb-1">{pack.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-display font-bold">{pack.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{pack.credits} credits</p>
                <button onClick={() => openModal("signup")} className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${pack.popular ? "craft-btn" : "craft-btn-outline"}`}>
                  Get Started
                </button>
                <ul className="mt-6 space-y-3">
                  {pack.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════ FAQ SECTION ═══════════ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">Frequently Asked Questions</motion.h2>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════ WHY CRAFT? COMPARISON ═══════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">Why Craft?</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center mb-12 max-w-xl mx-auto">See how Craft stacks up against the competition</motion.p>

          <motion.div variants={fadeUp} className="craft-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-medium text-gray-400">Feature</th>
                    <th className="text-center p-4 font-medium text-gray-400">Midjourney</th>
                    <th className="text-center p-4 font-medium text-gray-400">DALL-E</th>
                    <th className="text-center p-4 font-medium text-white">
                      <span className="gradient-text font-bold">Craft</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pricing", "$10-30/mo", "$20/mo", "From $2.50"],
                    ["No Subscription", "No", "No", "Yes"],
                    ["Branding Focus", "No", "No", "Yes"],
                    ["Commercial License", "Extra", "Yes", "Included"],
                    ["Multiple Styles", "Yes", "Limited", "Yes"],
                    ["Transparent BG", "No", "No", "Yes"],
                    ["Instant Generation", "Fast", "Fast", "Fast"],
                  ].map(([feature, mj, dall, craft], i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="p-4 text-gray-300">{feature}</td>
                      <td className="p-4 text-center text-gray-500">{mj}</td>
                      <td className="p-4 text-center text-gray-500">{dall}</td>
                      <td className="p-4 text-center text-[#f0653a] font-medium">{craft}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get started with 50 free credits and bring your brand vision to life.</p>
          <button onClick={() => openModal("signup")} className="craft-btn text-base px-10 py-4">
            Get Started for Free <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#f0653a] flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="font-display font-bold text-sm">Craft</span>
            <span className="text-gray-500 text-xs ml-2">&copy; 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection("features")} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Features</button>
            <button onClick={() => scrollToSection("pricing")} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Pricing</button>
            <button onClick={() => scrollToSection("faq")} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">FAQ</button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "?admin=true";
                }
              }}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Stats Bar Component ───
function StatsBar() {
  const [designs, setDesigns] = useState(52847);
  const [creators, setCreators] = useState(2340);
  const [total, setTotal] = useState(11230);

  useEffect(() => {
    const interval = setInterval(() => {
      setDesigns((d) => d + Math.floor(Math.random() * 3));
      setCreators((c) => Math.max(2200, c + Math.floor(Math.random() * 5) - 2));
      setTotal((t) => t + (Math.random() > 0.7 ? 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="glass rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        <StatItem label="Designs Created" value={designs.toLocaleString()} dot="green" />
        <div className="hidden sm:block w-px h-8 bg-white/10" />
        <StatItem label="Creators Online" value={creators.toLocaleString()} dot="orange" />
        <div className="hidden sm:block w-px h-8 bg-white/10" />
        <StatItem label="Total Creators" value={total.toLocaleString()} dot="none" />
        <div className="hidden sm:block w-px h-8 bg-white/10" />
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
          <div>
            <div className="text-white font-bold text-lg">4.9</div>
            <div className="text-gray-500 text-xs">Star Rating</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ label, value, dot }: { label: string; value: string; dot: "green" | "orange" | "none" }) {
  return (
    <div className="flex items-center gap-2">
      {dot === "green" && <div className="w-2 h-2 rounded-full bg-[#22c55e] pulse-green" />}
      {dot === "orange" && <div className="w-2 h-2 rounded-full bg-[#f0653a] pulse-orange" />}
      <div>
        <div className="text-white font-bold text-lg">{value}</div>
        <div className="text-gray-500 text-xs">{label}</div>
      </div>
    </div>
  );
}

// ─── FAQ Item Component ───
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="craft-card craft-card-hover cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-white pr-4">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-gray-400 text-sm leading-relaxed mt-3 pt-3 border-t border-white/5">{answer}</p>
        </motion.div>
      )}
    </div>
  );
}
