"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Filter, Package, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"
import { products, categories, type Product, type Category } from "@/lib/pos-data"

export function ProductManagement() {
  const [productList, setProductList] = useState<Product[]>(products)
  const [categoryList, setCategoryList] = useState<Category[]>(categories)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 0,
    description: "",
    preparationTime: 0,
    ingredients: [],
    isAvailable: true,
  })

  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    description: "",
    color: "#059669",
    isActive: true,
  })

  const filteredProducts = productList.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { status: "out-of-stock", color: "bg-red-100 text-red-800", label: "Habis" }
    if (product.stock <= product.minStock)
      return { status: "low-stock", color: "bg-yellow-100 text-yellow-800", label: "Stok Rendah" }
    return { status: "in-stock", color: "bg-green-100 text-green-800", label: "Tersedia" }
  }

  const handleAddProduct = () => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      image: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(newProduct.name || "Product")}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      soldToday: 0,
      soldThisMonth: 0,
      calories: 0,
      ingredients: newProduct.ingredients || [],
    } as Product

    setProductList([...productList, product])
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      description: "",
      preparationTime: 0,
      ingredients: [],
      isAvailable: true,
    })
    setShowAddProduct(false)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct(product)
    setShowAddProduct(true)
  }

  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProductList(
        productList.map((p) =>
          p.id === editingProduct.id ? ({ ...newProduct, id: editingProduct.id, updatedAt: new Date() } as Product) : p,
        ),
      )
      setEditingProduct(null)
      setNewProduct({
        name: "",
        category: "",
        price: 0,
        cost: 0,
        stock: 0,
        minStock: 0,
        description: "",
        preparationTime: 0,
        ingredients: [],
        isAvailable: true,
      })
      setShowAddProduct(false)
    }
  }

  const handleDeleteProduct = (productId: string) => {
    setProductList(productList.filter((p) => p.id !== productId))
  }

  const handleAddCategory = () => {
    const category: Category = {
      ...newCategory,
      id: Date.now().toString(),
      icon: "Package",
      productCount: 0,
    } as Category

    setCategoryList([...categoryList, category])
    setNewCategory({
      name: "",
      description: "",
      color: "#059669",
      isActive: true,
    })
    setShowAddCategory(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Menu</h1>
        <div className="flex items-center gap-3">
          <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30">
                <Plus className="h-4 w-4 mr-2" />
                Kategori Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/90 backdrop-blur-md border border-white/30">
              <DialogHeader>
                <DialogTitle>Tambah Kategori Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName">Nama Kategori</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Masukkan nama kategori"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryDescription">Deskripsi</Label>
                  <Textarea
                    id="categoryDescription"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Deskripsi kategori"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryColor">Warna</Label>
                  <Input
                    id="categoryColor"
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="categoryActive"
                    checked={newCategory.isActive}
                    onCheckedChange={(checked) => setNewCategory({ ...newCategory, isActive: checked })}
                  />
                  <Label htmlFor="categoryActive">Aktif</Label>
                </div>
                <Button onClick={handleAddCategory} className="w-full">
                  Tambah Kategori
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Produk Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/90 backdrop-blur-md border border-white/30 max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Produk" : "Tambah Produk Baru"}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[600px]">
                <div className="space-y-4 pr-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productName">Nama Produk</Label>
                      <Input
                        id="productName"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Nama produk"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productCategory">Kategori</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryList.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="productDescription">Deskripsi</Label>
                    <Textarea
                      id="productDescription"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Deskripsi produk"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productPrice">Harga Jual (Rp)</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productCost">Harga Modal (Rp)</Label>
                      <Input
                        id="productCost"
                        type="number"
                        value={newProduct.cost}
                        onChange={(e) => setNewProduct({ ...newProduct, cost: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="productStock">Stok</Label>
                      <Input
                        id="productStock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productMinStock">Stok Minimum</Label>
                      <Input
                        id="productMinStock"
                        type="number"
                        value={newProduct.minStock}
                        onChange={(e) => setNewProduct({ ...newProduct, minStock: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productPrepTime">Waktu Persiapan (menit)</Label>
                      <Input
                        id="productPrepTime"
                        type="number"
                        value={newProduct.preparationTime}
                        onChange={(e) => setNewProduct({ ...newProduct, preparationTime: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="productIngredients">Bahan-bahan (pisahkan dengan koma)</Label>
                    <Textarea
                      id="productIngredients"
                      value={newProduct.ingredients?.join(", ")}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          ingredients: e.target.value.split(",").map((item) => item.trim()),
                        })
                      }
                      placeholder="Bahan 1, Bahan 2, Bahan 3"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="productAvailable"
                      checked={newProduct.isAvailable}
                      onCheckedChange={(checked) => setNewProduct({ ...newProduct, isAvailable: checked })}
                    />
                    <Label htmlFor="productAvailable">Tersedia</Label>
                  </div>

                  <Button
                    onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                    className="w-full"
                    disabled={!newProduct.name || !newProduct.category || !newProduct.price}
                  >
                    {editingProduct ? "Update Produk" : "Tambah Produk"}
                  </Button>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="categories">Kategori</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          {/* Filters */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    placeholder="Cari produk..."
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
                    {categoryList.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product)
              const profitMargin = ((product.price - product.cost) / product.price) * 100

              return (
                <Card
                  key={product.id}
                  className="bg-white/20 backdrop-blur-md border border-white/30 hover:shadow-lg transition-all"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Badge className={`absolute top-2 right-2 ${stockStatus.color}`}>{stockStatus.label}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm truncate flex-1">{product.name}</h3>
                        <Badge variant="outline" className="text-xs ml-2">
                          {product.category}
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">{product.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-600">Harga:</span>
                          <p className="font-semibold text-emerald-600">Rp {product.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Stok:</span>
                          <p className="font-semibold">{product.stock}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Terjual Hari Ini:</span>
                          <p className="font-semibold">{product.soldToday}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Margin:</span>
                          <p className="font-semibold text-purple-600">{profitMargin.toFixed(1)}%</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 pt-2 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 h-8"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryList.map((category) => (
              <Card key={category.id} className="bg-white/20 backdrop-blur-md border border-white/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: category.color + "20" }}
                      >
                        <Package className="h-5 w-5" style={{ color: category.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-slate-600">{category.productCount} produk</p>
                      </div>
                    </div>
                    <Badge variant={category.isActive ? "default" : "secondary"}>
                      {category.isActive ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{category.description}</p>
                  <div className="flex gap-2">
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Produk</p>
                    <p className="text-2xl font-bold">{productList.length}</p>
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
                      {productList.filter((p) => p.stock <= p.minStock).length}
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
                    <p className="text-2xl font-bold text-red-600">{productList.filter((p) => p.stock === 0).length}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Tersedia</p>
                    <p className="text-2xl font-bold text-green-600">
                      {productList.filter((p) => p.stock > p.minStock).length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Selling Products */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Produk Terlaris Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {productList
                  .sort((a, b) => b.soldToday - a.soldToday)
                  .slice(0, 10)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-emerald-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-slate-600">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{product.soldToday} terjual</p>
                        <p className="text-sm text-slate-600">
                          Rp {(product.soldToday * product.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
