// Comprehensive dummy data for Inara Cafe Dashboard

export interface SalesData {
  month: string
  revenue: number
  transactions: number
  target: number
  profit: number
  costs: number
}

export interface HourlyData {
  hour: string
  customers: number
  efficiency: number
  revenue: number
  avgOrderValue: number
}

export interface MenuData {
  name: string
  sales: number
  revenue: number
  profit: number
  fill: string
  category: string
  popularity: number
}

export interface CustomerData {
  segment: string
  count: number
  revenue: number
  satisfaction: number
  retention: number
  fill: string
}

export interface StaffData {
  name: string
  shift: string
  performance: number
  sales: number
  customerRating: number
  efficiency: number
}

export interface InventoryData {
  item: string
  stock: number
  minStock: number
  cost: number
  supplier: string
  lastOrder: string
}

export interface CompetitorData {
  competitor: string
  marketShare: number
  avgPrice: number
  rating: number
  distance: string
}

// Sales data for multiple years
export const salesData: Record<string, SalesData[]> = {
  2022: [
    { month: "Jan", revenue: 165, transactions: 82, target: 180, profit: 45, costs: 120 },
    { month: "Feb", revenue: 152, transactions: 78, target: 180, profit: 38, costs: 114 },
    { month: "Mar", revenue: 168, transactions: 85, target: 180, profit: 48, costs: 120 },
    { month: "Apr", revenue: 195, transactions: 95, target: 200, profit: 58, costs: 137 },
    { month: "Mei", revenue: 178, transactions: 88, target: 200, profit: 52, costs: 126 },
    { month: "Jun", revenue: 172, transactions: 86, target: 200, profit: 48, costs: 124 },
    { month: "Jul", revenue: 184, transactions: 92, target: 200, profit: 55, costs: 129 },
    { month: "Agu", revenue: 189, transactions: 94, target: 200, profit: 58, costs: 131 },
    { month: "Sep", revenue: 176, transactions: 89, target: 200, profit: 51, costs: 125 },
    { month: "Okt", revenue: 185, transactions: 93, target: 220, profit: 56, costs: 129 },
    { month: "Nov", revenue: 198, transactions: 98, target: 220, profit: 62, costs: 136 },
    { month: "Des", revenue: 220, transactions: 108, target: 240, profit: 72, costs: 148 },
  ],
  2023: [
    { month: "Jan", revenue: 192, transactions: 96, target: 200, profit: 58, costs: 134 },
    { month: "Feb", revenue: 178, transactions: 89, target: 200, profit: 52, costs: 126 },
    { month: "Mar", revenue: 205, transactions: 102, target: 220, profit: 65, costs: 140 },
    { month: "Apr", revenue: 225, transactions: 112, target: 240, profit: 74, costs: 151 },
    { month: "Mei", revenue: 198, transactions: 99, target: 220, profit: 61, costs: 137 },
    { month: "Jun", revenue: 210, transactions: 105, target: 230, profit: 68, costs: 142 },
    { month: "Jul", revenue: 218, transactions: 109, target: 240, profit: 72, costs: 146 },
    { month: "Agu", revenue: 225, transactions: 112, target: 240, profit: 75, costs: 150 },
    { month: "Sep", revenue: 208, transactions: 104, target: 230, profit: 67, costs: 141 },
    { month: "Okt", revenue: 228, transactions: 114, target: 250, profit: 78, costs: 150 },
    { month: "Nov", revenue: 245, transactions: 122, target: 260, profit: 86, costs: 159 },
    { month: "Des", revenue: 268, transactions: 134, target: 280, profit: 98, costs: 170 },
  ],
  2024: [
    { month: "Jan", revenue: 225, transactions: 118, target: 240, profit: 78, costs: 147 },
    { month: "Feb", revenue: 208, transactions: 110, target: 230, profit: 69, costs: 139 },
    { month: "Mar", revenue: 242, transactions: 128, target: 250, profit: 85, costs: 157 },
    { month: "Apr", revenue: 268, transactions: 142, target: 270, profit: 98, costs: 170 },
    { month: "Mei", revenue: 235, transactions: 125, target: 250, profit: 82, costs: 153 },
    { month: "Jun", revenue: 248, transactions: 132, target: 260, profit: 89, costs: 159 },
    { month: "Jul", revenue: 258, transactions: 138, target: 270, profit: 94, costs: 164 },
    { month: "Agu", revenue: 275, transactions: 145, target: 280, profit: 102, costs: 173 },
    { month: "Sep", revenue: 262, transactions: 140, target: 270, profit: 96, costs: 166 },
    { month: "Okt", revenue: 285, transactions: 152, target: 290, profit: 108, costs: 177 },
    { month: "Nov", revenue: 298, transactions: 158, target: 300, profit: 116, costs: 182 },
    { month: "Des", revenue: 320, transactions: 168, target: 320, profit: 128, costs: 192 },
  ],
}

