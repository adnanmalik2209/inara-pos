"use client"

import { useState } from "react"
import { POSLayout } from "@/components/pos-layout"
import { POSSystem } from "@/components/pos-system"
import { OrderManagement } from "@/components/order-management"
import { staffData } from "@/lib/pos-data"

export default function HomePage() {
  const [currentView, setCurrentView] = useState("pos")
  const [currentUser] = useState(staffData[0]) // Default to manager

  const renderContent = () => {
    switch (currentView) {
      case "pos":
        return <POSSystem />
      case "orders":
        return <OrderManagement />
      case "products":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Manajemen Menu</h2>
            <p className="text-slate-600">Fitur manajemen menu akan segera hadir</p>
          </div>
        )
      case "inventory":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Manajemen Inventori</h2>
            <p className="text-slate-600">Fitur manajemen inventori akan segera hadir</p>
          </div>
        )
      case "staff":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Manajemen Staf</h2>
            <p className="text-slate-600">Fitur manajemen staf akan segera hadir</p>
          </div>
        )
      case "analytics":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Analitik Penjualan</h2>
            <p className="text-slate-600">Fitur analitik akan segera hadir</p>
          </div>
        )
      case "settings":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Pengaturan Sistem</h2>
            <p className="text-slate-600">Fitur pengaturan akan segera hadir</p>
          </div>
        )
      default:
        return <POSSystem />
    }
  }

  return (
    <POSLayout currentView={currentView} onViewChange={setCurrentView} currentUser={currentUser}>
      {renderContent()}
    </POSLayout>
  )
}
