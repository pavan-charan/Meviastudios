import React from "react";
import { motion } from "framer-motion";

interface BounceCardProps {
  className?: string;
  children: React.ReactNode;
}

export const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-6xl font-heading text-white">
          Grow faster with our
          <span className="text-zinc-500"> all in one solution</span>
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="whitespace-nowrap rounded-full bg-[#7C5CFF] px-8 py-3 font-semibold text-white shadow-[0_0_20px_rgba(124,92,255,0.3)] transition-colors hover:bg-[#6A4DFF]"
        >
          Learn more
        </motion.button>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Intelligent Briefing</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-500/80 to-indigo-500/80 p-6 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] backdrop-blur-md border-t border-white/20">
            <span className="block text-center font-bold text-white uppercase tracking-wider">
              Smart Briefs
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Global Creator Hub</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-500/80 to-orange-500/80 p-6 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] backdrop-blur-md border-t border-white/20">
            <span className="block text-center font-bold text-white uppercase tracking-wider">
              2M+ Verified Talent
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Real-time ROI Tracking</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-emerald-500/80 to-teal-500/80 p-6 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] backdrop-blur-md border-t border-white/20">
            <span className="block text-center font-bold text-white uppercase tracking-wider">
              Live Analytics
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Automated Payouts</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-500/80 to-red-500/80 p-6 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg] backdrop-blur-md border-t border-white/20">
            <span className="block text-center font-bold text-white uppercase tracking-wider">
              Instant Compliance
            </span>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children }: BounceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 0.98, rotate: "-0.5deg" }}
      className={`group relative min-h-[350px] cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-3xl transition-colors hover:bg-white/[0.05] ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-bold font-heading text-white">{children}</h3>
  );
};
