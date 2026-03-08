import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const AGENT_SYSTEM_PROMPT = `You are InsuraAgent, the AI-powered insurance assistant for Insuragram. You help insurance professionals and customers with everything insurance-related.

You have access to tools that let you:
- Translate insurance policies into plain English
- Assess risk and underwrite applications
- Draft professional claim communications
- Run fraud checks on claims
- Look up policy and customer information

Guidelines:
- Be warm, professional, and concise
- When users describe a situation, proactively use the right tool
- After using a tool, summarize the key findings conversationally
- If you need more information to use a tool, ask for it
- For photo-based claim analysis, tell the user to use the upload button in the tool panel
- Use specific numbers, names, and details from tool results
- You can use multiple tools in sequence to complete complex tasks
- If a user wants to file a claim, guide them through the process step by step`

const tools: Anthropic.Tool[] = [
  {
    name: "translate_policy",
    description:
      "Translates insurance policy text into plain, everyday English. Use when a user pastes policy text, asks about policy terms, or wants to understand their coverage.",
    input_schema: {
      type: "object" as const,
      properties: {
        policyText: {
          type: "string",
          description: "The insurance policy text to translate",
        },
      },
      required: ["policyText"],
    },
  },
  {
    name: "underwrite",
    description:
      "Performs AI risk assessment for insurance applications. Use when a user wants a quote, applies for insurance, or asks about pricing. Returns risk score, confidence, premium adjustment, and detailed reasoning.",
    input_schema: {
      type: "object" as const,
      properties: {
        insuranceType: {
          type: "string",
          enum: ["Life Insurance", "Health Insurance", "Car Insurance"],
          description: "Type of insurance",
        },
        name: { type: "string", description: "Applicant name" },
        age: { type: "string", description: "Applicant age" },
        occupation: { type: "string", description: "Applicant occupation" },
        location: { type: "string", description: "Applicant location" },
        income: { type: "string", description: "Annual income" },
        healthStatus: {
          type: "string",
          enum: ["Excellent", "Good", "Fair", "Poor"],
          description: "Health status",
        },
        smoker: { type: "string", enum: ["Yes", "No", "Former"], description: "Smoking status" },
        preExistingConditions: { type: "string", description: "Pre-existing conditions" },
        coverageAmount: { type: "string", description: "Requested coverage amount" },
        drivingHistory: { type: "string", description: "Driving history (for car insurance)" },
        vehicleType: { type: "string", description: "Vehicle type (for car insurance)" },
      },
      required: ["insuranceType"],
    },
  },
  {
    name: "draft_communication",
    description:
      "Drafts professional insurance claim communications (emails). Use when a user wants to notify a policyholder about claim status, request documents, or send approval/denial letters.",
    input_schema: {
      type: "object" as const,
      properties: {
        communicationType: {
          type: "string",
          enum: [
            "Claim Approval Notification",
            "Claim Denial with Explanation",
            "Claim Status Update",
            "Document Request",
            "Payment Confirmation",
            "Claim Acknowledgment",
          ],
          description: "Type of communication to draft",
        },
        claimId: { type: "string", description: "Claim ID" },
        name: { type: "string", description: "Policyholder name" },
        policyNumber: { type: "string", description: "Policy number" },
        claimType: { type: "string", description: "Type of claim" },
        amount: { type: "string", description: "Claim amount" },
        status: { type: "string", description: "Claim status" },
        additionalContext: { type: "string", description: "Additional context for the communication" },
      },
      required: ["communicationType"],
    },
  },
  {
    name: "fraud_check",
    description:
      "Runs AI fraud detection on insurance claims. Use when reviewing a claim for suspicious activity or as part of the claims processing workflow.",
    input_schema: {
      type: "object" as const,
      properties: {
        claimType: { type: "string", description: "Type of claim" },
        estimatedDamage: { type: "string", description: "Estimated damage amount" },
        description: { type: "string", description: "Claim description" },
        detectedItems: {
          type: "array",
          items: { type: "string" },
          description: "Detected damage items",
        },
        confidence: { type: "number", description: "AI confidence score" },
        policyNumber: { type: "string", description: "Policy number" },
        incidentDate: { type: "string", description: "Date of incident" },
        location: { type: "string", description: "Incident location" },
      },
      required: ["claimType", "description"],
    },
  },
  {
    name: "lookup_policy",
    description:
      "Looks up policy or customer information. Use when a user asks about a specific policy, customer details, or needs to check coverage details.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "Search query — policy number, customer name, or description" },
      },
      required: ["query"],
    },
  },
]

