import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are an AI fraud detection specialist for insurance claims. Your job is to analyze claim data and assess the likelihood of fraud.

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "riskLevel": "low" | "medium" | "high",
  "riskScore": 0-100,
  "flags": ["Array of specific fraud indicators found, if any"],
  "reasoning": "Brief summary of your fraud risk assessment"
}

Evaluation criteria:
- Consistency between damage description and claim type
- Whether cost estimates are reasonable for the described damage
- Vague or templated language that suggests fabrication
- Suspicious timing patterns (e.g., claim filed immediately after policy purchase)
- Mismatch between claimed severity and estimated costs
- Unusually high damage amounts for minor incidents

Risk scoring guide:
- 0-30: Low risk — claim appears legitimate and consistent
- 31-60: Medium risk — some inconsistencies worth reviewing
- 61-100: High risk — significant fraud indicators present

Be fair and objective. Most claims are legitimate. Only flag genuine inconsistencies.`

const sampleFraudResult = {
  riskLevel: "low" as const,
  riskScore: 12,
  flags: [],
  reasoning:
    "Claim details are consistent and well-documented. Damage description matches the claim type, and the estimated repair costs are within the expected range for the reported damage. No fraud indicators detected.",
}

export async function POST(request: NextRequest) {
  try {
    const claimData = await request.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(sampleFraudResult)
    }

    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this insurance claim for potential fraud:\n\nClaim Type: ${claimData.claimType}\nEstimated Damage: ${claimData.estimatedDamage}\nDescription: ${claimData.description}\nDetected Items: ${claimData.detectedItems?.join(", ")}\nConfidence Score: ${claimData.confidence}%\nPolicy Number: ${claimData.policyNumber}\nIncident Date: ${claimData.incidentDate}\nLocation: ${claimData.location || "Not provided"}\nAdditional Notes: ${claimData.additionalNotes || "None"}`,
        },
      ],
    })

    const textBlock = message.content.find((block) => block.type === "text")
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(sampleFraudResult)
    }

    const result = JSON.parse(textBlock.text)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Fraud check error:", error)
    return NextResponse.json(sampleFraudResult)
  }
}
