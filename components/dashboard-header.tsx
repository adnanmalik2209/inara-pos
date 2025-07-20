"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Filter, Download, RefreshCw, Calendar, ChevronDown, Bell } from "lucide-react"

interface DashboardHeaderProps {
  selectedYear: string
  onYearChange: (year: string) => void
}

export function DashboardHeader({ selectedYear, onYearChange }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/20 bg-white/10 backdrop-blur-md px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-4 h-6 bg-white/20" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" className="text-slate-700">
                Ringkasan
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-slate-900 font-medium">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Cari wawasan..."
              className="w-[200px] pl-10 md:w-[280px] bg-white/20 backdrop-blur-sm border-white/30 placeholder:text-slate-500 h-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 h-9"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {selectedYear}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md border border-white/30">
              <DropdownMenuItem onClick={() => onYearChange("2024")}>2024</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onYearChange("2023")}>2023</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onYearChange("2022")}>2022</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 h-9"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 h-9"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Perbarui
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 h-9"
          >
            <Download className="h-4 w-4 mr-2" />
            Ekspor
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 h-9 w-9 p-0"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 bg-white/20" />

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-emerald-100/80 text-emerald-700 backdrop-blur-sm text-xs">
            Data Langsung
          </Badge>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </header>
  )
}
