"use client";

import { ClaimsManagement } from "@/components/insurance/claims-management";

export default function DashboardClaimsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Claims Management</h1>
      <ClaimsManagement />
    </div>
  );
} 