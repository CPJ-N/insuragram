"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Brain,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react"

interface ReasoningFactor {
  factor: string
  impact: "positive" | "neutral" | "negative"
  detail: string
  weight: "high" | "medium" | "low"
}

interface AssessmentResult {
  riskScore: number
  riskCategory: string
  confidenceScore: number
  recommendation: string
  premiumAdjustment: number
  reasoning: ReasoningFactor[]
  conditions: string[]
  summary: string
}

export function UnderwritingCopilot() {
  const [insuranceType, setInsuranceType] = useState("")
  const [applicant, setApplicant] = useState({
    name: "",
    age: "",
    occupation: "",
    location: "",
    income: "",
    healthStatus: "",
    smoker: "No",
    preExistingConditions: "",
    coverageAmount: "",
    drivingHistory: "",
    vehicleType: "",
    additionalNotes: "",
  })
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAssess = async () => {
    if (!insuranceType) return
    setIsLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/ai/underwrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicantData: applicant, insuranceType }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const impactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingDown className="h-4 w-4 text-green-600" />
      case "negative":
        return <TrendingUp className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const recommendationConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    approve: {
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-green-100 text-green-800 border-green-200",
      label: "Approve",
    },
    "approve-with-conditions": {
      icon: <Info className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Approve with Conditions",
    },
    review: {
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-800 border-amber-200",
      label: "Manual Review Required",
    },
    decline: {
      icon: <XCircle className="h-5 w-5" />,
      color: "bg-red-100 text-red-800 border-red-200",
      label: "Decline",
    },
  }

  const riskColor = (score: number) => {
    if (score <= 30) return "text-green-600"
    if (score <= 60) return "text-amber-600"
    return "text-red-600"
  }

  const riskBg = (category: string) => {
    switch (category) {
      case "low":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-amber-100 text-amber-800"
      case "high":
        return "bg-red-100 text-red-800"
      case "very-high":
        return "bg-red-200 text-red-900"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applicant Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Applicant Information
            </CardTitle>
            <CardDescription>
              Enter applicant details for AI-powered risk assessment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Insurance Type</Label>
              <Select value={insuranceType} onValueChange={setInsuranceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Life Insurance">Life Insurance</SelectItem>
                  <SelectItem value="Health Insurance">Health Insurance</SelectItem>
                  <SelectItem value="Car Insurance">Car Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appName">Full Name</Label>
                <Input
                  id="appName"
                  placeholder="Jane Doe"
                  value={applicant.name}
                  onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="32"
                  value={applicant.age}
                  onChange={(e) => setApplicant({ ...applicant, age: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  placeholder="Software Engineer"
                  value={applicant.occupation}
                  onChange={(e) => setApplicant({ ...applicant, occupation: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Austin, TX"
                  value={applicant.location}
                  onChange={(e) => setApplicant({ ...applicant, location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="income">Annual Income</Label>
                <Input
                  id="income"
                  placeholder="$85,000"
                  value={applicant.income}
                  onChange={(e) => setApplicant({ ...applicant, income: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverage">Coverage Requested</Label>
                <Input
                  id="coverage"
                  placeholder="$500,000"
                  value={applicant.coverageAmount}
                  onChange={(e) => setApplicant({ ...applicant, coverageAmount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="health">Health Status</Label>
                <Select
                  value={applicant.healthStatus}
                  onValueChange={(v) => setApplicant({ ...applicant, healthStatus: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smoker">Smoker</Label>
                <Select
                  value={applicant.smoker}
                  onValueChange={(v) => setApplicant({ ...applicant, smoker: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="Former">Former (quit 2+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditions">Pre-existing Conditions</Label>
              <Input
                id="conditions"
                placeholder="None, or list conditions..."
                value={applicant.preExistingConditions}
                onChange={(e) =>
                  setApplicant({ ...applicant, preExistingConditions: e.target.value })
                }
              />
            </div>

            {insuranceType === "Car Insurance" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driving">Driving History</Label>
                  <Select
                    value={applicant.drivingHistory}
                    onValueChange={(v) => setApplicant({ ...applicant, drivingHistory: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clean - no accidents or violations">Clean</SelectItem>
                      <SelectItem value="Minor - 1-2 minor violations">Minor violations</SelectItem>
                      <SelectItem value="Moderate - accident history">Accident history</SelectItem>
                      <SelectItem value="Poor - multiple accidents/DUI">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Type</Label>
                  <Input
                    id="vehicle"
                    placeholder="2022 Toyota Camry"
                    value={applicant.vehicleType}
                    onChange={(e) =>
                      setApplicant({ ...applicant, vehicleType: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information relevant to the assessment..."
                value={applicant.additionalNotes}
                onChange={(e) =>
                  setApplicant({ ...applicant, additionalNotes: e.target.value })
                }
                rows={2}
              />
            </div>

            <Button
              onClick={handleAssess}
              disabled={isLoading || !insuranceType}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running AI Assessment...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Run Underwriting Assessment
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Assessment Results */}
        <div className="space-y-6">
          {!result && !isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                <ShieldCheck className="h-12 w-12 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Fill in the applicant details and run an AI-powered underwriting
                  assessment to see risk scores, reasoning, and recommendations.
                </p>
              </CardContent>
            </Card>
          )}

          {isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <p className="text-sm text-muted-foreground mt-3">
                  AI is analyzing applicant risk profile...
                </p>
              </CardContent>
            </Card>
          )}

          {result && !isLoading && (
            <>
              {/* Score Cards */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground">Risk Score</p>
                    <p className={`text-3xl font-bold ${riskColor(result.riskScore)}`}>
                      {result.riskScore}
                    </p>
                    <Badge className={`mt-1 ${riskBg(result.riskCategory)}`}>
                      {result.riskCategory}
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {result.confidenceScore}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">AI Certainty</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground">Premium Adj.</p>
                    <p
                      className={`text-3xl font-bold ${
                        result.premiumAdjustment < 0
                          ? "text-green-600"
                          : result.premiumAdjustment > 0
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {result.premiumAdjustment > 0 ? "+" : ""}
                      {result.premiumAdjustment}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {result.premiumAdjustment < 0 ? "Discount" : result.premiumAdjustment > 0 ? "Surcharge" : "Standard"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendation */}
              <Card
                className={`border ${recommendationConfig[result.recommendation]?.color || ""}`}
              >
                <CardContent className="pt-4 flex items-center gap-3">
                  {recommendationConfig[result.recommendation]?.icon}
                  <div>
                    <p className="font-semibold">
                      {recommendationConfig[result.recommendation]?.label || result.recommendation}
                    </p>
                    <p className="text-sm mt-0.5">{result.summary}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Conditions */}
              {result.conditions.length > 0 && (
                <Card className="border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {result.conditions.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Reasoning */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Reasoning (Transparent)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.reasoning.map((factor, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50"
                      >
                        <div className="flex-none mt-0.5">
                          {impactIcon(factor.impact)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{factor.factor}</span>
                            <Badge variant="outline" className="text-xs">
                              {factor.weight}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {factor.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
