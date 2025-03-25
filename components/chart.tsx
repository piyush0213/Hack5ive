import * as React from "react"

import { cn } from "@/lib/utils"

const Chart = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(({ className, ...props }, ref) => {
  return <svg ref={ref} viewBox="0 0 336 192" className={cn("w-full", className)} {...props} />
})
Chart.displayName = "Chart"

interface ChartTooltipProps {
  children: React.ReactNode
}

const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <div className="rounded-md border bg-popover p-4 text-sm text-popover-foreground shadow-sm">{children}</div>
}

export { Chart, ChartTooltip }

