"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Zap, LayoutDashboard, BarChart3, Users, Clock, FileSpreadsheet, FileWarning, AlertCircle, TrendingDown } from "lucide-react";

// --- Data ---
const creatorFeatures = [
  {
    icon: <Zap className="h-8 w-8 text-[#7C5CFF]" />,
    title: "Intelligent Automation",
    description: "Intelligent automation reduces manual work through smart workflows and data processing.",
  },
  {
    icon: <LayoutDashboard className="h-8 w-8 text-[#00D4FF]" />,
    title: "Unified Workspace",
    description: "Unified dashboard for complete oversight of every campaign, creator, and contract.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-[#7C5CFF]" />,
    title: "Real-time Insights",
    description: "Real-time insights and analytics to track ROI and campaign performance instantly.",
  },
  {
    icon: <Users className="h-8 w-8 text-[#00D4FF]" />,
    title: "Seamless Collaboration",
    description: "Seamless creator and brand collaboration with integrated communication tools.",
  },
];

const problemList = [
  { title: "Payment Delays", icon: Clock, desc: "Endless follow-ups for pending invoices." },
  { title: "Manual Workload", icon: FileSpreadsheet, desc: "Trapped in a web of messy spreadsheets." },
  { title: "Contract Headaches", icon: FileWarning, desc: "Lost terms and mismanaged agreements." },
  { title: "Follow-Up Fatigue", icon: AlertCircle, desc: "Chasing creators and clients constantly." },
  { title: "Deliverable Drop-Off", icon: TrendingDown, desc: "Missed deadlines and forgotten assets." },
  { title: "Agency Misalignment", icon: Users, desc: "Disjointed communication across teams." },
];

// --- Sub-components ---

function CreatorFeatureCard({
  feature,
  progress,
  range,
  index
}: {
  feature: typeof creatorFeatures[0],
  progress: MotionValue<number>,
  range: [number, number],
  index: number
}) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.02, range[1] - 0.02, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[0] + 0.02, range[1] - 0.02, range[1]], [30, 0, 0, -30]);

  return (
    <motion.div
      style={{ opacity, y, zIndex: index }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-2xl">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 shadow-inner ring-1 ring-white/10">
          {feature.icon}
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white">{feature.title}</h3>
        <p className="text-lg leading-relaxed text-zinc-400">{feature.description}</p>
      </div>
    </motion.div>
  );
}

function ProblemCard({
  problem,
  idx,
  progress
}: {
  problem: typeof problemList[0],
  idx: number,
  progress: MotionValue<number>
}) {
  const Icon = problem.icon;
  const yOffset = idx % 2 === 0 ? 20 : -20;

  // Problem section active range is 0.6 to 1.0 of the total 800vh
  // We map that 0.6-1.0 to 0-1 for the internal card animation
  const cardProgress = useTransform(progress, [0.6, 1.0], [0, 1]);

  const y = useTransform(cardProgress, [0, 1], [0, yOffset * 5]);
  const rotateZ = useTransform(cardProgress, [0, 1], [0, idx % 2 === 0 ? 5 : -5]);

  return (
    <motion.div style={{ y, rotateZ }} className="w-[300px] md:w-[400px] shrink-0">
      <div className="h-full flex flex-col items-start gap-4 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[#7C5CFF]">
          <Icon size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mt-4">{problem.title}</h3>
        <p className="text-zinc-400 text-lg leading-relaxed">{problem.desc}</p>
      </div>
    </motion.div>
  );
}

// --- Main Component ---

export function CreatorToProblem() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transition Logic:
  // 0.0 - 0.5: Creator Intelligence (400vh)
  // 0.5 - 0.6: Transition (100vh) - Problem Section slides in
  // 0.6 - 1.0: Problem Section (300vh)

  // Creator section effects during transition
  const creatorScale = useTransform(scrollYProgress, [0.5, 0.6], [1, 0.9]);
  const creatorBlur = useTransform(scrollYProgress, [0.5, 0.6], ["blur(0px)", "blur(10px)"]);
  const creatorOpacity = useTransform(scrollYProgress, [0.5, 0.55], [1, 0]);

  // Problem section transition
  const problemY = useTransform(scrollYProgress, [0.5, 0.6], ["100%", "0%"]);

  // Problem section horizontal scroll
  const problemX = useTransform(scrollYProgress, [0.6, 1.0], ["0%", "-60%"]);

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-[#050507]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Layer 1: Creator Intelligence */}
        <motion.div
          style={{ scale: creatorScale, filter: creatorBlur, opacity: creatorOpacity }}
          className="absolute inset-0 z-10"
        >
          {/* Ambient Glows */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[rgba(124,92,255,0.06)] blur-[120px] pointer-events-none" />

          <div className="relative mx-auto flex h-full max-w-7xl px-6 md:px-12">
            <div className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <h2 className="font-heading mb-6 text-6xl font-bold leading-[1.1] tracking-tight lg:text-7xl">
                  <span className="block text-white">Creator Intelligence.</span>
                  <span className="block bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF] bg-clip-text pb-2 text-transparent">
                    Zero Operational Friction.
                  </span>
                </h2>
                <p className="max-w-[500px] text-xl leading-relaxed text-zinc-400">
                  The all-in-one automation platform built for Brands, Agencies, and Creator-Led Teams to scale creator marketing with speed, precision, and efficiency.
                </p>
              </div>
              <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
                <motion.div 
                  style={{ 
                    y: useTransform(scrollYProgress, [0, 0.45], ["37.5%", "-37.5%"]) 
                  }}
                  className="flex flex-col gap-12 w-full"
                >
                  {creatorFeatures.map((f, i) => (
                    <div key={i} className="flex-shrink-0 w-full flex justify-center">
                      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-[#7C5CFF]/30 group">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 shadow-inner ring-1 ring-white/10 group-hover:scale-110 transition-transform">
                          {f.icon}
                        </div>
                        <h3 className="mb-4 text-3xl font-bold text-white tracking-tight">{f.title}</h3>
                        <p className="text-xl leading-relaxed text-zinc-400 font-medium">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Layer 2: Problems Section (Covers Layer 1) */}
        <motion.div
          style={{ y: problemY }}
          className="absolute inset-0 z-20 bg-bg-secondary shadow-[0_-50px_100px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <div className="text-center mb-16 px-4">
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
                STOP MANAGING <span className="bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF] bg-clip-text text-transparent">EXCEL SHEETS</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                The old way of managing creator campaigns is broken. It's time for an upgrade.
              </p>
            </div>

            <motion.div style={{ x: problemX }} className="flex gap-8 px-8 w-max mx-auto">
              {problemList.map((problem, idx) => (
                <ProblemCard key={idx} problem={problem} idx={idx} progress={scrollYProgress} />
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
