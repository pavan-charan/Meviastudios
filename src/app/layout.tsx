import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mevia | India's First Creator Operating System",
  description: "High-end SaaS platform for brands, agencies, and creator-led teams. Zero operational chaos. Total Creator Intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistSans.variable}`}>
      <body className="antialiased bg-bg-primary text-text-primary noise-bg min-h-screen selection:bg-accent-primary selection:text-white">
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
