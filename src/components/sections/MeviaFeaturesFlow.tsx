"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FloatingPathsBackground } from "@/components/ui/floating-paths";
import {
  Megaphone,
  Users2,
  FileText,
  CreditCard,
  BarChart3,
  Layers,
  Target,
  Workflow,
  Search,
  LayoutDashboard,
  Users,
  ShieldCheck,
  TrendingUp,
  Share2,
  Box,
  Cpu,
  Zap,
  Globe,
  Lock,
  MessageSquare
} from "lucide-react";

// --- Data ---

const brandFeatures = [
  { title: "Campaign Management", icon: Megaphone },
  { title: "Creator Management", icon: Users2 },
  { title: "Deliverables & Contracts", icon: FileText },
  { title: "Payments & Payouts", icon: CreditCard },
  { title: "Deep Analytics", icon: BarChart3 },
  { title: "Single-Brand Workspace", icon: Layers },
  { title: "ROI Context", icon: Target },
  { title: "Approval Workflows", icon: Workflow },
  { title: "Smart Discovery", icon: Search },
];

const agencyFeatures = [
  { title: "Multi-brand workspace", icon: LayoutDashboard },
  { title: "Campaign Management", icon: Workflow },
  { title: "Creator Management", icon: Users },
  { title: "Deliverables & Contracts", icon: FileText },
  { title: "Payments & Payouts", icon: CreditCard },
  { title: "Deep Analytics", icon: BarChart3 },
  { title: "Client reporting dashboards", icon: Share2 },
  { title: "Team collaboration", icon: ShieldCheck },
  { title: "Cross-brand analytics", icon: TrendingUp },
];

// --- Sub-components ---

function FeatureCard({ title, Icon }: { title: string, Icon: any }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl shrink-0 min-w-[280px]">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#7C5CFF]">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <span className="text-lg font-semibold text-white tracking-tight">{title}</span>
    </div>
  );
}

// --- Main Component ---

function LetterSpan({ char, index, scrollYProgress }: { char: string, index: number, scrollYProgress: MotionValue<number> }) {
  const focalPoint = index * 0.015;

  const scale = useTransform(
    scrollYProgress,
    [focalPoint - 0.06, focalPoint, focalPoint + 0.06],
    [1, 1.25, 1]
  );
  
  const y = useTransform(
    scrollYProgress,
    [focalPoint - 0.06, focalPoint, focalPoint + 0.06],
    [0, -15, 0]
  );

  const color = useTransform(
    scrollYProgress,
    [focalPoint - 0.04, focalPoint, focalPoint + 0.04],
    ["rgba(255,255,255,0.05)", "rgba(255,255,255,1)", "rgba(255,255,255,0.05)"]
  );

  const WebkitTextStroke = useTransform(
    scrollYProgress,
    [focalPoint - 0.04, focalPoint, focalPoint + 0.04],
    ["1px rgba(255,255,255,0.15)", "1px rgba(255,255,255,0)", "1px rgba(255,255,255,0.15)"]
  );

  const textShadow = useTransform(
    scrollYProgress,
    [focalPoint - 0.02, focalPoint, focalPoint + 0.02],
    [
      "0 0 0px rgba(124,92,255,0)",
      "0 0 40px rgba(124,92,255,0.4)",
      "0 0 0px rgba(124,92,255,0)"
    ]
  );

  return (
    <motion.span
      style={{
        display: "inline-block",
        scale,
        y,
        color,
        WebkitTextStroke,
        textShadow,
        whiteSpace: char === " " ? "pre" : "normal"
      }}
    >
      {char}
    </motion.span>
  );
}

