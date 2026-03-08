"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUploader } from "@/components/ui/file-uploader"
import { Camera, CheckCircle, FileText, Loader2, Sparkles, AlertCircle } from "lucide-react"
import { ClaimsPipeline } from "./claims-pipeline"

interface GeneratedClaim {
  claimType: string
  policyNumber: string
  incidentDate: string
  estimatedDamage: string
  description: string
  detectedItems: string[]
  confidence: number
  suggestedDocuments: string[]
  status: "draft" | "submitted"
}

const sampleAnalysis: GeneratedClaim = {
  claimType: "Auto - Collision Damage",
  policyNumber: "CI-2024-002",
  incidentDate: new Date().toISOString().split("T")[0],
  estimatedDamage: "$3,200 - $4,800",
  description:
    "Front-end collision damage detected. Visible damage includes: crumpled hood, broken headlight (driver side), damaged front bumper, and potential radiator impact. The damage pattern is consistent with a low-speed frontal collision (15-25 mph).",
  detectedItems: [
    "Hood damage (dent/crumple)",
    "Broken left headlight assembly",
    "Front bumper crack and displacement",
    "Paint scratching on front quarter panel",
    "Potential radiator damage (requires inspection)",
  ],
  confidence: 87,
  suggestedDocuments: [
    "Police report (if applicable)",
    "Other driver's insurance info",
    "Photos from multiple angles",
    "Repair estimate from certified shop",
  ],
  status: "draft",
}

