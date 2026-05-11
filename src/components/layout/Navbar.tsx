"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Trigger glass navbar on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="group relative text-[15px] font-medium text-[#1A1A1A]/80 transition-opacity hover:text-[#1A1A1A] hover:opacity-100"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#1A1A1A] transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
  );

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 z-50 mx-auto flex flex-col justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          top: isScrolled ? "16px" : "0px",
          width: isScrolled ? "calc(100% - 32px)" : "100%",
          maxWidth: isScrolled ? "1200px" : "100%",
          padding: isScrolled ? "12px 24px" : "24px 40px",
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0)",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          borderRadius: isScrolled ? "9999px" : "0px",
          border: isScrolled ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(0, 0, 0, 0)",
          boxShadow: isScrolled ? "0 10px 30px -10px rgba(0, 0, 0, 0.1)" : "0 4px 30px rgba(0, 0, 0, 0)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // smooth slide down on initial load
          opacity: { duration: 0.8 },
        }}
      >
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Image
                src="/assets/mevia-studio-transparent-logo.svg"
                alt="Mevia Logo"
                width={160}
                height={40}
                className="h-12 w-auto sm:h-10"
                priority
              />
            </motion.div>
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden items-center gap-8 lg:flex">
            <div
              className="relative py-2"
              onMouseEnter={() => setIsSolutionsHovered(true)}
              onMouseLeave={() => setIsSolutionsHovered(false)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-[#1A1A1A]/80 transition-opacity hover:text-[#1A1A1A] hover:opacity-100">
                Solutions
                <motion.span
                  animate={{ rotate: isSolutionsHovered ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isSolutionsHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-black/5 bg-white/70 p-2 shadow-xl backdrop-blur-xl"
                  >
                    <div className="flex flex-col">
                      {["Creators", "Agencies", "Brands"].map((item) => (
                        <Link
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="rounded-xl px-4 py-3 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-black/5"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="#features">Features</NavLink>
            <NavLink href="#products">Products</NavLink>
            <NavLink href="#why-mevia">Why Mevia</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </nav>

          {/* Right Section (Desktop) */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link
              href="/login"
              className="text-[15px] font-medium text-[#1A1A1A]/80 transition-opacity hover:text-[#1A1A1A] hover:opacity-100"
            >
              Go to App
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#5A3BFF] px-6 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_0_rgba(124,92,255,0.39)] transition-shadow hover:shadow-[0_6px_20px_rgba(124,92,255,0.23),0_0_20px_rgba(124,92,255,0.6)]"
            >
              <span className="relative z-10">Book Demo</span>
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-full p-2 text-[#1A1A1A] transition-colors hover:bg-black/5 lg:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Slide-in */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto border-l border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <Image
                  src="/assets/mevia-studio-transparent-logo.svg"
                  alt="Mevia Logo"
                  width={140}
                  height={32}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-full p-2 text-[#1A1A1A] transition-colors hover:bg-black/5"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 border-b border-black/5 pb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-black/40">Solutions</div>
                  {["Creators", "Agencies", "Brands"].map((item) => (
                    <Link
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-lg font-medium text-[#1A1A1A]"
                    >
                      {item}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-4 border-b border-black/5 pb-6">
                  <Link href="#features" onClick={() => setIsMobileOpen(false)} className="text-lg font-medium text-[#1A1A1A]">Features</Link>
                  <Link href="#products" onClick={() => setIsMobileOpen(false)} className="text-lg font-medium text-[#1A1A1A]">Products</Link>
                  <Link href="#why-mevia" onClick={() => setIsMobileOpen(false)} className="text-lg font-medium text-[#1A1A1A]">Why Mevia</Link>
                  <Link href="#pricing" onClick={() => setIsMobileOpen(false)} className="text-lg font-medium text-[#1A1A1A]">Pricing</Link>
                </div>

                <div className="mt-auto flex flex-col gap-4 pt-6">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl border border-black/10 py-3 text-center font-medium text-[#1A1A1A] transition-colors hover:bg-black/5"
                  >
                    Go to App
                  </Link>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="w-full rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#5A3BFF] py-3 text-center font-medium text-white shadow-lg transition-transform active:scale-95"
                  >
                    Book Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
