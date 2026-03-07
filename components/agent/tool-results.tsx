"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Brain,
  Mail,
  Shield,
  Search,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  Copy,
  Check,
} from "lucide-react"
import { useState } from "react"

interface ToolCallData {
  tool: string
  input: Record<string, unknown>
  result: Record<string, unknown>
}

// Tool label shown while the tool is running
export function ToolCallIndicator({ toolName }: { toolName: string }) {
  const config: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
    translate_policy: { icon: <BookOpen className="h-3.5 w-3.5" />, label: "Translating policy...", color: "text-teal-600" },
    underwrite: { icon: <Brain className="h-3.5 w-3.5" />, label: "Running risk assessment...", color: "text-purple-600" },
    draft_communication: { icon: <Mail className="h-3.5 w-3.5" />, label: "Drafting communication...", color: "text-indigo-600" },
    fraud_check: { icon: <Shield className="h-3.5 w-3.5" />, label: "Checking for fraud...", color: "text-amber-600" },
    lookup_policy: { icon: <Search className="h-3.5 w-3.5" />, label: "Looking up policy...", color: "text-blue-600" },
    analyze_claim: { icon: <Shield className="h-3.5 w-3.5" />, label: "Analyzing claim photos...", color: "text-rose-600" },
  }
  const c = config[toolName] || { icon: <Info className="h-3.5 w-3.5" />, label: toolName, color: "text-gray-600" }

  return (
    <div className={`flex items-center gap-2 text-xs ${c.color} py-1`}>
      {c.icon}
      <span className="font-medium">{c.label}</span>
    </div>
  )
}

// Renders the appropriate card for a tool result
export function ToolResultCard({ toolCall }: { toolCall: ToolCallData }) {
  switch (toolCall.tool) {
    case "translate_policy":
      return <PolicyTranslationCard result={toolCall.result} />
    case "underwrite":
      return <UnderwritingCard result={toolCall.result} />
    case "draft_communication":
      return <CommunicationCard result={toolCall.result} />
    case "fraud_check":
      return <FraudCheckCard result={toolCall.result} />
    case "lookup_policy":
      return <PolicyLookupCard result={toolCall.result} />
    case "analyze_claim":
      return <ClaimAnalysisCard result={toolCall.result} />
    default:
      return <GenericToolCard toolCall={toolCall} />
  }
}

