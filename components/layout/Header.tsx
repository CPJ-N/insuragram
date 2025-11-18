"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        role="banner"
      >
      <div className="max-w-[1400px] mx-auto px-6 flex h-20 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-2 relative">
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-brown)] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Insuragram
            </motion.span>
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-brown)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </Link>
          <nav className="hidden lg:flex gap-8" aria-label="Main navigation">
            {[
              { href: "/car-insurance", label: "Car Insurance" },
              { href: "/health-insurance", label: "Health Insurance" },
              { href: "/life-insurance", label: "Life Insurance" }
            ].map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link 
                  href={link.href}
                  className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)] transition-colors py-2"
                >
                  {link.label}
                </Link>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--brand-orange)]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                variant="ghost" 
                className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)] hover:bg-transparent"
                asChild
              >
                <Link href="/claims">File a Claim</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white px-6"
                asChild
              >
                <Link href="/get-quote">Get a Quote</Link>
              </Button>
            </motion.div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-4 space-y-4">
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {[
                  { href: "/car-insurance", label: "Car Insurance" },
                  { href: "/health-insurance", label: "Health Insurance" },
                  { href: "/life-insurance", label: "Life Insurance" }
                ].map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)] transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[var(--brand-charcoal)]/70"
                  asChild
                >
                  <Link href="/claims">File a Claim</Link>
                </Button>
                <Button 
                  className="w-full justify-start bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white"
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