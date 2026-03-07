import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are an AI underwriting co-pilot for Insuragram. You analyze applicant information and provide risk assessments with confidence scores and transparent reasoning.

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "riskScore": 1-100,
  "riskCategory": "low" | "moderate" | "high" | "very-high",
  "confidenceScore": 60-99,
  "recommendation": "approve" | "approve-with-conditions" | "review" | "decline",
  "premiumAdjustment": -20 to 50,
  "reasoning": [
    {
      "factor": "Name of the risk factor",
      "impact": "positive" | "neutral" | "negative",
      "detail": "Explanation of how this factor affects the assessment",
      "weight": "high" | "medium" | "low"
    }
  ],
  "conditions": ["Array of conditions if recommendation is approve-with-conditions, otherwise empty array"],
  "summary": "2-3 sentence plain-English summary of the underwriting decision with key reasoning"
}

Guidelines:
- Evaluate all provided information objectively
- Consider age, health factors, location, occupation, lifestyle, and coverage amount
- For auto insurance: consider driving history, vehicle type, annual mileage, location
- For health insurance: consider age, pre-existing conditions, lifestyle, family history
- For life insurance: consider age, health, occupation risk, lifestyle, coverage amount
- Provide 4-8 reasoning factors with clear explanations
- Be transparent about what drives the risk assessment
- Confidence score reflects how much data you have to make the assessment (more info = higher confidence)
- Premium adjustment is a percentage: negative means discount, positive means surcharge
- Always provide actionable conditions for conditional approvals`

const sampleAssessment = {
  riskScore: 32,
  riskCategory: "low" as const,
  confidenceScore: 85,
  recommendation: "approve" as const,
  premiumAdjustment: -10,
  reasoning: [
    { factor: "Age", impact: "positive" as const, detail: "Age 32 is within the optimal range for this insurance type with lower statistical risk.", weight: "high" as const },
    { factor: "Health Status", impact: "positive" as const, detail: "No pre-existing conditions reported. Non-smoker status significantly reduces risk.", weight: "high" as const },
    { factor: "Occupation", impact: "neutral" as const, detail: "Office-based work presents standard occupational risk with no hazardous exposure.", weight: "medium" as const },
    { factor: "Coverage Amount", impact: "neutral" as const, detail: "Requested coverage is proportional to income level, indicating reasonable expectations.", weight: "medium" as const },
    { factor: "Location", impact: "positive" as const, detail: "Suburban area with lower crime rates and good access to healthcare facilities.", weight: "low" as const },
  ],
  conditions: [],
  summary: "Low-risk profile with favorable health indicators and appropriate coverage amount. Recommend approval with a 10% premium discount based on the applicant's strong risk profile.",
}

export async function POST(request: NextRequest) {
  try {
    const { applicantData, insuranceType } = await request.json()

    if (!applicantData || !insuranceType) {
      return NextResponse.json(sampleAssessment)
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(sampleAssessment)
    }

    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Perform an underwriting assessment for this ${insuranceType} insurance application:\n\nApplicant Name: ${applicantData.name || "N/A"}\nAge: ${applicantData.age || "N/A"}\nOccupation: ${applicantData.occupation || "N/A"}\nLocation: ${applicantData.location || "N/A"}\nAnnual Income: ${applicantData.income || "N/A"}\nHealth Status: ${applicantData.healthStatus || "N/A"}\nSmoker: ${applicantData.smoker || "No"}\nPre-existing Conditions: ${applicantData.preExistingConditions || "None"}\nCoverage Requested: ${applicantData.coverageAmount || "N/A"}\nDriving History: ${applicantData.drivingHistory || "N/A"}\nVehicle Type: ${applicantData.vehicleType || "N/A"}\nAdditional Notes: ${applicantData.additionalNotes || "None"}`,
        },
      ],
    })

    const textBlock = message.content.find((block) => block.type === "text")
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(sampleAssessment)
    }

    const result = JSON.parse(textBlock.text)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Underwriting assessment error:", error)
    return NextResponse.json(sampleAssessment)
  }
}
