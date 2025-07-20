"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

export function KPICard({ title, value, change, changeType, icon: Icon, iconColor, iconBg }: KPICardProps) {
  const changeColors = {
    positive: "bg-emerald-100/80 text-emerald-700 border-emerald-200/50 backdrop-blur-sm",
    negative: "bg-red-100/80 text-red-700 border-red-200/50 backdrop-blur-sm",
    neutral: "bg-gray-100/80 text-gray-700 border-gray-200/50 backdrop-blur-sm",
  }

  return (
    <Card className="relative overflow-hidden bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 h-[180px]">
      <CardContent className="p-6 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 mb-2 truncate">{title}</p>
            <p className="text-2xl font-bold tracking-tight text-slate-900 mb-3 break-words">{value}</p>
          </div>
          <div className={`rounded-xl p-2.5 ${iconBg} backdrop-blur-sm flex-shrink-0 ml-3`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
        <div className="mt-auto">
          <Badge variant="outline" className={`text-xs font-medium ${changeColors[changeType]} truncate max-w-full`}>
            {change}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-purple-600" />
      </CardContent>
    </Card>
  )
}