// Hourly customer pattern data
export const hourlyData: HourlyData[] = [
  { hour: "06:00", customers: 12, efficiency: 65, revenue: 18, avgOrderValue: 15 },
  { hour: "07:00", customers: 45, efficiency: 85, revenue: 72, avgOrderValue: 16 },
  { hour: "08:00", customers: 68, efficiency: 92, revenue: 125, avgOrderValue: 18 },
  { hour: "09:00", customers: 38, efficiency: 78, revenue: 68, avgOrderValue: 18 },
  { hour: "10:00", customers: 25, efficiency: 70, revenue: 42, avgOrderValue: 17 },
  { hour: "11:00", customers: 32, efficiency: 75, revenue: 58, avgOrderValue: 18 },
  { hour: "12:00", customers: 58, efficiency: 88, revenue: 112, avgOrderValue: 19 },
  { hour: "13:00", customers: 42, efficiency: 82, revenue: 78, avgOrderValue: 19 },
  { hour: "14:00", customers: 28, efficiency: 72, revenue: 48, avgOrderValue: 17 },
  { hour: "15:00", customers: 52, efficiency: 86, revenue: 95, avgOrderValue: 18 },
  { hour: "16:00", customers: 65, efficiency: 90, revenue: 128, avgOrderValue: 20 },
  { hour: "17:00", customers: 48, efficiency: 84, revenue: 89, avgOrderValue: 19 },
  { hour: "18:00", customers: 35, efficiency: 76, revenue: 62, avgOrderValue: 18 },
  { hour: "19:00", customers: 22, efficiency: 68, revenue: 38, avgOrderValue: 17 },
  { hour: "20:00", customers: 15, efficiency: 60, revenue: 24, avgOrderValue: 16 },
]

// Menu performance data
export const menuData: MenuData[] = [
  {
    name: "Kopi Susu Gula Aren",
    sales: 28,
    revenue: 420,
    profit: 168,
    fill: "#7c3aed",
    category: "Minuman",
    popularity: 95,
  },
  {
    name: "Nasi Goreng",
    sales: 22,
    revenue: 385,
    profit: 135,
    fill: "#059669",
    category: "Makanan",
    popularity: 88,
  },
  {
    name: "Es Kopi Susu",
    sales: 18,
    revenue: 270,
    profit: 108,
    fill: "#8b5cf6",
    category: "Minuman",
    popularity: 82,
  },
  {
    name: "Ayam Geprek",
    sales: 12,
    revenue: 240,
    profit: 84,
    fill: "#10b981",
    category: "Makanan",
    popularity: 75,
  },
  {
    name: "Pisang Goreng",
    sales: 8,
    revenue: 96,
    profit: 38,
    fill: "#f59e0b",
    category: "Snack",
    popularity: 68,
  },
  {
    name: "Teh Tarik",
    sales: 7,
    revenue: 84,
    profit: 34,
    fill: "#ef4444",
    category: "Minuman",
    popularity: 65,
  },
  {
    name: "Lainnya",
    sales: 5,
    revenue: 75,
    profit: 23,
    fill: "#6b7280",
    category: "Mixed",
    popularity: 45,
  },
]

