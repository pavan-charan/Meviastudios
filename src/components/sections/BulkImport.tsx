"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FileText, 
  Upload, 
  Download, 
  Plus, 
  CheckCircle2, 
  LayoutDashboard, 
  Share2, 
  Smartphone,
  Check,
  Briefcase,
  MessageSquare
} from "lucide-react";

// --- Sub-components ---

function CSVCard({ icon: Icon, label, delay }: { icon: any, label: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
    >
      <Icon size={18} className="text-accent-secondary group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium text-white/90">{label}</span>
    </motion.div>
  );
}

function FloatingFile({ icon: Icon, color, delay, x, y, rotate }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.8],
        x: [x, 0],
        y: [y, 0],
        rotate: [rotate, 0]
      }}
      transition={{ 
        duration: 4, 
        delay, 
        repeat: Infinity, 
        repeatDelay: 1,
        ease: "easeInOut"
      }}
      className={`absolute z-20 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#13131A] shadow-2xl`}
    >
      <Icon size={24} className={color} />
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, delay: delay + 3.5 }}
        className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"
      >
        <Check size={10} className="text-white" strokeWidth={4} />
      </motion.div>
    </motion.div>
  );
}

// --- Main Component ---

export function BulkImport() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#050507] overflow-hidden">
      {/* Background Accents */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#7C5CFF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#00D4FF]/5 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Bulk Import <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF]">Made Easy.</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
              Upload your influencer data via CSV templates. We support all major platforms with automatic validation and enrichment.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#5A3BFF] text-white font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2"
              >
                <Download size={20} />
                Download Templates
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold backdrop-blur-md flex items-center gap-2"
              >
                <Plus size={20} />
                Manual Entry
              </motion.button>
            </div>

            <div className="relative w-full max-w-md overflow-hidden py-4">
              {/* Fade Masks */}
              <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#050507] to-transparent" />
              <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#050507] to-transparent" />
              
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex gap-3 w-max"
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <CSVCard icon={Share2} label="Instagram CSV" delay={0} />
                    <CSVCard icon={Smartphone} label="TikTok CSV" delay={0} />
                    <CSVCard icon={Smartphone} label="Snapchat CSV" delay={0} />
                    <CSVCard icon={MessageSquare} label="Twitter CSV" delay={0} />
                    <CSVCard icon={Briefcase} label="LinkedIn CSV" delay={0} />
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Visual Representation */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            {/* Center Drop Zone */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-3xl border-2 border-dashed border-white/10 bg-white/[0.02] backdrop-blur-2xl flex flex-col items-center justify-center group"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10"
              >
                <Upload size={48} className="text-[#7C5CFF]" />
              </motion.div>
              <span className="text-zinc-500 font-medium">Drop CSV Here</span>
              
              {/* Inner Glow Pulse */}
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl bg-[#7C5CFF]/10 blur-xl pointer-events-none"
              />
            </motion.div>

            {/* Floating CSV Elements */}
            <FloatingFile icon={Share2} color="text-pink-500" delay={0} x={-150} y={-150} rotate={-20} />
            <FloatingFile icon={Smartphone} color="text-cyan-400" delay={1.5} x={150} y={-120} rotate={15} />
            <FloatingFile icon={FileText} color="text-purple-400" delay={3} x={0} y={-180} rotate={0} />

            {/* Data Flow Lines (Simplified with SVGs) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#7C5CFF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M100,100 L250,250"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.path
                d="M400,100 L250,250"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              />
            </svg>

            {/* Ambient Background Glow for the Visual */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/5 to-transparent blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
}
