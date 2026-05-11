"use client";

import { useRef, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export function GlowingButton({ children, className, variant = "primary", ...props }: GlowingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-4 font-semibold transition-all duration-300",
        variant === "primary" 
          ? "bg-accent-primary text-white border border-accent-secondary/30 shadow-[0_0_20px_rgba(124,92,255,0.3)]" 
          : "glass text-white hover:bg-white/5",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, ${
            variant === "primary" ? "rgba(255,255,255,0.25)" : "rgba(124,92,255,0.15)"
          }, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.button>
  );
}