function PolicyTranslationCard({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    summary?: string
    sections?: Array<{ title: string; plainEnglish: string; importance: string }>
    coverageGaps?: Array<{ area: string; description: string }>
    keyTerms?: Array<{ term: string; definition: string }>
  }

  return (
    <Card className="border-teal-200 bg-teal-50/30 my-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-teal-800">
          <BookOpen className="h-4 w-4" />
          Policy Translation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {r.summary && (
          <p className="text-sm bg-white/60 rounded-lg p-2.5 border border-teal-100">{r.summary}</p>
        )}
        {r.sections && r.sections.length > 0 && (
          <div className="space-y-2">
            {r.sections.slice(0, 3).map((s, i) => (
              <div key={i} className="text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">{s.title}</span>
                  {s.importance === "high" && (
                    <Badge variant="destructive" className="text-[10px] h-4 px-1">Important</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-0.5">{s.plainEnglish}</p>
              </div>
            ))}
          </div>
        )}
        {r.coverageGaps && r.coverageGaps.length > 0 && (
          <div className="rounded-md border border-amber-200 bg-amber-50/50 p-2">
            <p className="text-xs font-medium text-amber-800 mb-1">Coverage Gaps</p>
            {r.coverageGaps.slice(0, 2).map((g, i) => (
              <p key={i} className="text-xs text-amber-700">
                <span className="font-medium">{g.area}:</span> {g.description}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function UnderwritingCard({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    riskScore?: number
    riskCategory?: string
    confidenceScore?: number
    recommendation?: string
    premiumAdjustment?: number
    reasoning?: Array<{ factor: string; impact: string; detail: string; weight: string }>
    conditions?: string[]
    summary?: string
  }

  const riskColor = (score: number) => {
    if (score <= 30) return "text-green-600"
    if (score <= 60) return "text-amber-600"
    return "text-red-600"
  }

  const riskBg = (cat: string) => {
    if (cat === "low") return "bg-green-100 text-green-800"
    if (cat === "moderate") return "bg-amber-100 text-amber-800"
    return "bg-red-100 text-red-800"
  }

  const recConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    approve: { icon: <CheckCircle className="h-4 w-4" />, color: "border-green-200 bg-green-50" },
    "approve-with-conditions": { icon: <Info className="h-4 w-4" />, color: "border-blue-200 bg-blue-50" },
    review: { icon: <AlertTriangle className="h-4 w-4" />, color: "border-amber-200 bg-amber-50" },
    decline: { icon: <XCircle className="h-4 w-4" />, color: "border-red-200 bg-red-50" },
  }

  const impactIcon = (impact: string) => {
    if (impact === "positive") return <TrendingDown className="h-3 w-3 text-green-600" />
    if (impact === "negative") return <TrendingUp className="h-3 w-3 text-red-600" />
    return <Minus className="h-3 w-3 text-gray-500" />
  }

  return (
    <Card className="border-purple-200 bg-purple-50/30 my-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-purple-800">
          <Brain className="h-4 w-4" />
          Underwriting Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Scores */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center bg-white/60 rounded-lg p-2 border border-purple-100">
            <p className="text-[10px] text-muted-foreground">Risk</p>
            <p className={`text-xl font-bold ${riskColor(r.riskScore || 0)}`}>{r.riskScore}</p>
            <Badge className={`text-[10px] ${riskBg(r.riskCategory || "")}`}>{r.riskCategory}</Badge>
          </div>
          <div className="text-center bg-white/60 rounded-lg p-2 border border-purple-100">
            <p className="text-[10px] text-muted-foreground">Confidence</p>
            <p className="text-xl font-bold text-blue-600">{r.confidenceScore}%</p>
          </div>
          <div className="text-center bg-white/60 rounded-lg p-2 border border-purple-100">
            <p className="text-[10px] text-muted-foreground">Premium</p>
            <p className={`text-xl font-bold ${(r.premiumAdjustment || 0) < 0 ? "text-green-600" : (r.premiumAdjustment || 0) > 0 ? "text-red-600" : "text-gray-600"}`}>
              {(r.premiumAdjustment || 0) > 0 ? "+" : ""}{r.premiumAdjustment}%
            </p>
          </div>
        </div>

        {/* Recommendation */}
        {r.recommendation && (
          <div className={`flex items-start gap-2 p-2 rounded-lg border ${recConfig[r.recommendation]?.color || ""}`}>
            {recConfig[r.recommendation]?.icon}
            <div className="text-xs">
              <p className="font-semibold capitalize">{r.recommendation?.replace(/-/g, " ")}</p>
              {r.summary && <p className="text-muted-foreground mt-0.5">{r.summary}</p>}
            </div>
          </div>
        )}

        {/* Reasoning factors */}
        {r.reasoning && r.reasoning.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-medium text-muted-foreground uppercase">Reasoning</p>
            {r.reasoning.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-xs bg-white/40 rounded p-1.5">
                {impactIcon(f.impact)}
                <div>
                  <span className="font-medium">{f.factor}</span>
                  <span className="text-muted-foreground"> — {f.detail}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CommunicationCard({ result }: { result: Record<string, unknown> }) {
  const [copied, setCopied] = useState(false)
  const r = result as { subject?: string; body?: string; tone?: string; summary?: string }

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${r.subject}\n\n${r.body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toneColors: Record<string, string> = {
    empathetic: "bg-purple-100 text-purple-800",
    informational: "bg-blue-100 text-blue-800",
    congratulatory: "bg-green-100 text-green-800",
  }

  return (
    <Card className="border-indigo-200 bg-indigo-50/30 my-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2 text-indigo-800">
            <Mail className="h-4 w-4" />
            Draft Communication
          </CardTitle>
          <div className="flex items-center gap-2">
            {r.tone && <Badge className={`text-[10px] ${toneColors[r.tone] || ""}`}>{r.tone}</Badge>}
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-6 px-2">
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {r.subject && (
          <div>
            <p className="text-[10px] text-muted-foreground">Subject</p>
            <p className="text-xs font-medium">{r.subject}</p>
          </div>
        )}
        {r.body && (
          <div className="rounded-lg bg-white/60 border border-indigo-100 p-2.5 text-xs whitespace-pre-wrap max-h-48 overflow-y-auto">
            {r.body}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function FraudCheckCard({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    riskLevel?: string
    riskScore?: number
    flags?: string[]
    reasoning?: string
  }

  const riskConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    low: { color: "border-green-200 bg-green-50/50", icon: <CheckCircle className="h-4 w-4 text-green-600" /> },
    medium: { color: "border-amber-200 bg-amber-50/50", icon: <AlertTriangle className="h-4 w-4 text-amber-600" /> },
    high: { color: "border-red-200 bg-red-50/50", icon: <XCircle className="h-4 w-4 text-red-600" /> },
  }

  const config = riskConfig[r.riskLevel || "low"] || riskConfig.low

  return (
    <Card className={`${config.color} my-2`}>
      <CardContent className="pt-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <span className="text-sm font-semibold capitalize">{r.riskLevel} Fraud Risk</span>
          </div>
          <Badge variant="outline" className="text-xs">Score: {r.riskScore}/100</Badge>
        </div>
        {r.reasoning && <p className="text-xs text-muted-foreground">{r.reasoning}</p>}
        {r.flags && r.flags.length > 0 && (
          <div className="space-y-1">
            {r.flags.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-amber-700">
                <AlertTriangle className="h-3 w-3" />
                {f}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function PolicyLookupCard({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    found?: boolean
    policy?: {
      policyNumber: string
      holder: string
      type: string
      status: string
      premium: string
      coverage: string
      startDate: string
      endDate: string
      claims?: Array<{ id: string; date: string; amount: string; status: string }>
    }
  }

  if (!r.found || !r.policy) {
    return (
      <Card className="border-gray-200 bg-gray-50/50 my-2">
        <CardContent className="pt-3">
          <p className="text-sm text-muted-foreground">No policy found matching that query.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-blue-200 bg-blue-50/30 my-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
          <Search className="h-4 w-4" />
          Policy: {r.policy.policyNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Holder</p>
            <p className="font-medium">{r.policy.holder}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-medium">{r.policy.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge variant={r.policy.status === "Active" ? "default" : "secondary"} className="text-[10px]">
              {r.policy.status}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground">Premium</p>
            <p className="font-medium">{r.policy.premium}</p>
          </div>
        </div>
        <div className="text-xs">
          <p className="text-muted-foreground">Coverage</p>
          <p>{r.policy.coverage}</p>
        </div>
        {r.policy.claims && r.policy.claims.length > 0 && (
          <div className="border-t pt-2 mt-2">
            <p className="text-[10px] font-medium text-muted-foreground uppercase mb-1">Claim History</p>
            {r.policy.claims.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span>{c.id}</span>
                <span>{c.amount}</span>
                <Badge variant="outline" className="text-[10px]">{c.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ClaimAnalysisCard({ result }: { result: Record<string, unknown> }) {
  const r = result as {
    claimType?: string
    estimatedDamage?: string
    description?: string
    detectedItems?: string[]
    confidence?: number
    suggestedDocuments?: string[]
  }

  return (
    <Card className="border-rose-200 bg-rose-50/30 my-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2 text-rose-800">
            <Shield className="h-4 w-4" />
            Claim Analysis
          </CardTitle>
          {r.confidence && (
            <Badge variant="secondary" className="text-[10px]">{r.confidence}% confidence</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Claim Type</p>
            <p className="font-medium">{r.claimType}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Estimated Damage</p>
            <p className="font-bold text-rose-700">{r.estimatedDamage}</p>
          </div>
        </div>
        {r.description && <p className="text-xs">{r.description}</p>}
        {r.detectedItems && r.detectedItems.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase">Detected Damage</p>
            {r.detectedItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <CheckCircle className="h-3 w-3 text-rose-600" />
                {item}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function GenericToolCard({ toolCall }: { toolCall: ToolCallData }) {
  return (
    <Card className="border-gray-200 my-2">
      <CardContent className="pt-3">
        <p className="text-xs font-medium text-muted-foreground mb-1">Tool: {toolCall.tool}</p>
        <pre className="text-xs bg-muted/50 rounded p-2 overflow-x-auto max-h-32">
          {JSON.stringify(toolCall.result, null, 2)}
        </pre>
      </CardContent>
    </Card>
  )
}
