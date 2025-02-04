"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <DashboardSidebar className="w-64 flex-none" />
        <div className="flex-1">
          <DashboardHeader />
          <main className="flex-1 p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 