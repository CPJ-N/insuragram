"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { motion } from "framer-motion";

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
        <footer className="bg-gradient-to-b from-white to-gray-50/50 border-t">
          <div className="max-w-[1400px] mx-auto px-6 py-16">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.div {...footerAnimation} transition={{ delay: 0.1 }}>
                <h3 className="text-lg font-semibold mb-6 text-[var(--brand-charcoal)] relative inline-block">
                  Insurance
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[var(--brand-orange)]" />
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/life-insurance", label: "Life Insurance" },
                    { href: "/health-insurance", label: "Health Insurance" },
                    { href: "/car-insurance", label: "Car Insurance" }
                  ].map((link) => (
                    <motion.li key={link.href} {...linkAnimation}>
                      <Link 
                        href={link.href} 
                        className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-orange)] transition-colors flex items-center gap-2"
                      >
                        <span className="h-1 w-1 rounded-full bg-[var(--brand-orange)]/70" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...footerAnimation} transition={{ delay: 0.2 }}>
                <h3 className="text-lg font-semibold mb-6 text-[var(--brand-charcoal)] relative inline-block">
                  Company
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[var(--brand-orange)]" />
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/about", label: "About Us" },
                    { href: "/careers", label: "Careers" },
                    { href: "/contact", label: "Contact" }
                  ].map((link) => (
                    <motion.li key={link.href} {...linkAnimation}>
                      <Link 
                        href={link.href} 
                        className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-orange)] transition-colors flex items-center gap-2"
                      >
                        <span className="h-1 w-1 rounded-full bg-[var(--brand-orange)]/70" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...footerAnimation} transition={{ delay: 0.3 }}>
                <h3 className="text-lg font-semibold mb-6 text-[var(--brand-charcoal)] relative inline-block">
                  Support
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[var(--brand-orange)]" />
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/claims", label: "Claims" },
                    { href: "/faq", label: "FAQ" },
                    { href: "/help", label: "Help Center" }
                  ].map((link) => (
                    <motion.li key={link.href} {...linkAnimation}>
                      <Link 
                        href={link.href} 
                        className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-orange)] transition-colors flex items-center gap-2"
                      >
                        <span className="h-1 w-1 rounded-full bg-[var(--brand-orange)]/70" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...footerAnimation} transition={{ delay: 0.4 }}>
                <h3 className="text-lg font-semibold mb-6 text-[var(--brand-charcoal)] relative inline-block">
                  Legal
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[var(--brand-orange)]" />
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/privacy", label: "Privacy Policy" },
                    { href: "/terms", label: "Terms of Service" },
                    { href: "/licenses", label: "Licenses" }
                  ].map((link) => (
                    <motion.li key={link.href} {...linkAnimation}>
                      <Link 
                        href={link.href} 
                        className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-orange)] transition-colors flex items-center gap-2"
                      >
                        <span className="h-1 w-1 rounded-full bg-[var(--brand-orange)]/70" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div 
              className="border-t mt-12 pt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-[var(--brand-charcoal)]/60">
                © 2024 Insuragram. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </body>
    </html>
  );
} 