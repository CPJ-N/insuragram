"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FileUploader } from "@/components/ui/file-uploader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, FileText, Lightbulb, Share2, Loader2 } from "lucide-react"

interface TranslatedSection {
  title: string
  original: string
  plainEnglish: string
  importance: "high" | "medium" | "low"
}

interface CoverageGap {
  area: string
  description: string
  recommendation: string
}

interface TranslationResult {
  summary: string
  sections: TranslatedSection[]
  coverageGaps: CoverageGap[]
  keyTerms: { term: string; definition: string }[]
}

const sampleTranslation: TranslationResult = {
  summary:
    "This is a standard health insurance policy with $500,000 coverage. It covers hospital stays, surgery, and prescriptions. Your deductible is $1,500/year, and you pay 20% coinsurance after that. Emergency room visits have a $250 copay.",
  sections: [
    {
      title: "What's Covered",
      original:
        'Subject to the terms, conditions, and limitations of this Policy, the Company agrees to pay Covered Expenses incurred by the Insured for Medically Necessary services and supplies when prescribed by a Physician for the treatment of a covered Illness or Injury.',
      plainEnglish:
        "Your insurance will pay for medical services and supplies that your doctor says you need, as long as they're for treating a sickness or injury that's covered by your plan.",
      importance: "high",
    },
    {
      title: "Your Deductible",
      original:
        "Benefits for Covered Expenses will be payable only after the Insured has incurred Covered Expenses in excess of the Deductible Amount shown in the Schedule of Benefits during any one Policy Year.",
      plainEnglish:
        "You need to pay the first $1,500 of medical bills yourself each year before your insurance starts paying. This resets every year.",
      importance: "high",
    },
    {
      title: "What You Pay (Coinsurance)",
      original:
        "After satisfaction of the Deductible, the Company shall pay the Coinsurance Percentage of Covered Expenses as shown in the Schedule of Benefits.",
      plainEnglish:
        "After you've met your $1,500 deductible, you pay 20% and insurance pays 80% of covered costs.",
      importance: "medium",
    },
    {
      title: "Pre-Authorization Requirements",
      original:
        "Certain services require Prior Authorization. Failure to obtain Prior Authorization may result in reduction or denial of benefits for such services.",
      plainEnglish:
        "For some treatments (like surgery or MRIs), your doctor needs to get approval from the insurance company BEFORE you get the service. If they don't, you might have to pay the full cost yourself.",
      importance: "high",
    },
    {
      title: "Out-of-Network Care",
      original:
        "Benefits for services rendered by Non-Participating Providers shall be subject to the Out-of-Network Deductible and Coinsurance levels as specified in the Schedule of Benefits.",
      plainEnglish:
        "If you go to a doctor who isn't in your insurance network, you'll pay more. Your deductible is higher ($3,000 instead of $1,500) and you'll pay 40% instead of 20%.",
      importance: "medium",
    },
  ],
  coverageGaps: [
    {
      area: "Dental Coverage",
      description: "This policy does not include dental coverage. Routine dental care, emergency dental procedures, and orthodontics are excluded.",
      recommendation: "Consider adding a standalone dental plan ($20-50/month) to cover preventive care and emergencies.",
    },
    {
      area: "Mental Health Visits",
      description: "Mental health coverage is limited to 20 outpatient visits per year with a $50 copay per visit.",
      recommendation: "If you need regular therapy, look into supplemental mental health coverage or check if your employer offers an EAP.",
    },
    {
      area: "Out-of-Country Emergency",
      description: "Emergency medical care outside the US is not covered under this policy.",
      recommendation: "If you travel internationally, purchase travel medical insurance for each trip.",
    },
  ],
  keyTerms: [
    { term: "Deductible", definition: "The amount you pay out of pocket each year before insurance kicks in ($1,500 for this plan)." },
    { term: "Coinsurance", definition: "The percentage you pay after meeting your deductible (20% in-network for this plan)." },
    { term: "Copay", definition: "A fixed amount you pay for specific services (like $250 for ER visits)." },
    { term: "Out-of-Pocket Maximum", definition: "The most you'll pay in a year ($6,000). After this, insurance pays 100%." },
    { term: "Pre-Authorization", definition: "Getting approval from your insurer before a procedure. Without it, they may not pay." },
    { term: "Network", definition: "Doctors and hospitals that have agreements with your insurer for lower rates." },
  ],
}

