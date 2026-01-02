import { Card } from "@/components/ui/card"
import { Store, Package, Users, Plus, ArrowRight, TrendingUp, ChevronRight, Activity } from "lucide-react"
import { PageContainer } from "@/components/layout/PageContainer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { getDashboardAnalytics } from "@/features/dashboard/server/getAnalytics"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const data = await getDashboardAnalytics()

  return (
    <PageContainer
      title="Dashboard Overview"
      description="Pantau kinerja marketplace dan aktivitas warga."
    >
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* 1. WELCOME BANNER (With Texture & Depth) */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1F3D2B] text-white shadow-xl ring-1 ring-black/5">
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Gradient Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10 p-8 md:p-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-emerald-200 bg-white/5 w-fit px-3 py-1 rounded-full text-xs font-medium border border-white/10 backdrop-blur-sm">
              <Activity className="h-3 w-3" />
              <span>Live Update</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
              Halo, Admin! 👋
            </h2>
            <p className="text-emerald-100/90 text-lg mb-8 leading-relaxed max-w-xl">
              Bulan ini sangat produktif. Ada <span className="font-bold text-white bg-white/10 px-1 rounded">{data.products.newThisMonth} produk baru</span> yang siap dipasarkan dan <span className="font-bold text-white bg-white/10 px-1 rounded">{data.events.upcoming} event</span> menarik menanti warga.
            </p>

            <Button asChild size="lg" className="bg-white text-[#1F3D2B] hover:bg-gray-50 font-semibold border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              <Link href="/admin/products">
                Kelola Produk Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 2. STATS GRID (With Gradient & Glassy Icons) */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* CARD 1: UMKM (Blue Accent) */}
          <Card className="group relative overflow-hidden border border-gray-100 bg-gradient-to-br from-white to-blue-50/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total UMKM</p>
                  <h3 className="text-4xl font-extrabold text-[#1C1C1C]">{data.umkm.total}</h3>
                </div>
                <div className="p-3 bg-blue-100/50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Store className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 flex items-center p-3 bg-white/60 rounded-lg border border-gray-100 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-gray-900">{data.umkm.active}</span> Toko Aktif
                </p>
              </div>
            </div>
          </Card>

          {/* CARD 2: PRODUCTS (Emerald Accent) */}
          <Card className="group relative overflow-hidden border border-gray-100 bg-gradient-to-br from-white to-emerald-50/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Produk</p>
                  <h3 className="text-4xl font-extrabold text-[#1C1C1C]">{data.products.total}</h3>
                </div>
                <div className="p-3 bg-emerald-100/50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Package className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 flex items-center p-3 bg-white/60 rounded-lg border border-gray-100 backdrop-blur-sm">
                <Plus className="h-4 w-4 mr-2 text-emerald-500" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-gray-900">+{data.products.newThisMonth}</span> baru bulan ini
                </p>
              </div>
            </div>
          </Card>

          {/* CARD 3: EVENTS (Orange Accent) */}
          <Card className="group relative overflow-hidden border border-gray-100 bg-gradient-to-br from-white to-orange-50/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Kabar & Event</p>
                  <h3 className="text-4xl font-extrabold text-[#1C1C1C]">{data.events.total}</h3>
                </div>
                <div className="p-3 bg-orange-100/50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Users className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 flex items-center p-3 bg-white/60 rounded-lg border border-gray-100 backdrop-blur-sm">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[8px] overflow-hidden">
                      <div className="w-full h-full bg-gray-300 animate-pulse" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-gray-900">{data.events.upcoming}</span> akan datang
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* 3. QUICK ACTIONS (Modern Tiles) */}
        <div>
          <h3 className="text-lg font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#1F3D2B] rounded-full block"></span>
            Aksi Cepat
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Action 1 */}
            <Link href="/admin/umkm/create" className="group">
              <div className="flex items-center p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 h-full relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg mr-4 relative z-10 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Store className="h-6 w-6" />
                </div>
                <div className="flex-1 relative z-10">
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">Tambah UMKM Baru</h4>
                  <p className="text-sm text-muted-foreground mt-1">Daftarkan usaha warga baru ke database.</p>
                </div>
                <div className="text-gray-300 group-hover:text-emerald-500 transition-colors relative z-10">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Action 2 */}
            <Link href="/admin/events/create" className="group">
              <div className="flex items-center p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 h-full relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                <div className="p-3 bg-blue-100 text-blue-700 rounded-lg mr-4 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1 relative z-10">
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Posting Kabar / Event</h4>
                  <p className="text-sm text-muted-foreground mt-1">Buat pengumuman atau kegiatan baru.</p>
                </div>
                <div className="text-gray-300 group-hover:text-blue-500 transition-colors relative z-10">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </PageContainer>
  )
}