"use client";

import { motion } from "framer-motion";
import { GlowingButton } from "@/components/ui/GlowingButton";

export function CTA() {
  return (
    <section className="relative py-40 overflow-hidden bg-bg-secondary">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary opacity-50" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-accent-primary/20 rounded-full blur-[100px] pointer-events-none" 
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          // Use deterministic pseudo-random values based on index to avoid hydration mismatch
          const top = ((i * 17) % 100);
          const left = ((i * 31) % 100);
          const duration = 3 + ((i * 5) % 5);
          const delay = ((i * 3) % 5);

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            Join the Intelligence <br className="hidden md:block" />
            <span className="text-gradient-accent">Revolution</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-12">
            Stop managing spreadsheets. Start managing impact with Mevia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <GlowingButton variant="primary" className="w-full sm:w-auto text-lg">
              Book a Demo
            </GlowingButton>
            <GlowingButton variant="secondary" className="w-full sm:w-auto text-lg">
              Join Waitlist
            </GlowingButton>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
