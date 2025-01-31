import { Inter } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";
import RootLayout from "./layout-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export { metadata };

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
} 