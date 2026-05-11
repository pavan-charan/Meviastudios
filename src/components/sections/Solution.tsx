"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {prefix}<motion.span>{display}</motion.span>{suffix}
    </span>
  );
}

export function Solution() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-bg-secondary to-bg-primary overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Mevia fixes everything — <span className="text-accent-primary">at once.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Experience a dramatic shift in how your team operates. Less friction, more intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          
          <MetricCard 
            title="Reduction in Ops Load" 
            value={80} 
            suffix="%" 
            desc="Automate the repetitive tasks and focus on creative strategy."
            delay={0.1}
          />
          
          <MetricCard 
            title="Faster Execution" 
            value={3} 
            suffix="x" 
            desc="Launch and manage campaigns at unprecedented speeds."
            delay={0.2}
          />
          
          <MetricCard 
            title="Deadline Compliance" 
            value={99} 
            suffix="%" 
            desc="Never miss a deliverable with automated tracking."
            delay={0.3}
          />

        </div>
      </div>
    </section>
  );
}

function MetricCard({ title, value, suffix, desc, delay }: { title: string, value: number, suffix: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/[0.03] border border-white/10 relative group"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="font-heading text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(124,92,255,0.5)] relative z-10">
        <Counter value={value} suffix={suffix} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{title}</h3>
      <p className="text-text-secondary relative z-10">{desc}</p>
    </motion.div>
  );
}
