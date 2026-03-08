"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Bot,
  ClipboardList,
  FileCheck,
  Zap,
  Settings,
} from "lucide-react";

type SidebarNavProps = React.HTMLAttributes<HTMLDivElement>

export function DashboardSidebar({ className }: SidebarNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Agent",
      icon: Bot,
      href: "/dashboard/agent",
      color: "text-blue-600",
      badge: "AI",
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
      label: "Products",
      icon: Zap,
      href: "/dashboard/ai-coverage",
      color: "text-amber-500",
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
                  {"badge" in route && route.badge && (
                    <span className="ml-auto text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
                      {route.badge}
                    </span>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
