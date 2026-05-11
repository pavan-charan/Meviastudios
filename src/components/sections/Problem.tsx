"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { AlertCircle, FileSpreadsheet, FileWarning, Clock, TrendingDown, Users } from "lucide-react";

const problems = [
  { title: "Payment Delays", icon: Clock, desc: "Endless follow-ups for pending invoices." },
  { title: "Manual Workload", icon: FileSpreadsheet, desc: "Trapped in a web of messy spreadsheets." },
  { title: "Contract Headaches", icon: FileWarning, desc: "Lost terms and mismanaged agreements." },
  { title: "Follow-Up Fatigue", icon: AlertCircle, desc: "Chasing creators and clients constantly." },
  { title: "Deliverable Drop-Off", icon: TrendingDown, desc: "Missed deadlines and forgotten assets." },
  { title: "Agency Misalignment", icon: Users, desc: "Disjointed communication across teams." },
];

export function Problem() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-bg-secondary">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        
        <div className="text-center mb-16 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-4"
          >
            STOP MANAGING <span className="text-accent-secondary">EXCEL SHEETS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto"
          >
            The old way of managing creator campaigns is broken. It&apos;s time for an upgrade.
          </motion.p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-8 w-max">
          {problems.map((problem, idx) => (
            <ProblemCard key={idx} problem={problem} idx={idx} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}

function ProblemCard({ problem, idx, scrollYProgress }: { problem: { icon: React.ElementType, title: string, desc: string }, idx: number, scrollYProgress: MotionValue<number> }) {
  const Icon = problem.icon;
  const yOffset = idx % 2 === 0 ? 20 : -20;
  
  const y = useTransform(scrollYProgress, [0, 1], [0, yOffset * 5]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, idx % 2 === 0 ? 5 : -5]);

  return (
    <motion.div
      style={{ y, rotateZ }}
      className="w-[300px] md:w-[400px] shrink-0"
    >
      <GlassCard className="h-full flex flex-col items-start gap-4 p-8 border-t border-white/10 bg-white/[0.02]">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-accent-primary">
          <Icon size={32} />
        </div>
        <h3 className="text-2xl font-heading font-bold text-white mt-4">{problem.title}</h3>
        <p className="text-text-secondary text-lg leading-relaxed">{problem.desc}</p>
      </GlassCard>
    </motion.div>
  );
}
