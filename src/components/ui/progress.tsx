import * as React from "react"
import { clsx } from "clsx"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: number }
>(({ className, value, ...props }, ref) => (
  <div className={cn("relative w-full overflow-hidden rounded-full bg-muted", className)} ref={ref} {...props}>
    <div
      className="h-2 bg-primary transition-all duration-200"
      style={{ width: `${value}%` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
