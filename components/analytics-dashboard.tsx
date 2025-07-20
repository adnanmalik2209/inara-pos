"use client"

import { useState } from "react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart,
  LineChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, DollarSign, ShoppingCart, Target, Calendar, Download } from "lucide-react"
import {
  salesData,
  hourlyData,
  menuData,
  customerData,
  weeklyData,
  kpiData,
  performanceMetrics,
  peakHoursData,
  salesAnalytics,
} from "@/lib/dummy-data"

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [selectedYear, setSelectedYear] = useState("2024")
  const currentKPI = kpiData[selectedYear]

  const todayAnalytics = salesAnalytics[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Analitik Penjualan</h1>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-white/20 backdrop-blur-sm border-white/30">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="week">Minggu Ini</SelectItem>
              <SelectItem value="month">Bulan Ini</SelectItem>
              <SelectItem value="year">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32 bg-white/20 backdrop-blur-sm border-white/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30">
            <Download className="h-4 w-4 mr-2" />
            Ekspor
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="sales">Penjualan</TabsTrigger>
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="customers">Pelanggan</TabsTrigger>
          <TabsTrigger value="performance">Performa</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Pendapatan Hari Ini</p>
                    <p className="text-2xl font-bold text-emerald-600">Rp {todayAnalytics.revenue.toLocaleString()}</p>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5%
                    </Badge>
                  </div>
                  <DollarSign className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Pesanan Hari Ini</p>
                    <p className="text-2xl font-bold text-blue-600">{todayAnalytics.orders}</p>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.3%
                    </Badge>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Pelanggan Hari Ini</p>
                    <p className="text-2xl font-bold text-purple-600">{todayAnalytics.customers}</p>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15.2%
                    </Badge>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Rata-rata Pesanan</p>
                    <p className="text-2xl font-bold text-orange-600">
                      Rp {todayAnalytics.averageOrderValue.toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5.7%
                    </Badge>
                  </div>
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly Revenue */}
            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardHeader>
                <CardTitle>Pendapatan per Jam</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Pendapatan", color: "#059669" },
                    orders: { label: "Pesanan", color: "#7c3aed" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={todayAnalytics.hourlyBreakdown}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#059669"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Selling Items */}
            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardHeader>
                <CardTitle>Produk Terlaris Hari Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAnalytics.topSellingItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-emerald-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-slate-600">{item.quantity} terjual</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">Rp {item.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Metrik Performa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{metric.value}%</span>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                          {metric.trend}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${metric.color}`} style={{ width: `${metric.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          {/* Monthly Sales Trend */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Tren Penjualan Bulanan {selectedYear}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: { label: "Pendapatan", color: "#059669" },
                  transactions: { label: "Transaksi", color: "#7c3aed" },
                  target: { label: "Target", color: "#e5e7eb" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData[selectedYear]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="target" stroke="#e5e7eb" strokeDasharray="5 5" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="transactions"
                      stroke="#7c3aed"
                      strokeWidth={2}
                      dot={{ fill: "#7c3aed", strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Weekly Performance */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Performa Mingguan</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  thisWeek: { label: "Minggu Ini", color: "#059669" },
                  lastWeek: { label: "Minggu Lalu", color: "#7c3aed" },
                  target: { label: "Target", color: "#e5e7eb" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="lastWeek" fill="#7c3aed" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="thisWeek" fill="#059669" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          {/* Menu Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardHeader>
                <CardTitle>Distribusi Penjualan Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: { label: "Penjualan %" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={menuData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="sales"
                      >
                        {menuData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardHeader>
                <CardTitle>Top Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuData.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-slate-600">{item.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{item.sales}%</p>
                        <p className="text-sm text-slate-600">Rp {item.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Customer Segmentation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardHeader>
                <CardTitle>Segmentasi Pelanggan</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: { label: "Jumlah Pelanggan" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={120}
                        paddingAngle={3}
                        dataKey="count"
                      >
                        {customerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardHeader>
                <CardTitle>Detail Segmen Pelanggan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerData.map((segment, index) => (
                    <div key={index} className="p-4 bg-white/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.fill }} />
                          <span className="font-medium">{segment.segment}</span>
                        </div>
                        <span className="font-bold">{segment.count} orang</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-slate-600">Revenue:</span>
                          <p className="font-semibold">Rp {segment.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Rating:</span>
                          <p className="font-semibold">{segment.satisfaction}/5</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Retensi:</span>
                          <p className="font-semibold">{segment.retention}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Peak Hours Analysis */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Analisis Jam Sibuk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {peakHoursData.map((period, index) => (
                  <div key={index} className="p-4 bg-white/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{period.period}</h3>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        {period.efficiency}% efisiensi
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Pelanggan:</span>
                        <p className="text-lg font-bold">{period.customers}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Pendapatan:</span>
                        <p className="text-lg font-bold text-emerald-600">Rp {period.revenue}K</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hourly Pattern */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Pola Kunjungan Harian</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  customers: { label: "Pelanggan", color: "#059669" },
                  efficiency: { label: "Efisiensi", color: "#7c3aed" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hour" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="customers" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
