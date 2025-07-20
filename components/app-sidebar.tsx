"use client"

import type * as React from "react"
import {
  BarChart3,
  Coffee,
  TrendingUp,
  Users,
  Settings,
  PieChart,
  Calendar,
  FileText,
  Home,
  Database,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Ringkasan",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: Home,
          isActive: true,
        },
        {
          title: "Analitik",
          url: "#",
          icon: BarChart3,
        },
        {
          title: "Laporan",
          url: "#",
          icon: FileText,
        },
      ],
    },
    {
      title: "Business Intelligence",
      items: [
        {
          title: "Performa Penjualan",
          url: "#",
          icon: TrendingUp,
        },
        {
          title: "Wawasan Pelanggan",
          url: "#",
          icon: Users,
        },
        {
          title: "Analisis Menu",
          url: "#",
          icon: PieChart,
        },
        {
          title: "Data Operasional",
          url: "#",
          icon: Database,
        },
      ],
    },
    {
      title: "Alat",
      items: [
        {
          title: "Kalender",
          url: "#",
          icon: Calendar,
        },
        {
          title: "Pengaturan",
          url: "#",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="sidebar"
      className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md border-r border-white/20 overflow-hidden"
      {...props}
    >
      <SidebarHeader className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600 flex-shrink-0">
            <Coffee className="h-5 w-5 text-white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
            <span className="truncate font-semibold text-base text-slate-900">Inara Cafe</span>
            <span className="truncate text-xs text-slate-600">Business Intelligence</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 overflow-y-auto">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-slate-700 px-2">{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      className="hover:bg-white/20 data-[active=true]:bg-white/30 backdrop-blur-sm mx-2 rounded-lg"
                    >
                      <a href={item.url} className="flex items-center gap-3 px-3 py-2 truncate">
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="px-6 py-4 border-t border-white/20">
        <div className="text-xs text-slate-600 text-center truncate">© 2024 Inara Cafe Analytics</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
