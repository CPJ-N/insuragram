"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Brain,
  AlertTriangle,
  Bot,
  Scale,
  Lock,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const coverageProducts = [
  {
    title: "AI Liability Insurance",
    description:
      "Coverage for damages caused by AI systems — chatbot errors, algorithmic bias, and automated decision-making failures.",
    icon: Brain,
    color: "text-purple-600",
    bg: "bg-purple-50",
    borderColor: "border-purple-200",
    features: [
      "AI hallucination & misinformation coverage",
      "Chatbot error liability protection",
      "Algorithmic bias claims defense",
      "Third-party AI system failures",
      "Regulatory investigation costs",
    ],
    startingAt: "$200/month",
    badge: "Most Popular",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    title: "AI E&O Insurance",
    description:
      "Errors & Omissions coverage for companies that build, deploy, or integrate AI systems into their products and services.",
    icon: Scale,
    color: "text-blue-600",
    bg: "bg-blue-50",
    borderColor: "border-blue-200",
    features: [
      "AI product failure coverage",
      "Professional negligence in AI deployment",
      "Client data loss from AI processing",
      "Failure to meet AI performance guarantees",
      "Intellectual property infringement by AI",
    ],
    startingAt: "$350/month",
    badge: "For AI Companies",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    title: "Cyber + AI InsurSec",
    description:
      "Bundled cybersecurity and insurance package with AI-specific coverage for ransomware, deepfake fraud, and data breaches.",
    icon: Lock,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    borderColor: "border-emerald-200",
    features: [
      "Ransomware response & recovery",
      "Deepfake-enabled fraud protection",
      "AI-powered email fraud coverage",
      "Data breach notification costs",
      "Business interruption from AI failures",
    ],
    startingAt: "$275/month",
    badge: "InsurSec Bundle",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "D&O for AI Startups",
    description:
      "Directors & Officers liability tailored for AI startups, covering regulatory actions, investor claims, and AI governance failures.",
    icon: Shield,
    color: "text-orange-600",
    bg: "bg-orange-50",
    borderColor: "border-orange-200",
    features: [
      "AI regulatory enforcement defense",
      "Investor lawsuit protection",
      "AI ethics & governance liability",
      "Employment practices in AI teams",
      "Fiduciary duty claims",
    ],
    startingAt: "$400/month",
    badge: "For Startups",
    badgeColor: "bg-orange-100 text-orange-800",
  },
]

const keyBenefits = [
  {
    icon: Bot,
    title: "AI-Native Underwriting",
    description: "Our AI co-pilot assesses your specific AI risk profile in minutes, not weeks.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description: "24/7 AI incident response team with automated containment and remediation.",
  },
  {
    icon: CheckCircle,
    title: "Affirmative Coverage",
    description: "No ambiguity — our policies explicitly cover AI-related risks that traditional insurance excludes.",
  },
]

export function AICoverage() {
  return (
    <div className="space-y-8">
      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {keyBenefits.map((benefit) => (
          <Card key={benefit.title} className="border-dashed">
            <CardContent className="pt-4 flex items-start gap-3">
              <div className="flex-none h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <benefit.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{benefit.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coverage Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coverageProducts.map((product) => (
          <Card key={product.title} className={`${product.borderColor}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`h-10 w-10 rounded-lg ${product.bg} flex items-center justify-center`}>
                  <product.icon className={`h-5 w-5 ${product.color}`} />
                </div>
                <Badge className={product.badgeColor}>{product.badge}</Badge>
              </div>
              <CardTitle className="text-lg mt-2">{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Starting at</p>
                  <p className="text-lg font-bold">{product.startingAt}</p>
                </div>
                <Button asChild>
                  <Link href="/dashboard/chatbot">
                    Get Quote <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
