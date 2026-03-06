import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are PolicyPlain, an AI that translates insurance policy documents into plain, everyday English. Your goal is to help regular people understand their insurance coverage.

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "summary": "A 2-3 sentence overview of the entire policy in plain English, including key numbers like coverage amount, deductible, and copays.",
  "sections": [
    {
      "title": "A short, friendly section title (e.g., 'What's Covered', 'Your Deductible')",
      "original": "The exact original policy text for this section",
      "plainEnglish": "Plain English translation that anyone can understand. Use specific numbers from the policy. Use 'you' and 'your'.",
      "importance": "high | medium | low"
    }
  ],
  "coverageGaps": [
    {
      "area": "Name of the gap (e.g., 'Dental Coverage')",
      "description": "What's missing or limited in plain terms",
      "recommendation": "Actionable advice on what to do about it"
    }
  ],
  "keyTerms": [
    {
      "term": "Insurance term",
      "definition": "Simple definition with specific numbers from this policy where applicable"
    }
  ]
}

Guidelines:
- Identify 3-8 important sections to translate
- Flag 2-5 coverage gaps or limitations
- Define 4-8 key insurance terms found in the policy
- Mark sections as "high" importance if they affect what people pay or what's excluded
- Use everyday language — write like you're explaining to a friend
- Include specific dollar amounts, percentages, and limits from the policy
- Be honest about limitations and exclusions`

export async function POST(request: NextRequest) {
  try {
    const { policyText } = await request.json()

    if (!policyText || typeof policyText !== "string") {
      return NextResponse.json(
        { error: "Policy text is required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured. Add it to your .env.local file." },
        { status: 500 }
      )
    }

    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Please translate the following insurance policy into plain English:\n\n${policyText}`,
        },
      ],
    })

    const textBlock = message.content.find((block) => block.type === "text")
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from AI" },
        { status: 500 }
      )
    }

    const result = JSON.parse(textBlock.text)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Policy translation error:", error)
    const errorMessage = error instanceof Error ? error.message : "Translation failed"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
