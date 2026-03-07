export interface FraudCheckResult {
  riskLevel: "low" | "medium" | "high"
  riskScore: number
  flags: string[]
  reasoning: string
}

export type PipelineStepStatus = "pending" | "active" | "completed" | "failed"

export interface PipelineStep {
  id: string
  label: string
  status: PipelineStepStatus
  timestamp?: string
  detail?: string
}
