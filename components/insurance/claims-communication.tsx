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
import { Mail, Loader2, Copy, Check, FileText, Sparkles } from "lucide-react"

interface DraftResult {
  subject: string
  body: string
  tone: string
  summary: string
}

export function ClaimsCommunication() {
  const [claimData, setClaimData] = useState({
    claimId: "",
    name: "",
    policyNumber: "",
    claimType: "",
    amount: "",
    status: "",
    additionalContext: "",
  })
  const [communicationType, setCommunicationType] = useState("")
  const [draft, setDraft] = useState<DraftResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!communicationType) return
    setIsLoading(true)
    setDraft(null)

    try {
      const res = await fetch("/api/ai/draft-communication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimData, communicationType }),
      })
      const result = await res.json()
      setDraft(result)
    } catch {
      setDraft({
        subject: "Error generating draft",
        body: "An error occurred while generating the communication. Please try again.",
        tone: "informational",
        summary: "Error occurred during generation.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (!draft) return
    navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toneColors: Record<string, string> = {
    empathetic: "bg-purple-100 text-purple-800",
    informational: "bg-blue-100 text-blue-800",
    congratulatory: "bg-green-100 text-green-800",
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Claim Details
            </CardTitle>
            <CardDescription>
              Enter the claim information to generate a professional communication.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="claimId">Claim ID</Label>
                <Input
                  id="claimId"
                  placeholder="CLM-2024-001"
                  value={claimData.claimId}
                  onChange={(e) =>
                    setClaimData({ ...claimData, claimId: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Policyholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={claimData.name}
                  onChange={(e) =>
                    setClaimData({ ...claimData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  placeholder="POL-2024-001"
                  value={claimData.policyNumber}
                  onChange={(e) =>
                    setClaimData({ ...claimData, policyNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Claim Amount</Label>
                <Input
                  id="amount"
                  placeholder="$4,000"
                  value={claimData.amount}
                  onChange={(e) =>
                    setClaimData({ ...claimData, amount: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="claimType">Claim Type</Label>
                <Select
                  value={claimData.claimType}
                  onValueChange={(v) =>
                    setClaimData({ ...claimData, claimType: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Auto - Collision">Auto - Collision</SelectItem>
                    <SelectItem value="Auto - Theft">Auto - Theft</SelectItem>
                    <SelectItem value="Home - Water Damage">Home - Water Damage</SelectItem>
                    <SelectItem value="Home - Fire">Home - Fire</SelectItem>
                    <SelectItem value="Health - Hospitalization">Health - Hospitalization</SelectItem>
                    <SelectItem value="Life - Death Benefit">Life - Death Benefit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Claim Status</Label>
                <Select
                  value={claimData.status}
                  onValueChange={(v) =>
                    setClaimData({ ...claimData, status: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Denied">Denied</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Documents Needed">Documents Needed</SelectItem>
                    <SelectItem value="Payment Processing">Payment Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commType">Communication Type</Label>
              <Select value={communicationType} onValueChange={setCommunicationType}>
                <SelectTrigger>
                  <SelectValue placeholder="What kind of email?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Claim Approval Notification">Claim Approval</SelectItem>
                  <SelectItem value="Claim Denial with Explanation">Claim Denial</SelectItem>
                  <SelectItem value="Claim Status Update">Status Update</SelectItem>
                  <SelectItem value="Document Request">Document Request</SelectItem>
                  <SelectItem value="Payment Confirmation">Payment Confirmation</SelectItem>
                  <SelectItem value="Claim Acknowledgment">Claim Received</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Additional Context</Label>
              <Textarea
                id="context"
                placeholder="Any additional details to include in the communication..."
                value={claimData.additionalContext}
                onChange={(e) =>
                  setClaimData({ ...claimData, additionalContext: e.target.value })
                }
                rows={3}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isLoading || !communicationType}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Draft...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Communication
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Draft */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generated Draft
            </CardTitle>
            <CardDescription>
              AI-generated communication ready to review and send.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!draft && !isLoading && (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                <Mail className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-sm">
                  Fill in the claim details and select a communication type to
                  generate a professional draft.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-3">
                  AI is drafting your communication...
                </p>
              </div>
            )}

            {draft && !isLoading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={toneColors[draft.tone] || "bg-gray-100 text-gray-800"}>
                    {draft.tone} tone
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <Check className="h-3.5 w-3.5 mr-1" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 mr-1" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Subject</p>
                  <p className="text-sm font-medium">{draft.subject}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Body</p>
                  <div className="rounded-lg border bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-80 overflow-y-auto">
                    {draft.body}
                  </div>
                </div>

                <div className="rounded-lg border bg-blue-50/50 border-blue-200 p-3">
                  <p className="text-xs text-blue-600 font-medium">AI Summary</p>
                  <p className="text-sm text-blue-800 mt-0.5">{draft.summary}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
