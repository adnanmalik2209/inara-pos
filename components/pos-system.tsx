"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, QrCode, Smartphone, ShoppingCart } from "lucide-react"
import { products, categories, paymentMethods, type Product, type OrderItem } from "@/lib/pos-data"

export function POSSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<OrderItem[]>([])
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway" | "delivery">("dine-in")
  const [tableNumber, setTableNumber] = useState<number | undefined>()
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showPayment, setShowPayment] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch && product.isAvailable
  })

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.productId === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ])
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.productId !== productId))
    } else {
      setCart(cart.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleCheckout = () => {
    if (cart.length === 0) return

    // Here you would process the order
    console.log("Processing order:", {
      items: cart,
      orderType,
      tableNumber,
      customerName,
      customerPhone,
      notes,
      paymentMethod,
      subtotal,
      tax,
      total,
    })

    // Reset form
    setCart([])
    setCustomerName("")
    setCustomerPhone("")
    setNotes("")
    setTableNumber(undefined)
    setShowPayment(false)

    alert("Pesanan berhasil diproses!")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      {/* Product Selection */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="bg-white/20 backdrop-blur-md border border-white/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Menu</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    placeholder="Cari menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Category Filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="whitespace-nowrap"
              >
                Semua
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Product Grid */}
            <ScrollArea className="h-[500px]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-all bg-white/30 backdrop-blur-sm border border-white/40"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-medium text-sm mb-1 truncate">{product.name}</h3>
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-600">Rp {product.price.toLocaleString()}</span>
                        <Badge variant="secondary" className="text-xs">
                          {product.stock} stok
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Cart & Checkout */}
      <div className="space-y-4">
        <Card className="bg-white/20 backdrop-blur-md border border-white/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Keranjang ({cart.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Order Type */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Tipe Pesanan</label>
              <Select value={orderType} onValueChange={(value: any) => setOrderType(value)}>
                <SelectTrigger className="bg-white/20 backdrop-blur-sm border-white/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dine-in">Dine In</SelectItem>
                  <SelectItem value="takeaway">Takeaway</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {orderType === "dine-in" && (
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Nomor Meja</label>
                <Input
                  type="number"
                  placeholder="Masukkan nomor meja"
                  value={tableNumber || ""}
                  onChange={(e) => setTableNumber(Number(e.target.value))}
                  className="bg-white/20 backdrop-blur-sm border-white/30"
                />
              </div>
            )}

            {/* Customer Info */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nama Pelanggan</label>
                <Input
                  placeholder="Nama pelanggan (opsional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-white/20 backdrop-blur-sm border-white/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">No. Telepon</label>
                <Input
                  placeholder="No. telepon (opsional)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="bg-white/20 backdrop-blur-sm border-white/30"
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Cart Items */}
            <ScrollArea className="h-64 mb-4">
              {cart.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Keranjang kosong</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between bg-white/20 rounded-lg p-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-slate-600">Rp {item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.productId)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Notes */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Catatan</label>
              <Textarea
                placeholder="Catatan khusus untuk pesanan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/20 backdrop-blur-sm border-white/30 h-20"
              />
            </div>

            {/* Order Summary */}
            {cart.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak (10%)</span>
                    <span>Rp {tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-emerald-600">Rp {total.toLocaleString()}</span>
                  </div>
                </div>

                <Dialog open={showPayment} onOpenChange={setShowPayment}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">Bayar Sekarang</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white/90 backdrop-blur-md border border-white/30">
                    <DialogHeader>
                      <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.map((method) => {
                          const Icon =
                            method.icon === "Banknote"
                              ? Banknote
                              : method.icon === "QrCode"
                                ? QrCode
                                : method.icon === "CreditCard"
                                  ? CreditCard
                                  : Smartphone

                          return (
                            <Button
                              key={method.id}
                              variant={paymentMethod === method.id ? "default" : "outline"}
                              className="h-16 flex-col gap-2"
                              onClick={() => setPaymentMethod(method.id)}
                            >
                              <Icon className="h-5 w-5" style={{ color: method.color }} />
                              <span className="text-xs">{method.name}</span>
                            </Button>
                          )
                        })}
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Ringkasan Pesanan</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Total Item</span>
                            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rp {subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pajak</span>
                            <span>Rp {tax.toLocaleString()}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total Bayar</span>
                            <span>Rp {total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" onClick={handleCheckout} disabled={!paymentMethod}>
                        Proses Pembayaran
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
