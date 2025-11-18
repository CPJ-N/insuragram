"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "link" | "secondary" | "destructive" | "outline" | "ghost";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image?: {  // Made optional with ?
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  description,
}: HeroProps) {
  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-4",
        "relative" // Added relative positioning
      )}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Badge */}
          {badge && (
            <Badge variant="outline" className="gap-2">
              <span className="text-muted-foreground">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl md:text-7xl max-w-4xl bg-gradient-to-r from-foreground to-muted-foreground">
            {title}
          </h1>

          {/* Description */}
          <p className="text-md max-w-[550px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>

          {/* Insurance Dashboards */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="relative h-[400px]">
                <Image
                  src="/image 1.png"
                  alt="Insurance Hero Image 1"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className="relative h-[500px] -mt-8">
                <Image
                  src="/Frame 1400001808.png"
                  alt="Insurance Hero Image 3"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="/image 2.png"
                  alt="Insurance Hero Image 2"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
