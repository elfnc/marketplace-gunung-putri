import { Suspense } from "react"
import { Metadata } from "next"
import { PaginationControl } from "@/components/ui/pagination-control"
import { Store } from "lucide-react"
import { getUmkmBySlug } from "@/features/umkm/server/getUmkmDetail"
import { getUmkms } from "@/features/umkm/server/getUmkm"
import { ProductSearch } from "@/features/products/components/ProductSearch"
import { UmkmCard } from "@/features/umkm/components/UmkmCard"

export const metadata: Metadata = {
  title: "Daftar UMKM - Marketplace Gunung Putri",
  description: "Cari dan dukung usaha lokal tetangga di Gunung Putri.",
}

export default async function UmkmListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const searchQuery = params.search

  // Fetch Data
  const { umkms, metadata } = await getUmkms({ 
    page: currentPage, 
    search: searchQuery 
  })

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 min-h-screen bg-[#F4F1EC]/30">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-border/60">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#1C1C1C]">Warga Berniaga</h1>
          <p className="text-muted-foreground text-base max-w-xl">
             Menampilkan {metadata.totalCount} usaha lokal yang siap melayani kebutuhanmu.
          </p>
        </div>
        
        {/* Reuse Search Component (karena logic URL params-nya sama: ?search=...) */}
        <Suspense fallback={null}>
            <ProductSearch />
        </Suspense>
      </div>

      {/* GRID UMKM */}
      {umkms.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {umkms.map((umkm) => (
              <UmkmCard
                key={umkm.id}
                name={umkm.name}
                slug={umkm.slug}
                category={umkm.category.name}
                address={umkm.address}
                productCount={umkm._count.products}
                // Pakai gambar produk pertama sebagai cover/avatar kalau ada
                coverImage={umkm.products[0]?.imageUrl}
              />
            ))}
          </div>

          <PaginationControl 
            currentPage={currentPage}
            totalPages={metadata.totalPages}
            hasNextPage={metadata.hasNextPage}
          />
        </>
      ) : (
        // EMPTY STATE
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-border/60">
           <div className="bg-secondary/50 p-6 rounded-full mb-4 ring-8 ring-secondary/20">
              <Store className="h-10 w-10 text-muted-foreground" />
           </div>
           <h3 className="text-xl font-bold tracking-tight text-foreground">
             UMKM tidak ditemukan
           </h3>
           <p className="text-muted-foreground max-w-[400px] mx-auto mt-2">
             Coba cari dengan kata kunci nama warung atau lokasi (misal: "Bojong").
           </p>
        </div>
      )}

    </div>
  )
}