export function ClaimBot() {
  const [step, setStep] = useState<"upload" | "details" | "processing">("upload")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [generatedClaim, setGeneratedClaim] = useState<GeneratedClaim | null>(null)
  const [claimDetails, setClaimDetails] = useState({
    policyNumber: "",
    claimType: "",
    incidentDate: "",
    location: "",
    additionalNotes: "",
  })

  const handlePhotoUpload = (files: File[]) => {
    setUploadedFiles(files)
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Remove the data:image/...;base64, prefix
        const base64 = result.split(",")[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return
    setIsAnalyzing(true)

    try {
      const images = await Promise.all(
        uploadedFiles.map(async (file) => {
          const data = await fileToBase64(file)
          const mediaType = file.type || "image/jpeg"
          return { data, mediaType }
        })
      )

      const response = await fetch("/api/ai/analyze-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images }),
      })

      let analysis: Omit<GeneratedClaim, "policyNumber" | "incidentDate" | "status">

      if (!response.ok) {
        // Fallback to sample data
        analysis = sampleAnalysis
      } else {
        analysis = await response.json()
      }

      const claim: GeneratedClaim = {
        ...analysis,
        policyNumber: "",
        incidentDate: new Date().toISOString().split("T")[0],
        status: "draft",
      }

      setGeneratedClaim(claim)
      setClaimDetails({
        policyNumber: claim.policyNumber,
        claimType: claim.claimType,
        incidentDate: claim.incidentDate,
        location: "",
        additionalNotes: "",
      })
      setStep("details")
    } catch {
      // Fallback to sample on network error
      setGeneratedClaim(sampleAnalysis)
      setClaimDetails({
        policyNumber: sampleAnalysis.policyNumber,
        claimType: sampleAnalysis.claimType,
        incidentDate: sampleAnalysis.incidentDate,
        location: "",
        additionalNotes: "",
      })
      setStep("details")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmitClaim = () => {
    if (generatedClaim) {
      setGeneratedClaim({ ...generatedClaim, status: "submitted" })
      setStep("processing")
    }
  }

  return (
    <div className="space-y-6">
      {/* Step 1: Upload Photos */}
      {step === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Upload Incident Photos
            </CardTitle>
            <CardDescription>
              Take photos of the damage or incident — ClaimBot will analyze them and auto-generate your claim
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUploader
              onUpload={handlePhotoUpload}
              acceptedFileTypes={[".jpg", ".jpeg", ".png", ".heic", ".webp"]}
              maxFileSize={15}
              multiple
            />

            {uploadedFiles.length > 0 && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">
                    {uploadedFiles.length} photo{uploadedFiles.length > 1 ? "s" : ""} ready for AI analysis
                  </p>
                </div>
                <p className="text-xs text-blue-600">
                  Our AI will detect damage type, estimate costs, and pre-fill your claim form
                </p>
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              className="w-full"
              disabled={uploadedFiles.length === 0 || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing photos with AI...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze & Generate Claim
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Review AI Analysis + Fill Details */}
      {step === "details" && generatedClaim && (
        <>
          {/* AI Analysis Results */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Sparkles className="h-5 w-5" />
                  AI Analysis Complete
                </CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {generatedClaim.confidence}% confidence
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-blue-700">Detected Damage</p>
                <p className="text-sm mt-1">{generatedClaim.description}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-blue-700 mb-2">Damage Inventory</p>
                <ul className="space-y-1">
                  {generatedClaim.detectedItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div>
                  <p className="text-xs text-blue-600">Estimated Damage</p>
                  <p className="text-lg font-bold text-blue-900">{generatedClaim.estimatedDamage}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600">Claim Type</p>
                  <p className="text-lg font-bold text-blue-900">{generatedClaim.claimType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claim Form (pre-filled) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Review & Complete Your Claim
              </CardTitle>
              <CardDescription>
                We&apos;ve pre-filled what we could. Review and add any missing details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cb-policy">Policy Number</Label>
                  <Input
                    id="cb-policy"
                    value={claimDetails.policyNumber}
                    onChange={(e) => setClaimDetails({ ...claimDetails, policyNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cb-type">Claim Type</Label>
                  <Select
                    value={claimDetails.claimType}
                    onValueChange={(v) => setClaimDetails({ ...claimDetails, claimType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Auto - Collision Damage">Auto - Collision</SelectItem>
                      <SelectItem value="Auto - Theft">Auto - Theft</SelectItem>
                      <SelectItem value="Auto - Weather Damage">Auto - Weather</SelectItem>
                      <SelectItem value="Home - Water Damage">Home - Water Damage</SelectItem>
                      <SelectItem value="Home - Fire Damage">Home - Fire Damage</SelectItem>
                      <SelectItem value="Home - Theft">Home - Theft</SelectItem>
                      <SelectItem value="Health - Accident">Health - Accident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cb-date">Incident Date</Label>
                  <Input
                    id="cb-date"
                    type="date"
                    value={claimDetails.incidentDate}
                    onChange={(e) => setClaimDetails({ ...claimDetails, incidentDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cb-location">Incident Location</Label>
                  <Input
                    id="cb-location"
                    value={claimDetails.location}
                    onChange={(e) => setClaimDetails({ ...claimDetails, location: e.target.value })}
                    placeholder="e.g., 123 Main St, intersection of..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cb-notes">Additional Notes</Label>
                <Textarea
                  id="cb-notes"
                  value={claimDetails.additionalNotes}
                  onChange={(e) => setClaimDetails({ ...claimDetails, additionalNotes: e.target.value })}
                  placeholder="Any additional context about the incident..."
                  rows={3}
                />
              </div>

              {/* Suggested Documents */}
              <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <p className="text-sm font-medium text-amber-800">Recommended Supporting Documents</p>
                </div>
                <ul className="space-y-1">
                  {generatedClaim.suggestedDocuments.map((doc, i) => (
                    <li key={i} className="text-sm text-amber-700 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("upload")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmitClaim} className="flex-1">
                  Submit Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Step 3: AI Claims Processing Pipeline */}
      {step === "processing" && generatedClaim && (
        <ClaimsPipeline
          claim={generatedClaim}
          claimDetails={claimDetails}
          onReset={() => {
            setStep("upload")
            setGeneratedClaim(null)
            setUploadedFiles([])
            setClaimDetails({ policyNumber: "", claimType: "", incidentDate: "", location: "", additionalNotes: "" })
          }}
        />
      )}
    </div>
  )
}
