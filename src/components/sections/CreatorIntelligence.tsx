"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Zap, LayoutDashboard, BarChart3, Users } from "lucide-react";

const features = [
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

function FeatureCard({ 
  feature, 
  progress, 
  range,
  index
}: { 
  feature: typeof features[0], 
  progress: MotionValue<number>, 
  range: [number, number],
  index: number
}) {
  // Simpler mapping for opacity and movement
  const opacity = useTransform(
    progress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [30, 0, 0, -30]
  );

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

export function CreatorIntelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={sectionRef}
      className="relative h-[400vh] w-full bg-[#050507]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[rgba(124,92,255,0.06)] blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl px-6 md:px-12">
          <div className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
            
            {/* Left Side: Pinned Content */}
            <div className="flex flex-col justify-center">
              <h2 className="font-heading mb-6 text-6xl font-bold leading-[1.1] tracking-tight lg:text-7xl">
                <span className="block text-white">Creator Intelligence.</span>
                <span className="block bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF] bg-clip-text pb-2 text-transparent drop-shadow-2xl">
                  Zero Operational Friction.
                </span>
              </h2>
              <p className="max-w-[500px] text-xl leading-relaxed text-zinc-400">
                The all-in-one automation platform built for Brands, Agencies, and Creator-Led Teams to scale creator marketing with speed, precision, and efficiency.
              </p>
            </div>

            {/* Right Side: Scroll-driven Features */}
            <div className="relative h-[400px] w-full lg:h-full">
              <FeatureCard feature={features[0]} progress={scrollYProgress} range={[0, 0.25]} index={4} />
              <FeatureCard feature={features[1]} progress={scrollYProgress} range={[0.25, 0.5]} index={3} />
              <FeatureCard feature={features[2]} progress={scrollYProgress} range={[0.5, 0.75]} index={2} />
              <FeatureCard feature={features[3]} progress={scrollYProgress} range={[0.75, 1]} index={1} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