export function PolicyTranslator() {
  const [policyText, setPolicyText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [inputMethod, setInputMethod] = useState<"paste" | "upload">("paste")

  const handleTranslate = () => {
    if (!policyText.trim()) return
    setIsTranslating(true)
    // Simulate AI translation
    setTimeout(() => {
      setResult(sampleTranslation)
      setIsTranslating(false)
    }, 2500)
  }

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setPolicyText(`[Uploaded: ${files[0].name}] — Policy document ready for translation`)
    }
  }

  const handleShare = () => {
    if (result) {
      const text = `My insurance policy decoded by PolicyPlain:\n\n${result.summary}\n\nKey gaps found: ${result.coverageGaps.map((g) => g.area).join(", ")}`
      navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Your Policy
          </CardTitle>
          <CardDescription>
            Paste your insurance policy text or upload a PDF — we&apos;ll translate it into plain English
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as "paste" | "upload")}>
            <TabsList>
              <TabsTrigger value="paste">Paste Text</TabsTrigger>
              <TabsTrigger value="upload">Upload Document</TabsTrigger>
            </TabsList>
            <TabsContent value="paste">
              <div className="space-y-2">
                <Label htmlFor="policy-text">Policy Text</Label>
                <Textarea
                  id="policy-text"
                  value={policyText}
                  onChange={(e) => setPolicyText(e.target.value)}
                  placeholder="Paste your insurance policy text here... (e.g., copy from your policy PDF)"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <FileUploader
                onUpload={handleFileUpload}
                acceptedFileTypes={[".pdf", ".txt", ".doc", ".docx"]}
                maxFileSize={10}
              />
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleTranslate}
            className="w-full"
            disabled={!policyText.trim() || isTranslating}
          >
            {isTranslating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Translating your policy...
              </>
            ) : (
              "Translate to Plain English"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <>
          {/* Summary Card */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Your Policy in Plain English
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{result.summary}</p>
            </CardContent>
          </Card>

          {/* Detailed Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Section-by-Section Breakdown</CardTitle>
              <CardDescription>Each section of your policy, decoded</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.sections.map((section, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    <Badge
                      variant={section.importance === "high" ? "destructive" : "secondary"}
                    >
                      {section.importance === "high" ? "Important" : "Good to know"}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Original Policy Language
                      </p>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        &quot;{section.original}&quot;
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                        What This Actually Means
                      </p>
                      <p className="text-sm leading-relaxed">{section.plainEnglish}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Coverage Gaps */}
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5" />
                Coverage Gaps Found
              </CardTitle>
              <CardDescription>
                Areas where your policy may leave you exposed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.coverageGaps.map((gap, index) => (
                <div key={index} className="border border-amber-200 rounded-lg p-4 bg-amber-50/50 space-y-2">
                  <h3 className="font-semibold text-amber-900">{gap.area}</h3>
                  <p className="text-sm text-amber-800">{gap.description}</p>
                  <div className="flex items-start gap-2 pt-1">
                    <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-amber-700">{gap.recommendation}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Terms Glossary */}
          <Card>
            <CardHeader>
              <CardTitle>Key Terms Glossary</CardTitle>
              <CardDescription>Insurance jargon, explained simply</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {result.keyTerms.map((term, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <p className="font-semibold text-sm">{term.term}</p>
                    <p className="text-sm text-muted-foreground mt-1">{term.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
