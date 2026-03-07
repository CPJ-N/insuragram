"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  PanelRightOpen,
  PanelRightClose,
  Camera,
  BookOpen,
  Brain,
  Mail,
  Shield,
  Search,
} from "lucide-react"
import { ToolResultCard, ToolCallIndicator } from "./tool-results"
import { ToolPanel } from "./tool-panel"

interface ToolCallData {
  tool: string
  input: Record<string, unknown>
  result: Record<string, unknown>
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  toolCalls?: ToolCallData[]
}

const SUGGESTIONS = [
  { label: "Translate a policy", icon: BookOpen },
  { label: "Run a risk assessment", icon: Brain },
  { label: "Draft a claim email", icon: Mail },
  { label: "Check claim for fraud", icon: Shield },
  { label: "Look up a policy", icon: Search },
  { label: "File a photo claim", icon: Camera },
]

export function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [activeTools, setActiveTools] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, activeTools])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: ChatMessage = { role: "user", content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)
    setActiveTools([])

    try {
      const res = await fetch("/api/ai/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })
      const data = await res.json()

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
        toolCalls: data.toolCalls || [],
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
      setActiveTools([])
    }
  }

  const handleClaimAnalyzed = (result: Record<string, unknown>) => {
    // Inject the claim analysis as a tool result into the conversation
    const claimMessage: ChatMessage = {
      role: "assistant",
      content: `I've analyzed your photos and found **${result.claimType}** damage with an estimated cost of **${result.estimatedDamage}**. Here's the full analysis:`,
      toolCalls: [
        {
          tool: "analyze_claim",
          input: {},
          result,
        },
      ],
    }
    setMessages((prev) => [...prev, claimMessage])
    setShowPanel(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "File a photo claim" || input.trim().toLowerCase().includes("upload") || input.trim().toLowerCase().includes("photo")) {
      setShowPanel(true)
    }
    sendMessage(input)
  }

  const handleSuggestion = (label: string) => {
    if (label === "File a photo claim") {
      setShowPanel(true)
      return
    }
    sendMessage(label)
  }

  const hasStarted = messages.length > 0

  return (
    <div className="flex h-[calc(100vh-10rem)]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex-none flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">InsuraAgent</h2>
              <p className="text-[10px] text-muted-foreground">AI Insurance Assistant with Tools</p>
            </div>
            <Badge variant="secondary" className="text-[10px] ml-1">
              6 tools
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPanel(!showPanel)}
            className="gap-1.5"
          >
            {showPanel ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
            <span className="text-xs hidden sm:inline">Tools</span>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!hasStarted && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">InsuraAgent</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Your AI insurance assistant. I can translate policies, assess risk, draft emails,
                  detect fraud, look up policies, and process photo claims — all in one conversation.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-lg">
                {SUGGESTIONS.map((s) => (
                  <Button
                    key={s.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestion(s.label)}
                    className="text-xs justify-start gap-2 h-auto py-2.5 px-3"
                  >
                    <s.icon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                    <span className="text-left">{s.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex-none h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
              )}
              <div className={`max-w-[85%] space-y-1 ${msg.role === "user" ? "" : ""}`}>
                <div
                  className={
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 text-sm"
                      : "text-sm"
                  }
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: msg.content
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n\n/g, "</p><p>")
                          .replace(/\n/g, "<br>")
                          .replace(/- (.*?)(?=<br>|<\/p>|$)/g, "&bull; $1"),
                      }}
                    />
                  )}
                </div>

                {/* Tool results — rendered inline as cards */}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="space-y-1">
                    {msg.toolCalls.map((tc, j) => (
                      <ToolResultCard key={j} toolCall={tc} />
                    ))}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex-none h-7 w-7 rounded-full bg-primary flex items-center justify-center mt-0.5">
                  <User className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {/* Loading state with active tool indicators */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-none h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="space-y-1">
                {activeTools.length > 0 ? (
                  activeTools.map((t, i) => <ToolCallIndicator key={i} toolName={t} />)
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex-none border-t p-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowPanel(!showPanel)}
              className="flex-none h-10 w-10"
              title="Upload photos for claim analysis"
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything — translate a policy, assess risk, draft an email..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="flex-none">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>Powered by Claude</span>
            </div>
            <span className="text-[10px] text-muted-foreground">|</span>
            <span className="text-[10px] text-muted-foreground">
              6 tools: Policy, Underwriting, Claims, Email, Fraud, Lookup
            </span>
          </div>
        </div>
      </div>

      {/* Tool Panel — slides in from right */}
      {showPanel && (
        <div className="w-80 flex-none">
          <ToolPanel
            onClose={() => setShowPanel(false)}
            onClaimAnalyzed={handleClaimAnalyzed}
          />
        </div>
      )}
    </div>
  )
}
