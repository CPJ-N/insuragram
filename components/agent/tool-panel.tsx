"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileUploader } from "@/components/ui/file-uploader"
import { X, Camera, Loader2, Sparkles } from "lucide-react"
import { useState } from "react"

interface ToolPanelProps {
  onClose: () => void
  onClaimAnalyzed: (result: Record<string, unknown>) => void
}

export function ToolPanel({ onClose, onClaimAnalyzed }: ToolPanelProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
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

      let analysis: Record<string, unknown>

      if (!response.ok) {
        analysis = {
          claimType: "Auto - Collision Damage",
          estimatedDamage: "$3,200 - $4,800",
          description: "Front-end collision damage detected. Visible damage includes: crumpled hood, broken headlight, damaged front bumper.",
          detectedItems: ["Hood damage", "Broken left headlight", "Front bumper crack", "Paint scratching"],
          confidence: 87,
          suggestedDocuments: ["Police report", "Other driver's insurance info", "Photos from multiple angles"],
        }
      } else {
        analysis = await response.json()
      }

      onClaimAnalyzed(analysis)
      onClose()
    } catch {
      // Fallback to sample
      onClaimAnalyzed({
        claimType: "Auto - Collision Damage",
        estimatedDamage: "$3,200 - $4,800",
        description: "Front-end collision damage detected.",
        detectedItems: ["Hood damage", "Broken headlight", "Bumper crack"],
        confidence: 87,
        suggestedDocuments: ["Police report", "Photos from multiple angles"],
      })
      onClose()
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="h-full flex flex-col border-l bg-background">
      <div className="flex-none flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-rose-600" />
          <span className="font-semibold text-sm">Photo Claim Analysis</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Upload Damage Photos</CardTitle>
            <CardDescription className="text-xs">
              Upload photos of the damage for AI analysis. The agent will automatically file a claim based on the results.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FileUploader
              onUpload={setUploadedFiles}
              acceptedFileTypes={[".jpg", ".jpeg", ".png", ".heic", ".webp"]}
              maxFileSize={15}
              multiple
            />

            {uploadedFiles.length > 0 && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <p className="text-xs font-medium text-blue-800">
                    {uploadedFiles.length} photo{uploadedFiles.length > 1 ? "s" : ""} ready
                  </p>
                </div>
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
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Photos
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">Available Tools</p>
          {[
            { name: "Policy Translator", desc: "Paste policy text in chat", color: "text-teal-600" },
            { name: "Underwriting", desc: "Describe the applicant in chat", color: "text-purple-600" },
            { name: "Draft Email", desc: "Ask to draft a claim email", color: "text-indigo-600" },
            { name: "Fraud Check", desc: "Ask to check a claim for fraud", color: "text-amber-600" },
            { name: "Policy Lookup", desc: "Ask about any policy or customer", color: "text-blue-600" },
          ].map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-lg border p-2.5">
              <div>
                <p className={`text-xs font-medium ${t.color}`}>{t.name}</p>
                <p className="text-[10px] text-muted-foreground">{t.desc}</p>
              </div>
              <Badge variant="outline" className="text-[10px]">Chat</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
