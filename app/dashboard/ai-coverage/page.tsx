"use client"

import { AICoverage } from "@/components/insurance/ai-coverage"

export default function AICoveragePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Liability & Specialty Coverage</h1>
        <p className="text-muted-foreground mt-1">
          Purpose-built insurance products for AI companies — covering liability, errors, cyber risk, and governance.
        </p>
      </div>
      <AICoverage />
    </div>
  )
}
