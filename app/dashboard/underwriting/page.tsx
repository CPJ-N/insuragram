"use client"

import { UnderwritingCopilot } from "@/components/insurance/underwriting-copilot"

export default function UnderwritingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Underwriting Co-pilot</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered risk assessment with confidence scores and transparent reasoning.
        </p>
      </div>
      <UnderwritingCopilot />
    </div>
  )
}