// Execute tools by calling the existing internal API routes
async function executeTool(
  toolName: string,
  toolInput: Record<string, unknown>,
  baseUrl: string
): Promise<Record<string, unknown>> {
  try {
    switch (toolName) {
      case "translate_policy": {
        const res = await fetch(`${baseUrl}/api/ai/translate-policy`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ policyText: toolInput.policyText }),
        })
        return await res.json()
      }
      case "underwrite": {
        const res = await fetch(`${baseUrl}/api/ai/underwrite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            insuranceType: toolInput.insuranceType,
            applicantData: toolInput,
          }),
        })
        return await res.json()
      }
      case "draft_communication": {
        const res = await fetch(`${baseUrl}/api/ai/draft-communication`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            communicationType: toolInput.communicationType,
            claimData: toolInput,
          }),
        })
        return await res.json()
      }
      case "fraud_check": {
        const res = await fetch(`${baseUrl}/api/ai/fraud-check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toolInput),
        })
        return await res.json()
      }
      case "lookup_policy": {
        // Demo data — in production this would query a database
        return {
          found: true,
          policy: {
            policyNumber: "POL-2024-001",
            holder: "Sarah Johnson",
            type: "Auto Insurance",
            status: "Active",
            premium: "$2,400/year",
            coverage: "$100,000 liability, $50,000 collision",
            startDate: "2024-01-15",
            endDate: "2025-01-15",
            claims: [
              { id: "CLM-2024-003", date: "2024-06-15", amount: "$3,200", status: "Approved" },
            ],
          },
        }
      }
      default:
        return { error: `Unknown tool: ${toolName}` }
    }
  } catch (error) {
    console.error(`Tool ${toolName} error:`, error)
    return { error: `Tool execution failed: ${error instanceof Error ? error.message : "Unknown error"}` }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      // Return a demo response when no API key
      return NextResponse.json({
        response: "Welcome to InsuraAgent! I'm your AI insurance assistant. I can help you with:\n\n- **Translating policies** into plain English\n- **Underwriting** risk assessments\n- **Drafting communications** for claims\n- **Fraud detection** on suspicious claims\n- **Looking up** policy information\n\nWhat can I help you with?",
        toolCalls: [],
      })
    }

    const client = new Anthropic({ apiKey })

    // Build the Anthropic messages from our format
    const anthropicMessages: Anthropic.MessageParam[] = messages.map(
      (m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })
    )

    // Get the base URL for internal API calls
    const baseUrl = request.nextUrl.origin

    // Tool use loop — keep calling Claude until it stops requesting tools
    const toolCalls: Array<{
      tool: string
      input: Record<string, unknown>
      result: Record<string, unknown>
    }> = []

    let currentMessages = anthropicMessages
    let finalResponse = ""
    let iterations = 0
    const maxIterations = 5

    while (iterations < maxIterations) {
      iterations++

      const message = await client.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 4096,
        system: AGENT_SYSTEM_PROMPT,
        tools,
        messages: currentMessages,
      })

      // Collect text and tool use blocks
      const textBlocks: string[] = []
      const toolUseBlocks: Anthropic.ToolUseBlock[] = []

      for (const block of message.content) {
        if (block.type === "text") {
          textBlocks.push(block.text)
        } else if (block.type === "tool_use") {
          toolUseBlocks.push(block)
        }
      }

      // If no tool calls, we're done
      if (toolUseBlocks.length === 0) {
        finalResponse = textBlocks.join("\n")
        break
      }

      // Execute all tool calls
      const toolResults: Anthropic.ToolResultBlockParam[] = []

      for (const toolUse of toolUseBlocks) {
        const result = await executeTool(
          toolUse.name,
          toolUse.input as Record<string, unknown>,
          baseUrl
        )
        toolCalls.push({
          tool: toolUse.name,
          input: toolUse.input as Record<string, unknown>,
          result,
        })
        toolResults.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: JSON.stringify(result),
        })
      }

      // Add assistant message and tool results to conversation
      currentMessages = [
        ...currentMessages,
        { role: "assistant" as const, content: message.content },
        { role: "user" as const, content: toolResults },
      ]

      // If stop_reason is end_turn after tool results, collect any text
      if (message.stop_reason === "end_turn") {
        finalResponse = textBlocks.join("\n")
        break
      }
    }

    return NextResponse.json({
      response: finalResponse,
      toolCalls,
    })
  } catch (error) {
    console.error("Agent error:", error)
    return NextResponse.json({
      response: "I encountered an error processing your request. Please try again.",
      toolCalls: [],
    })
  }
}
