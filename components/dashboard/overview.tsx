"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    month: "Jan",
    premium: 2400,
  },
  {
    month: "Feb",
    premium: 1398,
  },
  {
    month: "Mar",
    premium: 2000,
  },
  {
    month: "Apr",
    premium: 3908,
  },
  {
    month: "May",
    premium: 4800,
  },
  {
    month: "Jun",
    premium: 3800,
  },
  {
    month: "Jul",
    premium: 4300,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="premium"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
} 