// Customer segmentation data
export const customerData: CustomerData[] = [
  {
    segment: "Pelanggan Setia",
    count: 245,
    revenue: 1250,
    satisfaction: 4.8,
    retention: 92,
    fill: "#059669",
  },
  {
    segment: "Pelanggan Reguler",
    count: 180,
    revenue: 720,
    satisfaction: 4.5,
    retention: 78,
    fill: "#7c3aed",
  },
  {
    segment: "Pelanggan Baru",
    count: 320,
    revenue: 480,
    satisfaction: 4.2,
    retention: 45,
    fill: "#8b5cf6",
  },
  {
    segment: "Pelanggan Sesekali",
    count: 150,
    revenue: 225,
    satisfaction: 4.0,
    retention: 25,
    fill: "#10b981",
  },
]

// Staff performance data
export const staffData: StaffData[] = [
  {
    name: "Sari Dewi",
    shift: "Pagi",
    performance: 95,
    sales: 1250,
    customerRating: 4.9,
    efficiency: 92,
  },
  {
    name: "Budi Santoso",
    shift: "Siang",
    performance: 88,
    sales: 1180,
    customerRating: 4.7,
    efficiency: 85,
  },
  {
    name: "Maya Putri",
    shift: "Sore",
    performance: 92,
    sales: 1320,
    customerRating: 4.8,
    efficiency: 90,
  },
  {
    name: "Andi Wijaya",
    shift: "Malam",
    performance: 78,
    sales: 890,
    customerRating: 4.4,
    efficiency: 75,
  },
  {
    name: "Rina Sari",
    shift: "Weekend",
    performance: 85,
    sales: 1050,
    customerRating: 4.6,
    efficiency: 82,
  },
]

// Inventory data
export const inventoryData: InventoryData[] = [
  {
    item: "Biji Kopi Arabika",
    stock: 25,
    minStock: 10,
    cost: 150000,
    supplier: "Kopi Nusantara",
    lastOrder: "2024-01-15",
  },
  {
    item: "Susu Segar",
    stock: 8,
    minStock: 15,
    cost: 45000,
    supplier: "Dairy Fresh",
    lastOrder: "2024-01-20",
  },
  {
    item: "Gula Aren",
    stock: 12,
    minStock: 8,
    cost: 35000,
    supplier: "Gula Tradisional",
    lastOrder: "2024-01-18",
  },
  {
    item: "Beras Premium",
    stock: 45,
    minStock: 20,
    cost: 85000,
    supplier: "Beras Berkah",
    lastOrder: "2024-01-10",
  },
  {
    item: "Ayam Segar",
    stock: 5,
    minStock: 10,
    cost: 120000,
    supplier: "Fresh Chicken",
    lastOrder: "2024-01-22",
  },
]

// Competitor analysis data
export const competitorData: CompetitorData[] = [
  {
    competitor: "Warung Kopi Tetangga",
    marketShare: 15,
    avgPrice: 12000,
    rating: 4.2,
    distance: "200m",
  },
  {
    competitor: "Cafe Modern",
    marketShare: 22,
    avgPrice: 25000,
    rating: 4.5,
    distance: "500m",
  },
  {
    competitor: "Kedai Nasi Pak Budi",
    marketShare: 18,
    avgPrice: 15000,
    rating: 4.1,
    distance: "300m",
  },
  {
    competitor: "Coffee Shop Chain",
    marketShare: 25,
    avgPrice: 35000,
    rating: 4.3,
    distance: "1km",
  },
]

// KPI data for different years
export const kpiData = {
  2024: {
    totalRevenue: 3100,
    avgOrderValue: 32,
    dailyTransactions: 145,
    customerSatisfaction: 4.7,
    profitMargin: 28,
    repeatCustomer: 68,
    newCustomers: 320,
    staffEfficiency: 87,
    inventoryTurnover: 12,
    avgWaitTime: 4.2,
  },
  2023: {
    totalRevenue: 2600,
    avgOrderValue: 28,
    dailyTransactions: 118,
    customerSatisfaction: 4.5,
    profitMargin: 24,
    repeatCustomer: 58,
    newCustomers: 280,
    staffEfficiency: 82,
    inventoryTurnover: 10,
    avgWaitTime: 5.1,
  },
  2022: {
    totalRevenue: 2200,
    avgOrderValue: 24,
    dailyTransactions: 95,
    customerSatisfaction: 4.3,
    profitMargin: 20,
    repeatCustomer: 48,
    newCustomers: 240,
    staffEfficiency: 78,
    inventoryTurnover: 8,
    avgWaitTime: 6.2,
  },
}

