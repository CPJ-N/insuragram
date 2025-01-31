import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Insuragram - Your Insurance Platform",
  description: "Comprehensive insurance solutions for your car, health, and life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <footer className="bg-gray-50 border-t">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Insurance</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/life-insurance" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Life Insurance
                    </Link>
                  </li>
                  <li>
                    <Link href="/health-insurance" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Health Insurance
                    </Link>
                  </li>
                  <li>
                    <Link href="/car-insurance" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Car Insurance
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/claims" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Claims
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/licenses" className="text-[var(--brand-charcoal)]/70 hover:text-[var(--brand-charcoal)]">
                      Licenses
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-12 pt-8 text-center text-[var(--brand-charcoal)]/70">
              <p>© 2024 Insuragram. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
