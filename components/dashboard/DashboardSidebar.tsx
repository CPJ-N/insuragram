"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  Settings,
  ClipboardList,
  FileCheck,
  BookOpen,
  Camera,
} from "lucide-react";

type SidebarNavProps = React.HTMLAttributes<HTMLDivElement>

export function DashboardSidebar({ className }: SidebarNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Customers",
      icon: Users,
      href: "/dashboard/crm",
      color: "text-violet-500",
    },
    {
      label: "Claims",
      icon: ClipboardList,
      href: "/dashboard/claims",
      color: "text-pink-500",
    },
    {
      label: "Policies",
      icon: FileCheck,
      href: "/dashboard/policies",
      color: "text-orange-500",
    },
    {
      label: "PolicyPlain",
      icon: BookOpen,
      href: "/dashboard/policy-translator",
      color: "text-teal-500",
    },
    {
      label: "ClaimBot",
      icon: Camera,
      href: "/dashboard/claim-bot",
      color: "text-rose-500",
    },
    {
      label: "Documents",
      icon: FileText,
      href: "/dashboard/documents",
      color: "text-emerald-500",
    },
    {
      label: "Insurance",
      icon: Shield,
      href: "/dashboard/insurance",
      color: "text-blue-500",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className={cn("pb-12 border-r h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href="/dashboard">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Insuragram
            </h2>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", {
                  "bg-secondary": pathname === route.href,
                })}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 