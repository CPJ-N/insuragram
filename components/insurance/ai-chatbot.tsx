"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Loader2, Bot, User, Sparkles } from "lucide-react"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  intent?: string
  suggestedActions?: string[]
  policyRecommendation?: {
    type: string
    plan: string
    monthlyPremium: string
    coverage: string
    reason: string
  } | null
}

export function AIChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: ChatMessage = { role: "user", content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)
    setHasStarted(true)

    try {
      const res = await fetch("/api/ai/chat", {
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
        content: data.message,
        intent: data.intent,
        suggestedActions: data.suggestedActions,
        policyRecommendation: data.policyRecommendation,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          suggestedActions: ["Try again", "What insurance do I need?"],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="space-y-6">
      <Card className="flex flex-col" style={{ height: "calc(100vh - 16rem)" }}>
        <CardHeader className="flex-none border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            InsuraBot
            <Badge variant="secondary" className="ml-2 text-xs">
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {!hasStarted && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Welcome to InsuraBot</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your AI insurance assistant. Ask me anything about insurance,
                  get personalized recommendations, or start a claim.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "What insurance do I need?",
                  "I need to file a claim",
                  "Compare your plans",
                  "How much does car insurance cost?",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {suggestion}
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
                <div className="flex-none h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-700" />
                </div>
              )}
              <div
                className={`max-w-[80%] space-y-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5"
                    : "space-y-2"
                }`}
              >
                <div
                  className={
                    msg.role === "assistant"
                      ? "bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 text-sm prose prose-sm max-w-none"
                      : "text-sm"
                  }
                  dangerouslySetInnerHTML={
                    msg.role === "assistant"
                      ? {
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br>")
                            .replace(/- (.*?)(?=<br>|$)/g, "&bull; $1"),
                        }
                      : undefined
                  }
                >
                  {msg.role === "user" ? msg.content : undefined}
                </div>

                {msg.policyRecommendation && (
                  <Card className="border-blue-200 bg-blue-50/50">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-800">
                          Recommended: {msg.policyRecommendation.plan}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Type</span>
                          <p className="font-medium capitalize">
                            {msg.policyRecommendation.type}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Premium</span>
                          <p className="font-medium">
                            {msg.policyRecommendation.monthlyPremium}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-blue-700">
                        {msg.policyRecommendation.reason}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((action, j) => (
                      <Button
                        key={j}
                        variant="outline"
                        size="sm"
                        onClick={() => sendMessage(action)}
                        className="text-xs h-7"
                        disabled={isLoading}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex-none h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-none h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-700" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        <div className="flex-none border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about insurance, get a quote, or file a claim..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
