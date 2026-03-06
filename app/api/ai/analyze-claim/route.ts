import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are ClaimBot, an AI insurance claims assistant that analyzes photos of damage and generates insurance claims. You are an expert at identifying damage types, estimating repair costs, and creating accurate claim documentation.

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "claimType": "The type of claim (e.g., 'Auto - Collision Damage', 'Home - Water Damage', 'Home - Fire Damage')",
  "estimatedDamage": "Dollar range estimate (e.g., '$3,200 - $4,800')",
  "description": "A detailed 2-3 sentence description of the damage detected, including the likely cause and severity.",
  "detectedItems": ["List of specific damage items detected, each as a string"],
  "confidence": 85,
  "suggestedDocuments": ["List of supporting documents the claimant should gather"]
}

Guidelines:
- Be specific about what damage you see in the images
- Provide realistic cost estimates based on typical repair costs
- Confidence should be 60-95 (higher if images are clear and damage is obvious)
- List 3-7 specific damage items detected
- Suggest 3-5 supporting documents
- If images are unclear, lower the confidence score and note what's uncertain
- Classify the claim type based on what you see (auto, home, property, etc.)
- For auto claims, note if damage appears structural vs cosmetic
- Include relevant details like "requires professional inspection" for hidden damage`

export async function POST(request: NextRequest) {
  try {
    const { images } = await request.json()

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
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

    const contentBlocks: Anthropic.MessageCreateParams["messages"][0]["content"] = []

    for (let i = 0; i < images.length; i++) {
      const img = images[i]
      contentBlocks.push({
        type: "image",
        source: {
          type: "base64",
          media_type: img.mediaType || "image/jpeg",
          data: img.data,
        },
      })
    }

    contentBlocks.push({
      type: "text",
      text: `Analyze the damage shown in ${images.length === 1 ? "this photo" : "these photos"} and generate an insurance claim. Identify all visible damage, estimate repair costs, and classify the claim type.`,
    })

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: contentBlocks,
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
    console.error("Claim analysis error:", error)
    const errorMessage = error instanceof Error ? error.message : "Analysis failed"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
