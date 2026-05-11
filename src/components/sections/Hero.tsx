"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, MotionValue } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

const FRAME_COUNT = 80;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i}.webp`;
      img.onload = () => {
        loadedCount++;
        setLoaded(Math.floor((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for drawing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    mass: 0.1,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Render canvas
  useAnimationFrame(() => {
    if (images.length === FRAME_COUNT && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(frameIndex.get())));
        const img = images[index];
        if (img && img.complete) {
          // Fill canvas maintaining aspect ratio
          const canvas = canvasRef.current;
          const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
          const centerShiftX = (canvas.width - img.width * ratio) / 2;
          const centerShiftY = (canvas.height - img.height * ratio) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
        }
      }
    }
  });

  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Velocity-based anti-gravity effect for particles/UI elements
  const scrollVelocity = useVelocity(scrollYProgress);
  const velocityY = useTransform(scrollVelocity, [-1, 1], [50, -50]);
  const smoothVelocity = useSpring(velocityY, { stiffness: 50, damping: 20 });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-bg-primary">

      {/* Loading Overlay */}
      {loaded < 100 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary text-white">
          <div className="font-heading text-4xl mb-4 text-gradient">Mevia</div>
          <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-primary transition-all duration-300"
              style={{ width: `${loaded}%` }}
            />
          </div>
          <div className="mt-4 text-text-secondary text-sm">Loading Intelligence... {loaded}%</div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        />

        {/* Floating Particles/Elements affected by scroll velocity */}
        <motion.div
          style={{ y: smoothVelocity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent-secondary/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Typography Sequence */}
        <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">

          <SequenceBlock
            progress={scrollYProgress}
            range={[0, 0.45]}
            className="absolute inset-0 flex flex-col items-start justify-center text-left"
          >
            <h1 className="font-heading font-bold tracking-tighter text-white max-w-5xl leading-[1.1] drop-shadow-2xl mt-24 md:mt-32">
              <span className="bg-gradient-to-r from-[#7C5CFF] to-[#5A3BFF] bg-clip-text text-transparent block text-3xl md:text-5xl mb-6 font-medium tracking-tight">
                India's First Creator Operating System
              </span>
              <span className="text-5xl md:text-7xl lg:text-8xl">
                For Brands, Agencies and Creator<br />Led Teams
              </span>
            </h1>

            <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-6 pointer-events-auto">
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#5A3BFF] px-8 py-3.5 text-[15px] font-medium text-white shadow-[0_4px_14px_0_rgba(124,92,255,0.39)] transition-shadow hover:shadow-[0_6px_20px_rgba(124,92,255,0.23),0_0_20px_rgba(124,92,255,0.6)]"
              >
                Book Demo
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.8)" }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-black/10 bg-white/60 backdrop-blur-md px-8 py-3.5 text-[15px] font-medium text-[#1A1A1A] transition-colors"
              >
                Go to App
              </motion.button>
            </div>
          </SequenceBlock>

          <SequenceBlock
            progress={scrollYProgress}
            range={[0.5, 0.7]}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <TextReveal
              text="Stop Managing Excel Sheets."
              className="font-heading text-3xl md:text-5xl text-text-secondary justify-center mb-2"
            />
            <TextReveal
              text="Start Managing Impact."
              className="font-heading text-5xl md:text-7xl font-bold text-gradient justify-center"
            />
          </SequenceBlock>

          <SequenceBlock
            progress={scrollYProgress}
            range={[0.75, 1]}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <TextReveal
              text="Zero Operational Friction."
              className="font-heading text-3xl md:text-5xl text-accent-primary justify-center mb-2"
            />
            <TextReveal
              text="Total Creator Intelligence."
              className="font-heading text-5xl md:text-7xl font-bold text-white justify-center"
            />
          </SequenceBlock>

        </div>
      </div>
    </section>
  );
}

function SequenceBlock({
  children,
  progress,
  range,
  className
}: {
  children: React.ReactNode,
  progress: MotionValue<number>,
  range: [number, number],
  className?: string
}) {
  // Map progress range to opacity: fade in first half, fade out second half
  const midPoint = range[0] + (range[1] - range[0]) / 2;
  const opacity = useTransform(
    progress,
    [range[0], midPoint, range[1]],
    [0, 1, 0]
  );

  const y = useTransform(
    progress,
    [range[0], midPoint, range[1]],
    [50, 0, -50]
  );

  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}
