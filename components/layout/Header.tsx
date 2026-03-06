"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/car-insurance", label: "Car" },
  { href: "/health-insurance", label: "Health" },
  { href: "/life-insurance", label: "Life" },
  { href: "/dashboard", label: "AI Dashboard" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--brand-orange)] focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>
      <header
        className="fixed top-0 z-50 w-full border-b border-[var(--brand-charcoal)]/8 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
        role="banner"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-xl font-bold text-[var(--brand-charcoal)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Insura<span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-brown)] bg-clip-text text-transparent">gram</span>
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                  link.label === "AI Dashboard"
                    ? "text-[var(--brand-orange)] font-medium hover:bg-[var(--brand-orange)]/5"
                    : "text-[var(--brand-charcoal)]/60 hover:text-[var(--brand-charcoal)] hover:bg-[var(--brand-charcoal)]/[0.04]"
                }`}
              >
                {link.label === "AI Dashboard" && (
                  <Sparkles className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                )}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-[var(--brand-charcoal)]/60 hover:text-[var(--brand-charcoal)]"
              asChild
            >
              <Link href="/claims">File a Claim</Link>
            </Button>
            <Button
              size="sm"
              className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white px-5"
              asChild
            >
              <Link href="/get-quote">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[var(--brand-charcoal)]/8 bg-white"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-1">
                <nav className="flex flex-col" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)] hover:bg-[var(--brand-charcoal)]/[0.04] transition-colors py-2.5 px-3 rounded-lg text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label === "AI Dashboard" && (
                        <Sparkles className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5 text-[var(--brand-orange)]" />
                      )}
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 pt-3 border-t border-[var(--brand-charcoal)]/8">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[var(--brand-charcoal)]/70 text-sm"
                    asChild
                  >
                    <Link href="/claims">File a Claim</Link>
                  </Button>
                  <Button
                    className="w-full bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white text-sm"
                    asChild
                  >
                    <Link href="/get-quote">Get a Quote</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
