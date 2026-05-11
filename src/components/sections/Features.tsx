"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
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
  Share2
} from "lucide-react";

// --- Data ---

const brandFeatures = [
  {
    title: "Campaign Management",
    desc: "End-to-end workflow automation from brief to final delivery.",
    icon: Megaphone,
  },
  {
    title: "Creator Management",
    desc: "A single source of truth for your entire creator roster.",
    icon: Users2,
  },
  {
    title: "Deliverables & Contracts",
    desc: "Automated legal workflows and content tracking.",
    icon: FileText,
  },
  {
    title: "Payments & Payouts",
    desc: "Global payouts and automated invoicing in any currency.",
    icon: CreditCard,
  },
  {
    title: "Deep Analytics",
    desc: "Real-time ROI tracking and comprehensive campaign reporting.",
    icon: BarChart3,
  },
  {
    title: "Single-Brand Workspace",
    desc: "Focused environment designed for brand marketing teams.",
    icon: Layers,
  },
  {
    title: "ROI Context",
    desc: "Every campaign tied directly to your business goals.",
    icon: Target,
  },
  {
    title: "Approval Workflows",
    desc: "Frictionless multi-stage content and creator approvals.",
    icon: Workflow,
  },
  {
    title: "Smart Discovery",
    desc: "AI-driven creator recommendations based on brand fit.",
    icon: Search,
  },
];

const agencyFeatures = [
  {
    title: "Multi-Brand Workspace",
    desc: "Switch seamlessly between multiple client profiles.",
    icon: LayoutDashboard,
  },
  {
    title: "Team Collaboration",
    desc: "Role-based permissions and shared project workspaces.",
    icon: Users,
  },
  {
    title: "Client Reporting",
    desc: "Whitelabeled dashboards to share insights with clients.",
    icon: Share2,
  },
  {
    title: "Creator Intelligence",
    desc: "Historical performance data and vetted metrics.",
    icon: ShieldCheck,
  },
  {
    title: "Cross-Brand Analytics",
    desc: "Compare performance across your entire portfolio.",
    icon: TrendingUp,
  },
  {
    title: "Campaign Orchestration",
    desc: "Manage high-volume campaigns across multiple clients.",
    icon: Workflow,
  },
  {
    title: "Global Payments",
    desc: "Handle complex payout structures and agency fees.",
    icon: CreditCard,
  },
  {
    title: "Deliverable Tracker",
    desc: "Ensure every client asset is tracked and archived.",
    icon: FileText,
  },
  {
    title: "Deep Insights",
    desc: "Granular audience data to drive agency strategy.",
    icon: BarChart3,
  },
];

// --- Sub-components ---

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(124, 92, 255, 0.15), transparent 80%)`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.06]"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-white ring-1 ring-white/10 group-hover:ring-white/20">
          <feature.icon size={24} strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white tracking-tight">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
          {feature.desc}
        </p>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF] transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

// --- Main Component ---

export function Features() {
  const [activeTab, setActiveTab] = useState<"brands" | "agencies">("brands");
  const features = activeTab === "brands" ? brandFeatures : agencyFeatures;

  return (
    <section className="relative bg-[#050507] py-24 md:py-32 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-[#7C5CFF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#00D4FF]/5 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Info & Tabs */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 lg:h-max">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
                Mevia Studio <span className="text-zinc-500">Features</span>
              </h2>
              <p className="mb-10 text-lg text-zinc-400 max-w-md">
                Everything you need to run creator campaigns successfully, built for professional teams.
              </p>

              {/* Tab Switcher */}
              <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md w-max">
                <button
                  onClick={() => setActiveTab("brands")}
                  className={`relative rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    activeTab === "brands" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {activeTab === "brands" && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#5A3BFF]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">For Brands</span>
                </button>
                <button
                  onClick={() => setActiveTab("agencies")}
                  className={`relative rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    activeTab === "agencies" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {activeTab === "agencies" && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00A3FF]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">For Agencies</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Features Grid */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {features.map((feature, idx) => (
                  <FeatureCard key={`${activeTab}-${feature.title}`} feature={feature} index={idx} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
