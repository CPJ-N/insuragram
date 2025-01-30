import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Insuragram - Compare & Buy Insurance Online",
  description: "Compare and buy insurance plans from top insurers at the best price",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-[var(--brand-primary)]">
                Insuragram
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/life-insurance" className="text-[var(--brand-text-light)] hover:text-[var(--brand-primary)]">
                  Life Insurance
                </Link>
                <Link href="/health-insurance" className="text-[var(--brand-text-light)] hover:text-[var(--brand-primary)]">
                  Health Insurance
                </Link>
                <Link href="/car-insurance" className="text-[var(--brand-text-light)] hover:text-[var(--brand-primary)]">
                  Car Insurance
                </Link>
                <Link 
                  href="/get-quote" 
                  className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-full hover:bg-[var(--brand-primary-dark)]"
                >
                  Get Quote
                </Link>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/path/to/avatar.jpg" alt="User Name" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/logout">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-50 border-t">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Insurance</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/life-insurance" className="text-[var(--brand-text-light)] hover:text-[var(--brand-primary)]">
                      Life Insurance
                    </Link>
                  </li>
                  <li>
                    <Link href="/health-insurance" className="text-gray-600 hover:text-blue-600">
                      Health Insurance
                    </Link>
                  </li>
                  <li>
                    <Link href="/car-insurance" className="text-gray-600 hover:text-blue-600">
                      Car Insurance
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-blue-600">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-gray-600 hover:text-blue-600">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/claims" className="text-gray-600 hover:text-blue-600">
                      Claims
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-gray-600 hover:text-blue-600">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="text-gray-600 hover:text-blue-600">
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/licenses" className="text-gray-600 hover:text-blue-600">
                      Licenses
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-12 pt-8 text-center text-gray-600">
              <p>© 2024 Insuragram. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
