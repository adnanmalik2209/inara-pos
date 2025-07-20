"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Store, CreditCard, Bell, Database, Save, RefreshCw, Upload } from "lucide-react"
import { systemSettings } from "@/lib/pos-data"

export function SettingsManagement() {
  const [settings, setSettings] = useState(systemSettings)
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Here you would save settings to backend
    console.log("Saving settings:", settings)
    setHasChanges(false)
    alert("Pengaturan berhasil disimpan!")
  }

  const handleReset = () => {
    setSettings(systemSettings)
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Sistem</h1>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Ada perubahan yang belum disimpan
            </Badge>
          )}
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges} className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="h-4 w-4 mr-2" />
            Simpan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="cafe" className="space-y-4">
        <TabsList className="bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="cafe">
            <Store className="h-4 w-4 mr-2" />
            Cafe
          </TabsTrigger>
          <TabsTrigger value="pos">
            <CreditCard className="h-4 w-4 mr-2" />
            POS
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <Database className="h-4 w-4 mr-2" />
            Inventori
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="h-4 w-4 mr-2" />
            Sistem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cafe" className="space-y-6">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Informasi Cafe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cafeName">Nama Cafe</Label>
                  <Input
                    id="cafeName"
                    value={settings.cafe.name}
                    onChange={(e) => updateSetting('cafe', 'name', e.target.value)}
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
                <div>
                  <Label htmlFor="cafePhone">Nomor Telepon</Label>
                  <Input
                    id="cafePhone"
                    value={settings.cafe.phone}
                    onChange={(e) => updateSetting('cafe', 'phone', e.target.value)}
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cafeAddress">Alamat</Label>
                <Textarea
                  id="cafeAddress"
                  value={settings.cafe.address}
                  onChange={(e) => updateSetting('cafe', 'address', e.target.value)}
                  className="bg-white/20 backdrop-blur-sm border-white/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cafeEmail">Email</Label>
                  <Input
                    id="cafeEmail"
                    type="email"
                    value={settings.cafe.email}
                    onChange={(e) => updateSetting('cafe', 'email', e.target.value)}
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
                <div>
                  <Label htmlFor="cafeWebsite">Website</Label>
                  <Input
                    id="cafeWebsite"
                    value={settings.cafe.website}
                    onChange={(e) => updateSetting('cafe', 'website', e.target.value)}
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="taxRate">Pajak (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.cafe.taxRate}
                    onChange={(e) => updateSetting('cafe', 'taxRate', Number(e.target.value))}
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceCharge">Service Charge (%)</Label>
                  <Input
                    id="serviceCharge"
                    type="number"
                    value={settings.cafe.serviceCharge}
                    onChange={(e) => updateSetting('cafe', 'serviceCharge', Number(e.target.value))}
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Mata Uang</Label>
                  <Select
                    value={settings.cafe.currency}
                    onValueChange={(value) => updateSetting('cafe', 'currency', value)}
                  >
                    <SelectTrigger className="bg-white/20 backdrop-blur-sm border-white/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IDR">IDR - Rupiah</SelectItem>
                      <SelectItem value="USD">USD - Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="logoUpload">Logo Cafe</Label>
                <div className="flex items-center gap-4 mt-2">
                  <img
                    src={settings.cafe.logo || "/placeholder.svg"}
                    alt="Logo"
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pos" className="space-y-6">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Pengaturan POS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="autoLogout">Auto Logout (menit)</Label>
                    <Input
                      id="autoLogout"
                      type="number"
                      value={settings.pos.autoLogout}
                      onChange={(e) => updateSetting('pos', 'autoLogout', Number(e.target.value))}
                      className="bg-white/20 backdrop-blur-sm border-white/30"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxDiscount">Maksimal Diskon (%)</Label>
                    <Input
                      id="maxDiscount"
                      type="number"
                      value={settings.pos.maxDiscountPercent}
                      onChange={(e) => updateSetting('pos', 'maxDiscountPercent', Number(e.target.value))}
                      className="bg-white/20 backdrop-blur-sm border-white/30"
                    />
                  </div>

                  <div>
                    <Label htmlFor="defaultOrderType">Tipe Pesanan Default</Label>
                    <Select
                      value={settings.pos.defaultOrderType}
                      onValueChange={(value) => updateSetting('pos', 'defaultOrderType', value)}
                    >
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
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="printReceipt">Print Receipt Otomatis</Label>
                      <p className="text-sm text-slate-600">Cetak struk secara otomatis setelah pembayaran</p>
                    </div>
                    <Switch
                      id="printReceipt"
                      checked={settings.pos.printReceipt}
                      onCheckedChange={(checked) => updateSetting('pos', 'printReceipt', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="customerDisplay">Customer Display</Label>
                      <p className="text-sm text-slate-600">Tampilkan layar untuk pelanggan</p>
                    </div>
                    <Switch
                      id="customerDisplay"
                      checked={settings.pos.showCustomerDisplay}
                      onCheckedChange={(checked) => updateSetting('pos', 'showCustomerDisplay', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowDiscount">Izinkan Diskon</Label>
                      <p className="text-sm text-slate-600">Kasir dapat memberikan diskon</p>
                    </div>
                    <Switch
                      id="allowDiscount"
                      checked={settings.pos.allowDiscount}
                      onCheckedChange={(checked) => updateSetting('pos', 'allowDiscount', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireCustomer">Wajib Info Pelanggan</Label>
                      <p className="text-sm text-slate-600">Wajib input data pelanggan</p>
                    </div>
                    <Switch
                      id="requireCustomer"
                      checked={settings.pos.requireCustomerInfo}
                      onCheckedChange={(checked) => updateSetting('pos', 'requireCustomerInfo', checked)}
                    />
                  </div>
                </div>
              </div>\
