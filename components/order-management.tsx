"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Clock, CheckCircle, XCircle, Eye, Printer, RefreshCw, Filter } from "lucide-react"
import { sampleOrders, type Order } from "@/lib/pos-data"

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ""
    return matchesStatus && matchesSearch
  })

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, completedAt: newStatus === "completed" ? new Date() : order.completedAt }
          : order,
      ),
    )
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "preparing":
        return <RefreshCw className="h-4 w-4" />
      case "ready":
        return <CheckCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Pesanan</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Cari pesanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-white/20 backdrop-blur-sm border-white/30"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-white/20 backdrop-blur-sm border-white/30">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="preparing">Diproses</SelectItem>
              <SelectItem value="ready">Siap</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="cancelled">Dibatalkan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Total Pesanan", value: orders.length, color: "bg-blue-500" },
          { label: "Menunggu", value: orders.filter((o) => o.status === "pending").length, color: "bg-yellow-500" },
          { label: "Diproses", value: orders.filter((o) => o.status === "preparing").length, color: "bg-blue-500" },
          { label: "Siap", value: orders.filter((o) => o.status === "ready").length, color: "bg-green-500" },
          { label: "Selesai", value: orders.filter((o) => o.status === "completed").length, color: "bg-gray-500" },
        ].map((stat, index) => (
          <Card key={index} className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-3 h-12 rounded-full ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders List */}
      <Card className="bg-white/20 backdrop-blur-md border border-white/30">
        <CardHeader>
          <CardTitle>Daftar Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="bg-white/30 backdrop-blur-sm border border-white/40">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold">{order.orderNumber}</h3>
                          <p className="text-sm text-slate-600">
                            {order.customerName || "Guest"} • {order.orderType}
                            {order.tableNumber && ` • Meja ${order.tableNumber}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <span className="text-sm text-slate-600">
                          {order.timestamp.toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600">Items</p>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <p key={index} className="text-sm">
                              {item.quantity}x {item.name}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-slate-500">+{order.items.length - 2} item lainnya</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Total</p>
                        <p className="font-semibold text-emerald-600">Rp {order.total.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 capitalize">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Waktu</p>
                        <p className="text-sm">{order.timestamp.toLocaleString("id-ID")}</p>
                        {order.completedAt && (
                          <p className="text-xs text-green-600">
                            Selesai: {order.completedAt.toLocaleTimeString("id-ID")}
                          </p>
                        )}
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mb-4 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                        <p className="text-sm">
                          <strong>Catatan:</strong> {order.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, "preparing")}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Mulai Proses
                          </Button>
                        )}
                        {order.status === "preparing" && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, "ready")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Siap
                          </Button>
                        )}
                        {order.status === "ready" && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, "completed")}
                            className="bg-gray-600 hover:bg-gray-700"
                          >
                            Selesai
                          </Button>
                        )}
                        {(order.status === "pending" || order.status === "preparing") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateOrderStatus(order.id, "cancelled")}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Batalkan
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white/90 backdrop-blur-md border border-white/30 max-w-md">
                            <DialogHeader>
                              <DialogTitle>Detail Pesanan {order.orderNumber}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Informasi Pelanggan</h4>
                                <p className="text-sm">Nama: {order.customerName || "Guest"}</p>
                                <p className="text-sm">Tipe: {order.orderType}</p>
                                {order.tableNumber && <p className="text-sm">Meja: {order.tableNumber}</p>}
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Items</h4>
                                <div className="space-y-2">
                                  {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <span>
                                        {item.quantity}x {item.name}
                                      </span>
                                      <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="border-t pt-2">
                                <div className="flex justify-between text-sm">
                                  <span>Subtotal</span>
                                  <span>Rp {order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Pajak</span>
                                  <span>Rp {order.tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                  <span>Total</span>
                                  <span>Rp {order.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline">
                          <Printer className="h-4 w-4 mr-1" />
                          Print
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
