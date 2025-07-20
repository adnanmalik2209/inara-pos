"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Package,
  TrendingDown,
  TrendingUp,
  Calendar,
  Truck,
  Filter,
} from "lucide-react"
import { inventoryData, suppliers, type InventoryItem, type Supplier } from "@/lib/pos-data"

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData)
  const [supplierList, setSupplierList] = useState<Supplier[]>(suppliers)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddItem, setShowAddItem] = useState(false)
  const [showAddSupplier, setShowAddSupplier] = useState(false)

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "ingredients",
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: "",
    costPerUnit: 0,
    supplier: "",
    location: "",
  })

  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: "",
    contact: "",
    email: "",
    address: "",
    products: [],
    rating: 5,
    paymentTerms: "",
    deliveryDays: [],
  })

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Package className="h-4 w-4" />
      case "low-stock":
        return <AlertTriangle className="h-4 w-4" />
      case "out-of-stock":
        return <TrendingDown className="h-4 w-4" />
      case "expired":
        return <Calendar className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const handleAddItem = () => {
    const item: InventoryItem = {
      ...newItem,
      id: Date.now().toString(),
      lastRestocked: new Date(),
      status:
        newItem.currentStock === 0
          ? "out-of-stock"
          : (newItem.currentStock || 0) <= (newItem.minStock || 0)
            ? "low-stock"
            : "in-stock",
    } as InventoryItem

    setInventory([...inventory, item])
    setNewItem({
      name: "",
      category: "ingredients",
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unit: "",
      costPerUnit: 0,
      supplier: "",
      location: "",
    })
    setShowAddItem(false)
  }

  const handleAddSupplier = () => {
    const supplier: Supplier = {
      ...newSupplier,
      id: Date.now().toString(),
      products: newSupplier.products || [],
      deliveryDays: newSupplier.deliveryDays || [],
    } as Supplier

    setSupplierList([...supplierList, supplier])
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      address: "",
      products: [],
      rating: 5,
      paymentTerms: "",
      deliveryDays: [],
    })
    setShowAddSupplier(false)
  }

  const updateStock = (itemId: string, newStock: number) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === itemId) {
          const status = newStock === 0 ? "out-of-stock" : newStock <= item.minStock ? "low-stock" : "in-stock"
          return { ...item, currentStock: newStock, status }
        }
        return item
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Inventori</h1>
        <div className="flex items-center gap-3">
          <Dialog open={showAddSupplier} onOpenChange={setShowAddSupplier}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30">
                <Truck className="h-4 w-4 mr-2" />
                Supplier Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/90 backdrop-blur-md border border-white/30">
              <DialogHeader>
                <DialogTitle>Tambah Supplier Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplierName">Nama Supplier</Label>
                    <Input
                      id="supplierName"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                      placeholder="Nama supplier"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplierContact">Kontak</Label>
                    <Input
                      id="supplierContact"
                      value={newSupplier.contact}
                      onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                      placeholder="Nomor telepon"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="supplierEmail">Email</Label>
                  <Input
                    id="supplierEmail"
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    placeholder="Email supplier"
                  />
                </div>
                <div>
                  <Label htmlFor="supplierAddress">Alamat</Label>
                  <Input
                    id="supplierAddress"
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                    placeholder="Alamat lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="supplierTerms">Syarat Pembayaran</Label>
                  <Input
                    id="supplierTerms"
                    value={newSupplier.paymentTerms}
                    onChange={(e) => setNewSupplier({ ...newSupplier, paymentTerms: e.target.value })}
                    placeholder="Net 30, COD, dll"
                  />
                </div>
                <Button onClick={handleAddSupplier} className="w-full">
                  Tambah Supplier
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Item Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/90 backdrop-blur-md border border-white/30 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Tambah Item Inventori</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemName">Nama Item</Label>
                    <Input
                      id="itemName"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="Nama item"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemCategory">Kategori</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value: any) => setNewItem({ ...newItem, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ingredients">Bahan Baku</SelectItem>
                        <SelectItem value="packaging">Kemasan</SelectItem>
                        <SelectItem value="supplies">Perlengkapan</SelectItem>
                        <SelectItem value="equipment">Peralatan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currentStock">Stok Saat Ini</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      value={newItem.currentStock}
                      onChange={(e) => setNewItem({ ...newItem, currentStock: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minStock">Stok Minimum</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({ ...newItem, minStock: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxStock">Stok Maksimum</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={newItem.maxStock}
                      onChange={(e) => setNewItem({ ...newItem, maxStock: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="unit">Satuan</Label>
                    <Input
                      id="unit"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                      placeholder="kg, liter, pcs, dll"
                    />
                  </div>
                  <div>
                    <Label htmlFor="costPerUnit">Harga per Satuan</Label>
                    <Input
                      id="costPerUnit"
                      type="number"
                      value={newItem.costPerUnit}
                      onChange={(e) => setNewItem({ ...newItem, costPerUnit: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select
                      value={newItem.supplier}
                      onValueChange={(value) => setNewItem({ ...newItem, supplier: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {supplierList.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.name}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Lokasi Penyimpanan</Label>
                    <Input
                      id="location"
                      value={newItem.location}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      placeholder="Gudang A-1, Kulkas B-2, dll"
                    />
                  </div>
                </div>

                <Button onClick={handleAddItem} className="w-full">
                  Tambah Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList className="bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="inventory">Inventori</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Item</p>
                    <p className="text-2xl font-bold">{inventory.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Stok Rendah</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {inventory.filter((item) => item.status === "low-stock").length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Habis Stok</p>
                    <p className="text-2xl font-bold text-red-600">
                      {inventory.filter((item) => item.status === "out-of-stock").length}
                    </p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Nilai Inventori</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      Rp{" "}
                      {inventory.reduce((sum, item) => sum + item.currentStock * item.costPerUnit, 0).toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    placeholder="Cari item..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-white/20 backdrop-blur-sm border-white/30">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="ingredients">Bahan Baku</SelectItem>
                    <SelectItem value="packaging">Kemasan</SelectItem>
                    <SelectItem value="supplies">Perlengkapan</SelectItem>
                    <SelectItem value="equipment">Peralatan</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48 bg-white/20 backdrop-blur-sm border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="in-stock">Tersedia</SelectItem>
                    <SelectItem value="low-stock">Stok Rendah</SelectItem>
                    <SelectItem value="out-of-stock">Habis Stok</SelectItem>
                    <SelectItem value="expired">Kadaluarsa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Daftar Inventori</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {filteredInventory.map((item) => (
                    <Card key={item.id} className="bg-white/30 backdrop-blur-sm border border-white/40">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge className={getStatusColor(item.status)}>
                                {getStatusIcon(item.status)}
                                <span className="ml-1 capitalize">{item.status.replace("-", " ")}</span>
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {item.category.replace("-", " ")}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-slate-600">Stok Saat Ini</p>
                                <p className="font-semibold">
                                  {item.currentStock} {item.unit}
                                </p>
                              </div>
                              <div>
                                <p className="text-slate-600">Stok Minimum</p>
                                <p className="font-semibold">
                                  {item.minStock} {item.unit}
                                </p>
                              </div>
                              <div>
                                <p className="text-slate-600">Harga per {item.unit}</p>
                                <p className="font-semibold">Rp {item.costPerUnit.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-slate-600">Nilai Total</p>
                                <p className="font-semibold text-emerald-600">
                                  Rp {(item.currentStock * item.costPerUnit).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-3 pt-3 border-t">
                              <div>
                                <p className="text-slate-600">Supplier</p>
                                <p className="font-medium">{item.supplier}</p>
                              </div>
                              <div>
                                <p className="text-slate-600">Lokasi</p>
                                <p className="font-medium">{item.location}</p>
                              </div>
                              <div>
                                <p className="text-slate-600">Terakhir Restock</p>
                                <p className="font-medium">{item.lastRestocked.toLocaleDateString("id-ID")}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStock(item.id, item.currentStock - 1)}
                                disabled={item.currentStock <= 0}
                                className="w-8 h-8 p-0"
                              >
                                -
                              </Button>
                              <Input
                                type="number"
                                value={item.currentStock}
                                onChange={(e) => updateStock(item.id, Number(e.target.value))}
                                className="w-16 h-8 text-center"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStock(item.id, item.currentStock + 1)}
                                className="w-8 h-8 p-0"
                              >
                                +
                              </Button>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="w-8 h-8 p-0 text-red-600 bg-transparent">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplierList.map((supplier) => (
              <Card key={supplier.id} className="bg-white/20 backdrop-blur-md border border-white/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                i < supplier.rating ? "bg-yellow-400" : "bg-gray-200"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-slate-600 ml-1">({supplier.rating})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-600">Kontak: </span>
                      <span className="font-medium">{supplier.contact}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Email: </span>
                      <span className="font-medium">{supplier.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Produk: </span>
                      <span className="font-medium">{supplier.products.length} item</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Pembayaran: </span>
                      <span className="font-medium">{supplier.paymentTerms}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Hari Kirim: </span>
                      <span className="font-medium">{supplier.deliveryDays.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 text-red-600 bg-transparent">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="text-center py-20">
            <Package className="h-16 w-16 mx-auto mb-4 text-slate-400" />
            <h2 className="text-2xl font-bold mb-4">Laporan Inventori</h2>
            <p className="text-slate-600 mb-6">Fitur laporan inventori akan segera hadir</p>
            <Button>Generate Laporan</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
