import "./globals.css";
import { metadata } from "./metadata";
import RootLayout from "./layout-client";

export { metadata };

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
} 