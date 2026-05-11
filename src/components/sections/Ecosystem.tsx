"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ecosystem = [
  {
    title: "Mevia Studio",
    status: "Live",
    desc: "The core operating system for brands and agencies.",
    color: "from-accent-primary to-purple-900",
  },
  {
    title: "Mevia App",
    status: "Coming Soon",
    desc: "A dedicated mobile experience for creators to manage their business.",
    color: "from-accent-secondary to-blue-900",
  },
  {
    title: "Mevia Creates",
    status: "Coming Soon",
    desc: "An exclusive marketplace matching top brands with verified creators.",
    color: "from-emerald-400 to-emerald-900",
  },
];

export function Ecosystem() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-bg-secondary">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        <div className="absolute top-20 left-8 md:left-20 z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >
            The Mevia Ecosystem
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex w-[300vw] h-[60vh] mt-20">
          {ecosystem.map((item, idx) => (
            <div key={idx} className="w-[100vw] flex items-center justify-center px-8 md:px-20 shrink-0">
              <div className="w-full max-w-4xl h-full rounded-3xl relative overflow-hidden group">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                <div className="absolute inset-0 border border-white/10 rounded-3xl" />

                <div className="relative z-10 p-12 md:p-20 h-full flex flex-col justify-center">
                  <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white font-medium mb-6 w-max backdrop-blur-md">
                    {item.status}
                  </div>
                  <h3 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                    {item.title}
                  </h3>
                  <p className="text-xl md:text-3xl text-text-secondary max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
