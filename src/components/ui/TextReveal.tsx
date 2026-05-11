"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("relative flex flex-wrap gap-x-2 gap-y-1", className)}>
      {words.map((word, i) => {
        // Calculate dynamic start and end points for each word based on its index
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        return (
          <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </div>
  );
}

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const filter = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);

  return (
    <motion.span 
      style={{ opacity, y, filter }}
      className="inline-block will-change-transform"
    >
      {word}
    </motion.span>
  );
}
