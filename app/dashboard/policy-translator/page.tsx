"use client"

import { PolicyTranslator } from "@/components/insurance/policy-translator"

export default function PolicyTranslatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">PolicyPlain</h1>
        <p className="text-muted-foreground mt-1">
          Translate your insurance policy into plain English. Find coverage gaps before they find you.
        </p>
      </div>
      <PolicyTranslator />
    </div>
  )
}
