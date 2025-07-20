"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Maximize2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ChartCardProps {
  title: string
  children: React.ReactNode
  className?: string
  height?: string
}

export function ChartCard({ title, children, className, height = "auto" }: ChartCardProps) {
  return (
    <Card
      className={`bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
      style={{ height }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-6 pt-6">
        <CardTitle className="text-lg font-semibold text-slate-900 truncate flex-1 mr-4">{title}</CardTitle>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" size="sm" className="hover:bg-white/20 backdrop-blur-sm h-8 w-8 p-0">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-white/20 backdrop-blur-sm h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md border border-white/30">
              <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
              <DropdownMenuItem>Ekspor Data</DropdownMenuItem>
              <DropdownMenuItem>Konfigurasi</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0 overflow-hidden">
        <div className="w-full h-full overflow-hidden">{children}</div>
      </CardContent>
    </Card>
  )
}
