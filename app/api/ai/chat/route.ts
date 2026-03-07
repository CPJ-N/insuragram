import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are InsuraBot, a friendly and knowledgeable AI insurance assistant. You help users with:
1. Understanding insurance products (life, health, car insurance)
2. Getting policy recommendations based on their needs
3. Starting the claims process
4. Answering insurance questions in plain language

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "message": "Your helpful response to the user in a conversational, friendly tone. Use markdown for formatting lists or emphasis.",
  "intent": "general" | "claims" | "policy_recommendation" | "quote_request",
  "suggestedActions": ["Array of 2-3 suggested follow-up actions or questions the user might want to ask"],
  "policyRecommendation": null | {
    "type": "life" | "health" | "car",
    "plan": "Recommended plan name",
    "monthlyPremium": "Estimated monthly cost",
    "coverage": "Coverage summary",
    "reason": "Why this plan fits their needs"
  }
}

Guidelines:
- Be warm, professional, and concise
- Use specific numbers and plan details from Insuragram's offerings
- If the user describes a situation needing a claim, guide them to ClaimBot
- For policy questions, recommend specific Insuragram products
- Life Insurance: starts at $500/month, flexible plans with tax benefits
- Health Insurance: starts at $600/month, covers hospitalization, emergency, pre/post care
- Car Insurance: starts at $2,000/year, covers collision, theft, weather damage
- Always provide helpful suggested next actions`

const sampleResponse = {
  message: "Welcome to Insuragram! I'm InsuraBot, your AI insurance assistant. I can help you with:\n\n- **Finding the right insurance** — life, health, or car coverage tailored to your needs\n- **Understanding your policy** — plain-English explanations of what you're covered for\n- **Filing a claim** — I'll guide you through the process step by step\n\nWhat can I help you with today?",
  intent: "general" as const,
  suggestedActions: [
    "What insurance do I need?",
    "I need to file a claim",
    "Compare your insurance plans",
  ],
  policyRecommendation: null,
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(sampleResponse)
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(sampleResponse)
    }

    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    })

    const textBlock = message.content.find((block) => block.type === "text")
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(sampleResponse)
    }

    const result = JSON.parse(textBlock.text)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json(sampleResponse)
  }
}
