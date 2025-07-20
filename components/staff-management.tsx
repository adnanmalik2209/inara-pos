"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Edit, Trash2, Users, Clock, Star, TrendingUp, Calendar, Phone, Mail, Filter } from "lucide-react"
import { staffData, type Staff } from "@/lib/pos-data"

export function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>(staffData)
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)

  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: "",
    role: "cashier",
    email: "",
    phone: "",
    shift: "",
    address: "",
    emergencyContact: "",
    salary: 0,
    isActive: true,
    permissions: [],
  })

  const filteredStaff = staff.filter((member) => {
    const matchesRole = selectedRole === "all" || member.role === selectedRole
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && member.isActive) ||
      (selectedStatus === "inactive" && !member.isActive)
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRole && matchesStatus && matchesSearch
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "manager":
        return "bg-purple-100 text-purple-800"
      case "cashier":
        return "bg-blue-100 text-blue-800"
      case "chef":
        return "bg-orange-100 text-orange-800"
      case "waiter":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddStaff = () => {
    const staffMember: Staff = {
      ...newStaff,
      id: Date.now().toString(),
      avatar: `/placeholder.svg?height=100&width=100&text=${newStaff.name?.charAt(0) || "S"}`,
      joinDate: new Date().toISOString().split("T")[0],
      performance: {
        ordersHandled: 0,
        customerRating: 4.0,
        punctuality: 95,
        efficiency: 85,
      },
      schedule: {
        monday: "Off",
        tuesday: "Off",
        wednesday: "Off",
        thursday: "Off",
        friday: "Off",
        saturday: "Off",
        sunday: "Off",
      },
    } as Staff

    setStaff([...staff, staffMember])
    setNewStaff({
      name: "",
      role: "cashier",
      email: "",
      phone: "",
      shift: "",
      address: "",
      emergencyContact: "",
      salary: 0,
      isActive: true,
      permissions: [],
    })
    setShowAddStaff(false)
  }

  const handleEditStaff = (staffMember: Staff) => {
    setEditingStaff(staffMember)
    setNewStaff(staffMember)
    setShowAddStaff(true)
  }

  const handleUpdateStaff = () => {
    if (editingStaff) {
      setStaff(staff.map((s) => (s.id === editingStaff.id ? ({ ...newStaff, id: editingStaff.id } as Staff) : s)))
      setEditingStaff(null)
      setNewStaff({
        name: "",
        role: "cashier",
        email: "",
        phone: "",
        shift: "",
        address: "",
        emergencyContact: "",
        salary: 0,
        isActive: true,
        permissions: [],
      })
      setShowAddStaff(false)
    }
  }

  const handleDeleteStaff = (staffId: string) => {
    setStaff(staff.filter((s) => s.id !== staffId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Staf</h1>
        <Dialog open={showAddStaff} onOpenChange={setShowAddStaff}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Staf Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/90 backdrop-blur-md border border-white/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingStaff ? "Edit Staf" : "Tambah Staf Baru"}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[600px]">
              <div className="space-y-4 pr-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="staffName">Nama Lengkap</Label>
                    <Input
                      id="staffName"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staffRole">Posisi</Label>
                    <Select
                      value={newStaff.role}
                      onValueChange={(value: any) => setNewStaff({ ...newStaff, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="cashier">Kasir</SelectItem>
                        <SelectItem value="chef">Chef</SelectItem>
                        <SelectItem value="waiter">Pelayan</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="staffEmail">Email</Label>
                    <Input
                      id="staffEmail"
                      type="email"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staffPhone">Nomor Telepon</Label>
                    <Input
                      id="staffPhone"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      placeholder="081234567890"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="staffAddress">Alamat</Label>
                  <Input
                    id="staffAddress"
                    value={newStaff.address}
                    onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}
                    placeholder="Alamat lengkap"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="staffShift">Shift</Label>
                    <Select
                      value={newStaff.shift}
                      onValueChange={(value) => setNewStaff({ ...newStaff, shift: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih shift" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pagi">Pagi (06:00-14:00)</SelectItem>
                        <SelectItem value="Siang">Siang (10:00-18:00)</SelectItem>
                        <SelectItem value="Sore">Sore (14:00-22:00)</SelectItem>
                        <SelectItem value="Malam">Malam (18:00-02:00)</SelectItem>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Weekend">Weekend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="staffSalary">Gaji (Rp)</Label>
                    <Input
                      id="staffSalary"
                      type="number"
                      value={newStaff.salary}
                      onChange={(e) => setNewStaff({ ...newStaff, salary: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Kontak Darurat</Label>
                  <Input
                    id="emergencyContact"
                    value={newStaff.emergencyContact}
                    onChange={(e) => setNewStaff({ ...newStaff, emergencyContact: e.target.value })}
                    placeholder="081234567890 (Hubungan)"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="staffActive"
                    checked={newStaff.isActive}
                    onCheckedChange={(checked) => setNewStaff({ ...newStaff, isActive: checked })}
                  />
                  <Label htmlFor="staffActive">Status Aktif</Label>
                </div>

                <Button
                  onClick={editingStaff ? handleUpdateStaff : handleAddStaff}
                  className="w-full"
                  disabled={!newStaff.name || !newStaff.email || !newStaff.phone}
                >
                  {editingStaff ? "Update Staf" : "Tambah Staf"}
                </Button>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="staff" className="space-y-4">
        <TabsList className="bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="staff">Daftar Staf</TabsTrigger>
          <TabsTrigger value="schedule">Jadwal</TabsTrigger>
          <TabsTrigger value="performance">Performa</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Staf</p>
                    <p className="text-2xl font-bold">{staff.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Staf Aktif</p>
                    <p className="text-2xl font-bold text-green-600">{staff.filter((s) => s.isActive).length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Rata-rata Rating</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {(staff.reduce((sum, s) => sum + s.performance.customerRating, 0) / staff.length).toFixed(1)}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Gaji</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      Rp {staff.reduce((sum, s) => sum + s.salary, 0).toLocaleString()}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-emerald-500" />
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
                    placeholder="Cari staf..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-48 bg-white/20 backdrop-blur-sm border-white/30">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Posisi</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="cashier">Kasir</SelectItem>
                    <SelectItem value="chef">Chef</SelectItem>
                    <SelectItem value="waiter">Pelayan</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48 bg-white/20 backdrop-blur-sm border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <Card
                key={member.id}
                className="bg-white/20 backdrop-blur-md border border-white/30 hover:shadow-lg transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{member.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleColor(member.role)} variant="secondary">
                          {member.role}
                        </Badge>
                        <Badge variant={member.isActive ? "default" : "secondary"}>
                          {member.isActive ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>{member.shift}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span>Bergabung: {new Date(member.joinDate).toLocaleDateString("id-ID")}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Rating Pelanggan</span>
                        <span className="font-semibold">{member.performance.customerRating}/5</span>
                      </div>
                      <Progress value={(member.performance.customerRating / 5) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Efisiensi</span>
                        <span className="font-semibold">{member.performance.efficiency}%</span>
                      </div>
                      <Progress value={member.performance.efficiency} className="h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div>
                      <span className="text-slate-600">Pesanan Ditangani:</span>
                      <p className="font-semibold">{member.performance.ordersHandled}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Gaji:</span>
                      <p className="font-semibold text-emerald-600">Rp {member.salary.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditStaff(member)} className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteStaff(member.id)}
                      className="w-8 h-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="bg-white/20 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle>Jadwal Kerja Mingguan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Nama</th>
                      <th className="text-center p-2">Senin</th>
                      <th className="text-center p-2">Selasa</th>
                      <th className="text-center p-2">Rabu</th>
                      <th className="text-center p-2">Kamis</th>
                      <th className="text-center p-2">Jumat</th>
                      <th className="text-center p-2">Sabtu</th>
                      <th className="text-center p-2">Minggu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((member) => (
                      <tr key={member.id} className="border-b">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-slate-600">{member.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center p-2 text-sm">{member.schedule.monday}</td>
                        <td className="text-center p-2 text-sm">{member.schedule.tuesday}</td>
                        <td className="text-center p-2 text-sm">{member.schedule.wednesday}</td>
                        <td className="text-center p-2 text-sm">{member.schedule.thursday}</td>
                        <td className="text-center p-2 text-sm">{member.schedule.friday}</td>
                        <td className="text-center p-2 text-sm">{member.schedule.saturday}</td>
                        <td className="text-center p-2 text-sm">{member.schedule.sunday}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staff.map((member) => (
              <Card key={member.id} className="bg-white/20 backdrop-blur-md border border-white/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <Badge className={getRoleColor(member.role)} variant="secondary">
                        {member.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Rating Pelanggan</span>
                        <span className="font-semibold">{member.performance.customerRating}/5</span>
                      </div>
                      <Progress value={(member.performance.customerRating / 5) * 100} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Ketepatan Waktu</span>
                        <span className="font-semibold">{member.performance.punctuality}%</span>
                      </div>
                      <Progress value={member.performance.punctuality} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Efisiensi Kerja</span>
                        <span className="font-semibold">{member.performance.efficiency}%</span>
                      </div>
                      <Progress value={member.performance.efficiency} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div>
                        <p className="text-sm text-slate-600">Pesanan Ditangani</p>
                        <p className="text-lg font-bold">{member.performance.ordersHandled}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Performa Keseluruhan</p>
                        <p className="text-lg font-bold text-emerald-600">
                          {Math.round(
                            (member.performance.customerRating * 20 +
                              member.performance.punctuality +
                              member.performance.efficiency) /
                              3,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
