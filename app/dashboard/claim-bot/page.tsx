"use client"

import { ClaimBot } from "@/components/insurance/claim-bot"

export default function ClaimBotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ClaimBot</h1>
        <p className="text-muted-foreground mt-1">
          Snap a photo of the damage — AI auto-generates and files your insurance claim in seconds.
        </p>
      </div>
      <ClaimBot />
    </div>
  )
}
