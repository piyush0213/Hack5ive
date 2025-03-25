"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"

const data = [
  { date: "Mon", mood: 3, anxiety: 7, sleep: 5 },
  { date: "Tue", mood: 4, anxiety: 6, sleep: 6 },
  { date: "Wed", mood: 3, anxiety: 8, sleep: 4 },
  { date: "Thu", mood: 5, anxiety: 5, sleep: 7 },
  { date: "Fri", mood: 6, anxiety: 4, sleep: 7 },
  { date: "Sat", mood: 7, anxiety: 3, sleep: 8 },
  { date: "Sun", mood: 6, anxiety: 4, sleep: 7 },
]

export function ProgressChart() {
  return (
    <Card className="h-[300px] w-full">
      <Chart>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAnxiety" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorMood)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="anxiety"
              stroke="hsl(var(--destructive))"
              fillOpacity={1}
              fill="url(#colorAnxiety)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="sleep"
              stroke="hsl(var(--secondary))"
              fillOpacity={1}
              fill="url(#colorSleep)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
    </Card>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <div className="font-medium">{label}</div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs">Mood: {payload[0].value}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-destructive" />
            <span className="text-xs">Anxiety: {payload[1].value}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-secondary" />
            <span className="text-xs">Sleep: {payload[2].value}</span>
          </div>
        </div>
      </ChartTooltip>
    )
  }

  return null
}

