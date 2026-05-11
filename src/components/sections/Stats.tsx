"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform, useScroll } from "framer-motion";

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

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-bg-primary border-t border-white/5">
      
      {/* Subtle parallax background grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          y,
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="flex flex-col items-center justify-center p-8">
            <div className="font-heading text-5xl md:text-7xl font-bold text-gradient-accent mb-4">
              <Counter prefix="₹" value={3375} />
            </div>
            <h3 className="text-xl text-white font-medium mb-2">Crore Market</h3>
            <p className="text-text-secondary">The booming creator economy in India.</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8">
            <div className="font-heading text-5xl md:text-7xl font-bold text-white mb-4">
              <Counter value={25} suffix="%" />
            </div>
            <h3 className="text-xl text-white font-medium mb-2">YoY Growth</h3>
            <p className="text-text-secondary">Scaling faster than traditional advertising.</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8">
            <div className="font-heading text-5xl md:text-7xl font-bold text-text-secondary mb-4">
              <Counter value={80} suffix="%" />
            </div>
            <h3 className="text-xl text-white font-medium mb-2">Still Using Excel</h3>
            <p className="text-text-secondary">Trapped in legacy, inefficient workflows.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