export function MeviaFeaturesFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- STAGE 1: Big Text ---
  const textX = useTransform(scrollYProgress, [0, 0.25], ["0%", "-120%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.25], [1, 0]);

  // --- STAGE 2: Push Panel 1 ---
  const panel1X = useTransform(scrollYProgress, [0.15, 0.35], ["100%", "0%"]);

  // --- STAGE 3: Brand Features ---
  const brandsY = useTransform(scrollYProgress, [0.30, 0.45], ["100%", "0%"]);
  const brandsRow1X = useTransform(scrollYProgress, [0.35, 0.6], ["0%", "-60%"]);
  const brandsRow2X = useTransform(scrollYProgress, [0.35, 0.6], ["0%", "-40%"]);
  // --- STAGE 4: Push Panel 2 ---
  const panel2X = useTransform(scrollYProgress, [0.6, 0.7], ["100%", "0%"]);

  // --- STAGE 5: Agency Features ---
  const agenciesY = useTransform(scrollYProgress, [0.65, 0.8], ["100%", "0%"]);
  const agenciesRow1X = useTransform(scrollYProgress, [0.7, 1.0], ["0%", "-60%"]);
  const agenciesRow2X = useTransform(scrollYProgress, [0.7, 1.0], ["0%", "-40%"]);

  return (
    <div ref={containerRef} className="relative h-[700vh] w-full bg-[#050507]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#7C5CFF]/5 blur-[120px] pointer-events-none" />

        {/* STAGE 1: BIG TEXT (REVAMPED AESTHETICS) */}
        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className="absolute inset-0 flex items-center whitespace-nowrap z-0 px-[15vw]"
        >
          <h2 className="text-[12vw] font-bold uppercase flex items-center gap-[1.5vw] tracking-tighter">
            {"Mevia Features".split("").map((char, i) => (
              <LetterSpan key={i} char={char} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </h2>
        </motion.div>

        {/* STAGE 2: PUSH PANEL 1 */}
        <motion.div
          style={{ x: panel1X }}
          className="absolute inset-0 bg-[#050507] z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
        />

        {/* STAGE 3: BRAND FEATURES */}
        <motion.div
          style={{ y: brandsY }}
          className="absolute inset-0 z-20 flex flex-col justify-center gap-8 overflow-hidden bg-[#050507]"
        >
          <FloatingPathsBackground position={1} className="absolute inset-0 z-0 opacity-30" />
          <div className="container mx-auto px-10 mb-12 relative z-30">
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-4">For Brands</h3>
            <p className="text-xl text-zinc-500 max-w-xl">Scale your creator marketing with professional-grade tools.</p>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div style={{ x: brandsRow1X }} className="flex gap-6 pl-[10vw]">
              {brandFeatures.slice(0, 5).map((f, i) => (
                <FeatureCard key={i} title={f.title} Icon={f.icon} />
              ))}
              {brandFeatures.slice(0, 5).map((f, i) => (
                <FeatureCard key={`dup1-${i}`} title={f.title} Icon={f.icon} />
              ))}
            </motion.div>
            <motion.div style={{ x: brandsRow2X }} className="flex gap-6 pl-[20vw]">
              {brandFeatures.slice(5).map((f, i) => (
                <FeatureCard key={i} title={f.title} Icon={f.icon} />
              ))}
              {brandFeatures.slice(5).map((f, i) => (
                <FeatureCard key={`dup2-${i}`} title={f.title} Icon={f.icon} />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* STAGE 4: PUSH PANEL 2 */}
        <motion.div
          style={{ x: panel2X }}
          className="absolute inset-0 bg-[#050507] z-30 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
        />

        {/* STAGE 5: AGENCY FEATURES */}
        <motion.div
          style={{ y: agenciesY }}
          className="absolute inset-0 z-40 flex flex-col justify-center gap-8 overflow-hidden bg-[#050507]"
        >
          <FloatingPathsBackground position={-1} className="absolute inset-0 z-0 opacity-30" />
          <div className="container mx-auto px-10 mb-12 relative z-50">
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-4">For Agencies</h3>
            <p className="text-xl text-zinc-500 max-w-xl">Manage multiple clients and high-volume campaigns with ease.</p>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div style={{ x: agenciesRow1X }} className="flex gap-6 pl-[10vw]">
              {agencyFeatures.slice(0, 5).map((f, i) => (
                <FeatureCard key={i} title={f.title} Icon={f.icon} />
              ))}
              {agencyFeatures.slice(0, 5).map((f, i) => (
                <FeatureCard key={`dup1-${i}`} title={f.title} Icon={f.icon} />
              ))}
            </motion.div>
            <motion.div style={{ x: agenciesRow2X }} className="flex gap-6 pl-[20vw]">
              {agencyFeatures.slice(5).map((f, i) => (
                <FeatureCard key={i} title={f.title} Icon={f.icon} />
              ))}
              {agencyFeatures.slice(5).map((f, i) => (
                <FeatureCard key={`dup2-${i}`} title={f.title} Icon={f.icon} />
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
