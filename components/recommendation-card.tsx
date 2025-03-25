import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface RecommendationCardProps {
  title: string
  description: string
  icon: ReactNode
  actionLabel: string
}

export function RecommendationCard({ title, description, icon, actionLabel }: RecommendationCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}

