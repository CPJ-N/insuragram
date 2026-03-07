import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are an AI claims communication specialist for an insurance company called Insuragram. Your job is to draft professional, empathetic communications to policyholders about their insurance claims.

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "subject": "Email subject line",
  "body": "The full email body with appropriate greeting, content, and closing. Use a warm but professional tone. Include specific claim details provided.",
  "tone": "empathetic" | "informational" | "congratulatory",
  "summary": "One-sentence summary of what the email communicates"
}

Guidelines:
- Always address the policyholder by name if provided
- Reference specific claim IDs, policy numbers, and amounts
- For approvals: be congratulatory and clearly state the settlement amount and next steps
- For denials: be empathetic, explain the reason clearly, and mention appeal options
- For updates: be informational and set clear expectations on timeline
- For document requests: be specific about what's needed and why
- Keep emails concise but thorough
- Always include a closing with contact information for follow-up
- Sign off as "Insuragram Claims Team"`

const sampleDraft = {
  subject: "Update on Your Insurance Claim #CLM-2024-001",
  body: "Dear Valued Policyholder,\n\nThank you for your patience while we process your claim #CLM-2024-001.\n\nWe're pleased to inform you that your claim has been reviewed and approved. Here are the details:\n\n- Claim Amount: $4,000\n- Settlement Method: Direct deposit\n- Expected Processing Time: 3-5 business days\n\nThe settlement amount will be deposited directly into your account on file. You'll receive a confirmation email once the transfer is complete.\n\nIf you have any questions about your claim or need further assistance, please don't hesitate to reach out to us.\n\nWarm regards,\nInsuragram Claims Team\nEmail: claims@insuragram.com\nPhone: 1-800-INSURA",
  tone: "congratulatory" as const,
  summary: "Claim approval notification with settlement details and next steps.",
}

export async function POST(request: NextRequest) {
  try {
    const { claimData, communicationType } = await request.json()

    if (!claimData || !communicationType) {
      return NextResponse.json(sampleDraft)
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(sampleDraft)
    }

    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Draft a "${communicationType}" email for this claim:\n\nClaim ID: ${claimData.claimId || "N/A"}\nPolicyholder Name: ${claimData.name || "Valued Policyholder"}\nPolicy Number: ${claimData.policyNumber || "N/A"}\nClaim Type: ${claimData.claimType || "N/A"}\nClaim Amount: ${claimData.amount || "N/A"}\nStatus: ${claimData.status || "N/A"}\nAdditional Context: ${claimData.additionalContext || "None"}`,
        },
      ],
    })

    const textBlock = message.content.find((block) => block.type === "text")
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(sampleDraft)
    }

    const result = JSON.parse(textBlock.text)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Draft communication error:", error)
    return NextResponse.json(sampleDraft)
  }
}
