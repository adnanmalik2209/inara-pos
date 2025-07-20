"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Coffee,
  BarChart3,
  Settings,
  Users,
  Package,
  ClipboardList,
  Calculator,
  LogOut,
  User,
  Bell,
  ChevronDown,
} from "lucide-react"

interface POSLayoutProps {
  children: React.ReactNode
  currentView: string
  onViewChange: (view: string) => void
  currentUser: any
}

export function POSLayout({ children, currentView, onViewChange, currentUser }: POSLayoutProps) {
  const [notifications] = useState(3)

  const navigationItems = [
    { id: "pos", label: "Kasir", icon: Calculator, color: "text-emerald-600" },
    { id: "orders", label: "Pesanan", icon: ClipboardList, color: "text-blue-600" },
    { id: "products", label: "Menu", icon: Coffee, color: "text-purple-600" },
    { id: "inventory", label: "Inventori", icon: Package, color: "text-orange-600" },
    { id: "staff", label: "Staf", icon: Users, color: "text-pink-600" },
    { id: "analytics", label: "Analitik", icon: BarChart3, color: "text-indigo-600" },
    { id: "settings", label: "Pengaturan", icon: Settings, color: "text-gray-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-purple-50 to-violet-50">
      {/* Top Navigation */}
      <header className="bg-white/20 backdrop-blur-md border-b border-white/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Inara Cafe</h1>
                <p className="text-sm text-slate-600">Management System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 relative"
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">{notifications}</Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 flex items-center gap-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{currentUser?.name}</p>
                    <p className="text-xs text-slate-600 capitalize">{currentUser?.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-md border border-white/30">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Side Navigation */}
        <nav className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20 min-h-[calc(100vh-80px)]">
          <div className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    isActive ? "bg-white/30 backdrop-blur-sm text-slate-900" : "hover:bg-white/20 text-slate-700"
                  }`}
                  onClick={() => onViewChange(item.id)}
                >
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
