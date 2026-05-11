"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { Megaphone, Users2, CreditCard, BarChart3 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

// --- Data ---
const featureList = [
  {
    title: "Campaign Management",
    desc: "End-to-end workflow automation. From brief to final delivery, track every milestone seamlessly.",
    icon: Megaphone,
    colSpan: "md:col-span-2",
  },
  {
    title: "Influencer Management",
    desc: "A single source of truth for your entire creator roster and relationships.",
    icon: Users2,
    colSpan: "md:col-span-1",
  },
  {
    title: "Payments & Payouts",
    desc: "Automated invoicing, compliance, and instant payouts across borders.",
    icon: CreditCard,
    colSpan: "md:col-span-1",
  },
  {
    title: "Analytics",
    desc: "Real-time ROI tracking, audience insights, and comprehensive campaign reporting.",
    icon: BarChart3,
    colSpan: "md:col-span-2",
  },
];

const ecosystemList = [
  {
    title: "Mevia Studio",
    status: "Live",
    desc: "The core operating system for brands and agencies to scale creator marketing.",
    features: ["Manage campaigns & payouts", "Unified CRM workspace", "Real-time ROI dashboard"],
    color: "from-[#7C5CFF] to-[#5A3BFF]",
    cta: "Go to App",
  },
  {
    title: "Mevia App",
    status: "Coming Soon",
    desc: "A dedicated mobile experience for creators to manage their business on the go.",
    features: ["Instant chat & approvals", "E-wallet & fast payouts", "Project tracking"],
    color: "from-[#00D4FF] to-[#00A3FF]",
  },
  {
    title: "Mevia Creates",
    status: "Coming Soon",
    desc: "An exclusive marketplace matching top brands with verified talent.",
    features: ["Smart creator matching", "Verified metrics only", "Direct recruitment"],
    color: "from-emerald-400 to-emerald-600",
  },
];

// --- Sub-components ---

function EcosystemCard({
  item,
  index,
  progress
}: {
  item: typeof ecosystemList[0],
  index: number,
  progress: MotionValue<number>
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`;

  // Sync focus points: Card0 @ 0.4, Card1 @ 0.7, Card2 @ 1.0
  const center = 0.4 + index * 0.3;
  const isLast = index === ecosystemList.length - 1;

  // Create a "plateau" range so it stays sharp for a while in the center
  const range = [
    Math.max(0, center - 0.2),
    Math.max(0, center - 0.05),
    Math.min(1, center + 0.05),
    Math.min(1, center + 0.2)
  ];

  const scale = useTransform(progress, range, [0.85, 1.05, 1.05, isLast ? 1.05 : 0.85]);
  const opacity = useTransform(progress, range, [0.5, 1, 1, isLast ? 1 : 0.5]);
  const blurPx = useTransform(progress, range, [4, 0, 0, isLast ? 0 : 4]);
  const blur = useMotionTemplate`blur(${blurPx}px)`;
  const y = useTransform(progress, range, [40, 0, 0, isLast ? 0 : 40]);

  return (
    <motion.div
      style={{ scale, opacity, filter: blur, y }}
      onMouseMove={handleMouseMove}
      className="group relative w-[380px] h-[520px] rounded-[2rem] border border-white/10 bg-[#13131A]/60 p-8 backdrop-blur-2xl transition-colors duration-300 hover:border-white/20 hover:bg-[#1A1A24]/70 shrink-0"
    >
      {/* Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Top Glow Reflection */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          {/* Status Badge */}
          <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {item.status}
          </div>

          {/* Title & Desc */}
          <h3 className="mb-3 text-3xl font-bold text-white font-heading tracking-tight">{item.title}</h3>
          <p className="mb-6 text-sm leading-relaxed text-zinc-400">{item.desc}</p>

          {/* Feature List */}
          <ul className="space-y-3">
            {item.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-300">
                <div className={`h-1 w-1 rounded-full bg-gradient-to-r ${item.color}`} />
                <span className="text-xs font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA / Bottom Decor */}
        <div className="mt-6">
          {item.cta ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full rounded-xl bg-gradient-to-r ${item.color} py-3 text-sm font-bold text-white shadow-xl`}
            >
              {item.cta}
            </motion.button>
          ) : (
            <div className="h-1 w-16 rounded-full bg-white/10" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Component ---

export function FeaturesToEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Animation Mapping ---
  // Total height is 400vh.
  // 0.0 - 0.2: Features Section (static/base)
  // 0.2 - 0.4: Transition (Ecosystem slides in)
  // 0.4 - 1.0: Ecosystem Sequence (horizontal scroll)

  // Features Section (Base Layer) Animations
  const featuresScale = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.95]);
  const featuresOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.7]);

  // Ecosystem Section (Cover Layer) Animations
  const ecosystemY = useTransform(scrollYProgress, [0.2, 0.4], ["100%", "0%"]);

  // Ecosystem Horizontal Scroll: Start centered at 0.4, move to center last card at 1.0
  // Card Width (380) + Gap (48) = 428px per step
  const ecosystemX = useTransform(
    scrollYProgress,
    [0.4, 0.7, 1.0],
    ["0px", "-428px", "-856px"]
  );

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050507]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* SECTION 1: FEATURES (Base Layer) */}
        <motion.section
          style={{ scale: featuresScale, opacity: featuresOpacity }}
          className="absolute inset-0 z-10 flex flex-col justify-start pt-24 pb-20"
        >
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                Total Creator <span className="text-accent-secondary">Intelligence.</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl">
                A unified suite designed to handle the complexity of modern creator-led marketing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {featureList.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <GlassCard
                    key={idx}
                    className={`group cursor-pointer ${feature.colSpan} flex flex-col justify-between min-h-[220px] p-6 hover:scale-[1.02] transition-transform duration-500`}
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-primary mb-4 group-hover:scale-110 group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                        <Icon size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-text-secondary text-base leading-relaxed">{feature.desc}</p>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-auto">
                      <div className="h-full w-0 bg-gradient-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-700 ease-out" />
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: ECOSYSTEM (Cover Layer) */}
        <motion.section
          style={{ y: ecosystemY }}
          className="absolute inset-0 z-20 bg-bg-secondary flex flex-col justify-center shadow-[0_-40px_80px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-30 grayscale-[0.5] brightness-[0.6]"
            >
              <source src="/assets/Abstract_background_for_SaaS_202605051726.mp4" type="video/mp4" />
            </video>
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-transparent to-bg-secondary opacity-60" />
            <div className="absolute inset-0 bg-bg-secondary/40 backdrop-blur-[2px]" />
          </div>

          {/* Header */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 text-center w-full">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
              The Mevia Ecosystem
            </h2>
          </div>

          {/* Horizontal Card Carousel */}
          <div className="flex h-full items-center justify-start pt-20">
            <motion.div
              style={{ x: ecosystemX, left: "calc(50% - 190px)" }}
              className="relative flex gap-12"
            >
              {ecosystemList.map((item, idx) => (
                <EcosystemCard key={idx} item={item} index={idx} progress={scrollYProgress} />
              ))}
            </motion.div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
