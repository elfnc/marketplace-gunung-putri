import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Package, Search, Filter, Store, Tag } from "lucide-react"
import { PaginationControl } from "@/components/ui/pagination-control"
import { AdminProductForm } from "@/features/products/components/AdminProductForm"
import { AdminSearch } from "@/components/shared/search"
import { AdminProductFilter } from "@/features/products/components/AdminProductFilter"
import { StatusBadge } from "@/components/shared/status-badge"
import { EditProductButton } from "@/features/products/components/EditProductButton"
import { AlertDeleteBtn } from "@/components/shared/alert-delete-btn"
import { deleteProduct } from "@/features/products/actions/ProductActions"
import { PageContainer } from "@/components/layout/PageContainer"
import Image from "next/image"

const ITEMS_PER_PAGE = 10

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; umkmId?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const page = Number(params.page) || 1
  const umkmId = params.umkmId

  // 1. Build Where Clause
  const whereClause: any = {
    name: { contains: query, mode: "insensitive" },
  }

  if (umkmId) {
    whereClause.umkmId = umkmId
  }

  // 2. Fetch Data Paralel
  const [totalCount, products, umkms] = await prisma.$transaction([
    prisma.product.count({ where: whereClause }),
    prisma.product.findMany({
      where: whereClause,
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      include: { umkm: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.umkm.findMany({ select: { id: true, name: true } })
  ])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <PageContainer
      title="Kelola Produk"
      description={`Total ${totalCount} produk terdaftar di database.`}
      action={
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#1F3D2B] hover:bg-[#152b1e] text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5">
              <Plus className="mr-2 h-4 w-4" /> Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Produk Baru</DialogTitle>
            </DialogHeader>
            <AdminProductForm umkms={umkms} />
          </DialogContent>
        </Dialog>
      }
    >

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 w-full relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 z-10 pointer-events-none">
            {/* Icon placeholder handled by AdminSearch component actually, but keeping wrapper for layout */}
          </div>
          <AdminSearch placeholder="Cari nama produk..." />
        </div>

        <div className="w-full md:w-auto flex items-center gap-2">
          <div className="h-9 px-3 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md text-muted-foreground">
            <Filter className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          <div className="flex-1 md:flex-none">
            <AdminProductFilter umkms={umkms} />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-gray-100">
              <TableHead className="w-[80px] pl-6 py-4 font-semibold text-gray-600">Gambar</TableHead>
              <TableHead className="font-semibold text-gray-600">Info Produk</TableHead>
              <TableHead className="font-semibold text-gray-600">Asal UMKM</TableHead>
              <TableHead className="font-semibold text-gray-600">Harga</TableHead>
              <TableHead className="font-semibold text-gray-600">Status</TableHead>
              <TableHead className="text-right pr-6 font-semibold text-gray-600">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} className="hover:bg-gray-50/60 transition-colors border-gray-100 group">
                {/* Image Column */}
                <TableCell className="pl-6 py-4">
                  <div className="relative h-12 w-12 rounded-lg border border-gray-100 bg-gray-50 overflow-hidden shadow-sm">
                    {p.imageUrl ? (
                      // Menggunakan img tag biasa agar simple di dalam loop, atau Next Image jika domain sudah allow
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-300">
                        <Package className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Name Column */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-900 group-hover:text-[#1F3D2B] transition-colors">
                      {p.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono bg-gray-100 w-fit px-1.5 py-0.5 rounded-sm">
                      /{p.slug}
                    </span>
                  </div>
                </TableCell>

                {/* UMKM Column */}
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Store className="h-3.5 w-3.5 text-gray-400" />
                    {p.umkm.name}
                  </div>
                </TableCell>

                {/* Price Column */}
                <TableCell>
                  <span className="font-mono text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(p.price))}
                  </span>
                </TableCell>

                {/* Status Column */}
                <TableCell>
                  <StatusBadge isActive={p.isActive} />
                </TableCell>

                {/* Action Column */}
                <TableCell className="text-right pr-6 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <EditProductButton product={{ ...p, price: Number(p.price) }} umkms={umkms} />
                    <AlertDeleteBtn id={p.id} action={deleteProduct} label="Produk" />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {/* EMPTY STATE */}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                      <Package className="h-8 w-8 text-gray-300" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Produk tidak ditemukan</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Coba ubah kata kunci pencarian atau filter UMKM yang Anda pilih.
                    </p>
                    {(query || umkmId) && (
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/products">Reset Filter</a>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION CONTROL */}
      <div className="py-4 border-t border-transparent">
        <PaginationControl
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={page < totalPages}
        />
      </div>

    </PageContainer>
  )
}