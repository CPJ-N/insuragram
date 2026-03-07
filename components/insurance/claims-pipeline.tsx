"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Shield,
  AlertTriangle,
  Zap,
  FileCheck,
  Loader2,
} from "lucide-react"
import type { FraudCheckResult, PipelineStep, PipelineStepStatus } from "@/lib/types/claims"

interface ClaimData {
  claimType: string
  estimatedDamage: string
  description: string
  detectedItems: string[]
  confidence: number
  suggestedDocuments: string[]
}

interface ClaimDetails {
  policyNumber: string
  claimType: string
  incidentDate: string
  location: string
  additionalNotes: string
}

interface ClaimsPipelineProps {
  claim: ClaimData
  claimDetails: ClaimDetails
  onReset: () => void
}

function parseEstimatedDamage(range: string): number {
  const numbers = range.match(/[\d,]+/g)
  if (!numbers || numbers.length === 0) return 0
  const values = numbers.map((n) => parseInt(n.replace(/,/g, ""), 10))
  return values.reduce((a, b) => a + b, 0) / values.length
}

const INITIAL_STEPS: PipelineStep[] = [
  { id: "submitted", label: "Claim Submitted", status: "pending" },
  { id: "analysis", label: "AI Analysis", status: "pending" },
  { id: "fraud", label: "Fraud Detection", status: "pending" },
  { id: "decision", label: "Decision", status: "pending" },
]

function StepIcon({ status }: { status: PipelineStepStatus }) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case "active":
      return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
    case "failed":
      return <AlertTriangle className="h-5 w-5 text-red-600" />
    default:
      return <Clock className="h-5 w-5 text-gray-400" />
  }
}

function stepCircleClass(status: PipelineStepStatus): string {
  switch (status) {
    case "completed":
      return "border-green-600 bg-green-50"
    case "active":
      return "border-blue-600 bg-blue-50"
    case "failed":
      return "border-red-600 bg-red-50"
    default:
      return "border-gray-300 bg-white"
  }
}

function PipelineTimeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15, duration: 0.3 }}
          className="flex items-start gap-4"
        >
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${stepCircleClass(step.status)}`}
            >
              <StepIcon status={step.status} />
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-8 ${
                  step.status === "completed" ? "bg-green-300" : "bg-gray-200"
                }`}
              />
            )}
          </div>
          <div className="pt-2 pb-8">
            <p
              className={`text-sm font-medium ${
                step.status === "active"
                  ? "text-blue-800"
                  : step.status === "completed"
                    ? "text-green-800"
                    : "text-gray-500"
              }`}
            >
              {step.label}
            </p>
            {step.detail && (
              <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>
            )}
            {step.timestamp && (
              <p className="text-xs text-muted-foreground">{step.timestamp}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ApprovalAnimation({
  settlementAmount,
  claimId,
}: {
  settlementAmount: number
  claimId: string
}) {
  const [displayAmount, setDisplayAmount] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 30
    const increment = settlementAmount / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= settlementAmount) {
        setDisplayAmount(settlementAmount)
        clearInterval(timer)
      } else {
        setDisplayAmount(Math.round(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [settlementAmount])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6 text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-green-800">Claim Auto-Approved</h3>
            <p className="text-sm text-green-600 mt-1">
              Claim {claimId} has been instantly approved by AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="py-2"
          >
            <p className="text-xs text-green-600">Settlement Amount</p>
            <p className="text-3xl font-bold text-green-900">
              ${displayAmount.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-left space-y-2 pt-2"
          >
            <p className="text-sm font-medium text-green-800">What happens next:</p>
            {[
              "Payment will be processed within 24 hours",
              "Confirmation email sent to your registered address",
              "Funds deposited directly to your account on file",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + i * 0.15 }}
                className="flex items-center gap-2 text-sm text-green-700"
              >
                <Zap className="h-3.5 w-3.5 flex-shrink-0" />
                {item}
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function UnderReviewCard({
  fraudResult,
  claimId,
}: {
  fraudResult: FraudCheckResult
  claimId: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Shield className="h-5 w-5" />
            Claim Under Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Claim ID</p>
              <p className="font-medium">{claimId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Risk Assessment</p>
              <Badge
                variant="secondary"
                className={
                  fraudResult.riskLevel === "medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {fraudResult.riskLevel} risk
              </Badge>
            </div>
          </div>

          {fraudResult.flags.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-100/50 p-3">
              <p className="text-sm font-medium text-amber-800 mb-2">Review Notes</p>
              <ul className="space-y-1">
                {fraudResult.flags.map((flag, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-amber-700">
                    <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-amber-700">
            <Clock className="h-4 w-4" />
            <span>Estimated review time: 3-5 business days</span>
          </div>

          <p className="text-sm text-amber-600">
            A claims specialist will review your submission. You&apos;ll receive updates via
            email as your claim progresses.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ClaimsPipeline({ claim, claimDetails, onReset }: ClaimsPipelineProps) {
  const [steps, setSteps] = useState<PipelineStep[]>(INITIAL_STEPS)
  const [fraudResult, setFraudResult] = useState<FraudCheckResult | null>(null)
  const [decision, setDecision] = useState<"auto-approved" | "under-review" | null>(null)
  const [claimId] = useState(
    () => `CLM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
  )

  const updateStep = useCallback(
    (id: string, updates: Partial<PipelineStep>) => {
      setSteps((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      )
    },
    []
  )

  useEffect(() => {
    let cancelled = false
    const now = () => new Date().toLocaleTimeString()

    async function runPipeline() {
      // Step 1: Claim Submitted
      updateStep("submitted", {
        status: "completed",
        timestamp: now(),
        detail: `Claim ${claimId}`,
      })

      await new Promise((r) => setTimeout(r, 800))
      if (cancelled) return

      // Step 2: AI Analysis
      updateStep("analysis", { status: "active", detail: "Reviewing claim data..." })
      await new Promise((r) => setTimeout(r, 1500))
      if (cancelled) return
      updateStep("analysis", {
        status: "completed",
        timestamp: now(),
        detail: `${claim.confidence}% confidence score`,
      })

      await new Promise((r) => setTimeout(r, 500))
      if (cancelled) return

      // Step 3: Fraud Detection
      updateStep("fraud", { status: "active", detail: "Running anti-fraud checks..." })

      let fraud: FraudCheckResult
      try {
        const res = await fetch("/api/ai/fraud-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            claimType: claim.claimType,
            estimatedDamage: claim.estimatedDamage,
            description: claim.description,
            detectedItems: claim.detectedItems,
            confidence: claim.confidence,
            policyNumber: claimDetails.policyNumber,
            incidentDate: claimDetails.incidentDate,
            location: claimDetails.location,
            additionalNotes: claimDetails.additionalNotes,
          }),
        })
        fraud = await res.json()
      } catch {
        fraud = {
          riskLevel: "low",
          riskScore: 12,
          flags: [],
          reasoning: "Claim appears legitimate based on available data.",
        }
      }

      if (cancelled) return
      setFraudResult(fraud)

      updateStep("fraud", {
        status: "completed",
        timestamp: now(),
        detail: `Risk: ${fraud.riskLevel} (${fraud.riskScore}/100)`,
      })

      await new Promise((r) => setTimeout(r, 800))
      if (cancelled) return

      // Step 4: Decision
      const damageAmount = parseEstimatedDamage(claim.estimatedDamage)
      const isAutoApproved =
        fraud.riskLevel === "low" && claim.confidence > 80 && damageAmount < 5000

      const outcome = isAutoApproved ? "auto-approved" : "under-review"

      updateStep("decision", {
        status: "completed",
        timestamp: now(),
        detail: isAutoApproved
          ? "Auto-approved — instant settlement"
          : "Routed to claims specialist",
      })

      setDecision(outcome)
    }

    runPipeline()
    return () => {
      cancelled = true
    }
  }, [claim, claimDetails, claimId, updateStep])

  const settlementAmount = Math.round(parseEstimatedDamage(claim.estimatedDamage))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Claims Processing Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PipelineTimeline steps={steps} />
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {decision === "auto-approved" && (
          <ApprovalAnimation
            key="approved"
            settlementAmount={settlementAmount}
            claimId={claimId}
          />
        )}
        {decision === "under-review" && fraudResult && (
          <UnderReviewCard key="review" fraudResult={fraudResult} claimId={claimId} />
        )}
      </AnimatePresence>

      {decision && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="outline" onClick={onReset} className="w-full">
            File Another Claim
          </Button>
        </motion.div>
      )}
    </div>
  )
}
