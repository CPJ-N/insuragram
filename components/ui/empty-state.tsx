"use client"

import { LucideIcon } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12",
        className
      )}
      role="status"
      aria-label={title}
    >
      {Icon && (
        <div className="mb-4 rounded-full bg-muted p-4">
          <Icon
            className="h-10 w-10 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
