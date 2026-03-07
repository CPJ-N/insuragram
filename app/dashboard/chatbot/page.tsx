"use client"

import { AIChatbot } from "@/components/insurance/ai-chatbot"

export default function ChatbotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">InsuraBot</h1>
        <p className="text-muted-foreground mt-1">
          Your AI insurance assistant — get quotes, ask questions, or start a claim in seconds.
        </p>
      </div>
      <AIChatbot />
    </div>
  )
}