// Performance metrics
export const performanceMetrics = [
  { label: "Target Pendapatan", value: 89, color: "bg-emerald-500", trend: "+5%" },
  { label: "Kepuasan Pelanggan", value: 94, color: "bg-purple-500", trend: "+8%" },
  { label: "Efisiensi Operasional", value: 82, color: "bg-blue-500", trend: "+12%" },
  { label: "Performa Staf", value: 87, color: "bg-orange-500", trend: "+3%" },
  { label: "Kualitas Makanan", value: 91, color: "bg-green-500", trend: "+6%" },
  { label: "Kecepatan Layanan", value: 85, color: "bg-indigo-500", trend: "+15%" },
]

// Weekly sales comparison
export const weeklyData = [
  { day: "Senin", thisWeek: 180, lastWeek: 165, target: 200 },
  { day: "Selasa", thisWeek: 195, lastWeek: 178, target: 200 },
  { day: "Rabu", thisWeek: 220, lastWeek: 205, target: 220 },
  { day: "Kamis", thisWeek: 235, lastWeek: 218, target: 240 },
  { day: "Jumat", thisWeek: 285, lastWeek: 268, target: 280 },
  { day: "Sabtu", thisWeek: 320, lastWeek: 295, target: 320 },
  { day: "Minggu", thisWeek: 298, lastWeek: 275, target: 300 },
]

// Customer satisfaction trends
export const satisfactionData = [
  { month: "Jan", rating: 4.2, reviews: 45, complaints: 3 },
  { month: "Feb", rating: 4.3, reviews: 52, complaints: 2 },
  { month: "Mar", rating: 4.4, reviews: 68, complaints: 4 },
  { month: "Apr", rating: 4.5, reviews: 75, complaints: 2 },
  { month: "Mei", rating: 4.6, reviews: 82, complaints: 1 },
  { month: "Jun", rating: 4.7, reviews: 89, complaints: 2 },
  { month: "Jul", rating: 4.7, reviews: 95, complaints: 1 },
]

// Financial breakdown
export const financialData = {
  revenue: {
    food: 1850,
    beverages: 1250,
    snacks: 320,
    others: 180,
  },
  expenses: {
    ingredients: 1200,
    staff: 800,
    rent: 500,
    utilities: 200,
    marketing: 150,
    others: 250,
  },
  profit: {
    gross: 1500,
    net: 1100,
    margin: 28.5,
  },
}

// Peak hours analysis
export const peakHoursData = [
  { period: "Sarapan (07-09)", customers: 156, revenue: 312, efficiency: 88 },
  { period: "Makan Siang (12-14)", customers: 128, revenue: 285, efficiency: 85 },
  { period: "Sore (15-17)", customers: 145, revenue: 298, efficiency: 90 },
  { period: "Malam (18-20)", customers: 89, revenue: 178, efficiency: 75 },
]

// Marketing campaign performance
export const campaignData = [
  { campaign: "Promo Hari Senin", reach: 1250, engagement: 8.5, conversion: 12, roi: 185 },
  { campaign: "Menu Baru", reach: 2100, engagement: 12.3, conversion: 18, roi: 220 },
  { campaign: "Loyalty Program", reach: 850, engagement: 15.8, conversion: 25, roi: 340 },
  { campaign: "Social Media", reach: 3200, engagement: 6.2, conversion: 8, roi: 145 },
]

// Seasonal trends
export const seasonalData = [
  { season: "Musim Hujan", avgSales: 185, popularItems: ["Kopi Hangat", "Gorengan"], customerCount: 120 },
  { season: "Musim Kemarau", avgSales: 220, popularItems: ["Es Kopi", "Jus Buah"], customerCount: 145 },
  { season: "Hari Raya", avgSales: 350, popularItems: ["Paket Keluarga", "Kue Tradisional"], customerCount: 200 },
  { season: "Liburan Sekolah", avgSales: 280, popularItems: ["Snack", "Minuman Dingin"], customerCount: 165 },
]
