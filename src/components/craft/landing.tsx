"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCraftStore } from "@/lib/store";
import {
  Sparkles,
  Zap,
  Image,
  Star,
  ArrowRight,
  ChevronDown,
  Zap as Bolt,
  ShieldCheck,
  Gauge,
  Layers,
  Eye,
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

// ─── Original FAQ Items ───
const faqItems = [
  { q: "Do I get anything free?", a: "Yes! Every new account starts with 50 free credits. No credit card required. Sign up and start creating immediately." },
  { q: "Do I own the images?", a: "Absolutely. Every image you generate is 100% yours. Full commercial rights included — use them for logos, marketing, social media, print, anything." },
  { q: "Do credits expire?", a: "No. Your credits never expire. Buy them once, use them whenever you want. There's no pressure and no subscription." },
  { q: "What's Turbo vs Default vs Quality?", a: "Turbo (1 credit) is the fastest for quick ideas. Default (2 credits) balances speed and quality. Quality (3 credits) gives the finest detail and best text rendering." },
  { q: "Can I get a refund?", a: "Since credits are digital and delivered instantly, we don't offer refunds on credit purchases. However, your credits never expire, so there's no rush to use them." },
  { q: "What if I don't like a result?", a: "AI generation is creative — results vary. You can re-generate with the same prompt for different results, or tweak your prompt for better output. Each generation costs just 1-3 credits." },
  { q: "Is there a subscription?", a: "No. Craft is fully pay-as-you-go. Buy a credit pack when you need it. No monthly charges, no hidden fees, no surprises." },
  { q: "How is this different from Midjourney?", a: "Craft is built specifically for branding — logos, posters, social graphics. Midjourney is a general art tool. We offer transparent per-credit pricing (no $10-30/mo subscription), branding-focused tools, and a simpler workflow." },
  { q: "What AI model powers this?", a: "Craft uses state-of-the-art image generation models optimized for branding and design use cases. Our models are regularly updated for better quality and new features." },
];

// ─── Design Gallery Colors ───
const designColors = [
  { bg: "from-amber-900 to-amber-700", label: "Brand Logo" },
  { bg: "from-violet-800 to-purple-600", label: "Poster" },
  { bg: "from-blue-900 to-blue-700", label: "Social Card" },
  { bg: "from-orange-600 to-orange-400", label: "Logo Mark" },
  { bg: "from-pink-700 to-rose-500", label: "Instagram" },
  { bg: "from-cyan-800 to-sky-600", label: "Twitter/X" },
  { bg: "from-emerald-800 to-green-600", label: "Facebook" },
  { bg: "from-red-800 to-red-600", label: "YouTube" },
  { bg: "from-slate-700 to-gray-500", label: "LinkedIn" },
];

export function Landing() {
  const { openModal } = useCraftStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ═══════════ HEADER ═══════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ background: "rgba(10,10,10,0.9)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#f0653a] flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Craft</span>
          </div>

          {/* Center Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-[13px] text-gray-400 hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection("pricing")} className="text-[13px] text-gray-400 hover:text-white transition-colors">Pricing</button>
            <button onClick={() => scrollToSection("faq")} className="text-[13px] text-gray-400 hover:text-white transition-colors">FAQ</button>
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => openModal("login")} className="text-[13px] text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg">Log in</button>
            <button onClick={() => openModal("signup")} className="text-[13px] font-semibold text-white px-5 py-2 rounded-lg bg-[#f0653a] hover:bg-[#e55a30] transition-colors">Get Started</button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 px-6 py-4 space-y-3" style={{ background: "rgba(10,10,10,0.95)" }}>
            <button onClick={() => scrollToSection("features")} className="block text-sm text-gray-400 hover:text-white">Features</button>
            <button onClick={() => scrollToSection("pricing")} className="block text-sm text-gray-400 hover:text-white">Pricing</button>
            <button onClick={() => scrollToSection("faq")} className="block text-sm text-gray-400 hover:text-white">FAQ</button>
            <div className="flex gap-3 pt-3 border-t border-white/5">
              <button onClick={() => { openModal("login"); setMobileMenuOpen(false); }} className="text-sm text-gray-300 hover:text-white px-4 py-2">Log in</button>
              <button onClick={() => { openModal("signup"); setMobileMenuOpen(false); }} className="text-sm font-semibold text-white px-5 py-2 rounded-lg bg-[#f0653a]">Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-[#f0653a]" />
              <span className="text-[13px] text-gray-300">AI-Powered Branding Studio</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-6xl font-bold leading-[1.1] mb-6">
              Craft your brand.
              <br />
              <span className="text-[#f0653a]">Not your bill.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-[16px] text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              Professional logos, posters, social media graphics — powered by AI. Starting at just $2.50.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <button onClick={() => openModal("signup")} className="inline-flex items-center gap-2 text-[15px] font-semibold text-white px-7 py-3 rounded-xl bg-[#f0653a] hover:bg-[#e55a30] transition-all hover:shadow-lg hover:shadow-[#f0653a]/20">
                Start Creating <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollToSection("features")} className="inline-flex items-center gap-2 text-[15px] font-medium text-white px-7 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
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
              <div className="rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0653a, #fbbf24)", minHeight: "300px" }}>
                {/* Star Icon */}
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-1.5">AI Branding</h3>
                <p className="text-white/80 text-sm">Logo &middot; Poster &middot; Social</p>
                {/* From $2.50 badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}>
                  From $2.50
                </div>
                {/* Credits badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg text-[12px] font-medium text-white/90" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}>
                  50 cr
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ LIVE STATS BAR ═══════════ */}
      <StatsBar />

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">How it works</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-center mb-14 text-[15px]">Three simple steps to professional branding</motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { step: "1", title: "Create account", desc: "Sign up for free in seconds. No credit card required." },
                { step: "2", title: "Add credits", desc: "Purchase a credit pack starting at just $2.50." },
                { step: "3", title: "Create anything", desc: "Generate logos, posters, social graphics, and more." },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} className="craft-card craft-card-hover text-center py-8 px-6">
                  <div className="w-10 h-10 rounded-full bg-[#f0653a] flex items-center justify-center mx-auto mb-5 text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ EVERYTHING YOU NEED ═══════════ */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">Everything you need</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-center mb-14 text-[15px]">Professional branding tools at a fraction of the cost</motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Bolt, title: "Generate (Turbo)", desc: "Fastest generation for exploring ideas", color: "text-yellow-400" },
                { icon: Gauge, title: "Generate (Default)", desc: "Balanced speed and quality", color: "text-[#f0653a]" },
                { icon: ShieldCheck, title: "Generate (Quality)", desc: "Finest detail and text rendering", color: "text-blue-400" },
                { icon: Eye, title: "Transparent Logos", desc: "PNG with transparent background", color: "text-green-400" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="craft-card craft-card-hover">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="font-display text-base font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PRICING SECTION ═══════════ */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">Simple, transparent pricing</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-center mb-14 text-[15px]">Pay-as-you-go. No subscriptions. No surprises.</motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: "Starter", price: "$2.50", credits: "50 credits" },
                { name: "Standard", price: "$10.00", credits: "200 credits" },
                { name: "Popular", price: "$25.00", credits: "500 credits", popular: true },
                { name: "Business", price: "$50.00", credits: "1,000 credits" },
              ].map((pack, i) => (
                <motion.div key={i} variants={fadeUp} className={`craft-card craft-card-hover relative flex flex-col ${pack.popular ? "border-[#f0653a]/40" : ""}`}>
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-[#f0653a] tracking-wide">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="font-display text-base font-semibold mb-1">{pack.name}</h3>
                  <div className="mb-1">
                    <span className="text-3xl font-display font-bold text-[#f0653a]">{pack.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">{pack.credits}</p>

                  <div className="space-y-3 mb-8 flex-1">
                    {["Never expire", "All features", "Full ownership"].map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <button onClick={() => openModal("signup")} className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${pack.popular ? "bg-[#f0653a] hover:bg-[#e55a30] text-white" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`}>
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ SECTION ═══════════ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">Frequently asked questions</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-center mb-14 text-[15px]">Got questions? We&apos;ve got answers.</motion.p>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CREATE STUNNING DESIGNS ═══════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-center mb-14">Create stunning designs</motion.h2>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 sm:gap-4">
              {designColors.map((item, i) => (
                <div
                  key={i}
                  className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center`}
                >
                  <span className="text-white/80 text-xs sm:text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
      <section className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to craft your brand?</h2>
          <p className="text-gray-400 mb-8 text-[15px] max-w-lg mx-auto">Join thousands of creators using Craft to build their visual identity.</p>
          <button onClick={() => openModal("signup")} className="inline-flex items-center gap-2 text-[15px] font-semibold text-white px-8 py-3.5 rounded-xl bg-[#f0653a] hover:bg-[#e55a30] transition-all hover:shadow-lg hover:shadow-[#f0653a]/20">
            Get Started for Free <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#f0653a] flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">C</span>
              </div>
              <span className="font-display font-semibold text-sm">Craft</span>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => scrollToSection("features")} className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors">Features</button>
              <button onClick={() => scrollToSection("pricing")} className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors">Pricing</button>
              <a href="#" className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors">Privacy</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[12px] text-gray-600">&copy; 2023 Craft. All rights reserved.</p>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "?admin=true";
                }
              }}
              className="text-[12px] text-gray-600 hover:text-gray-400 transition-colors"
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
  const [creators, setCreators] = useState(2351);
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
      className="max-w-4xl mx-auto px-6 py-8"
    >
      <div className="rounded-2xl px-6 py-5 flex flex-wrap items-center justify-center gap-8 sm:gap-12" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#22c55e] pulse-green" />
          <div>
            <div className="text-white font-semibold text-[15px]">{designs.toLocaleString()}+</div>
            <div className="text-gray-500 text-[12px]">designs created</div>
          </div>
        </div>
        <div className="hidden sm:block w-px h-8 bg-white/5" />
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#f0653a] pulse-orange" />
          <div>
            <div className="text-white font-semibold text-[15px]">{creators.toLocaleString()}</div>
            <div className="text-gray-500 text-[12px]">creators online</div>
          </div>
        </div>
        <div className="hidden sm:block w-px h-8 bg-white/5" />
        <div className="flex items-center gap-2.5">
          <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
          <div>
            <div className="text-white font-semibold text-[15px]">4.9</div>
            <div className="text-gray-500 text-[12px]">rating ({total.toLocaleString()}+ creators)</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── FAQ Item Component ───
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="craft-card cursor-pointer" style={{ borderRadius: "12px" }} onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between py-1">
        <h3 className="font-medium text-white text-[14px] pr-4">{question}</h3>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-gray-400 text-[13px] leading-relaxed pt-3 mt-3 border-t border-white/5">{answer}</p>
        </motion.div>
      )}
    </div>
  );
}
