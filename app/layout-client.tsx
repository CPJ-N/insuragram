"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const linkAnimation = {
    whileHover: { x: 5, color: "var(--brand-orange)" },
    transition: { duration: 0.2 }
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 