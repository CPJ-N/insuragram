"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {!isDashboard && <Header />}
        <main className={isDashboard ? "" : "pt-16"}>{children}</main>
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
} 