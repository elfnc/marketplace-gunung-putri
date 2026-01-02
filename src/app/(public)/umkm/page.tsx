import { Suspense } from "react"
import { Metadata } from "next"
import { PaginationControl } from "@/components/ui/pagination-control"
import { Store } from "lucide-react"
import { getUmkmBySlug } from "@/features/umkm/server/getUmkmDetail"
import { getUmkms } from "@/features/umkm/server/getUmkm"
import { ProductSearch } from "@/features/products/components/ProductSearch"
import { UmkmCard } from "@/features/umkm/components/UmkmCard"
import { PublicPageContainer } from "@/components/layout/PublicPageContainer"
import { Motion } from "@/components/shared/Motion"
import { staggerContainer, scaleIn } from "@/lib/animations"

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
    <PublicPageContainer
      title="Warga Berniaga"
      description={`Menampilkan ${metadata.totalCount} usaha lokal yang siap melayani kebutuhanmu.`}
      headerAction={
        <Suspense fallback={null}>
          <ProductSearch />
        </Suspense>
      }
    >

      {/* GRID UMKM */}
      {umkms.length > 0 ? (
        <>
          <Motion
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {umkms.map((umkm) => (
              <Motion key={umkm.id} variants={scaleIn} as="div">
                <UmkmCard
                  name={umkm.name}
                  slug={umkm.slug}
                  category={umkm.category.name}
                  address={umkm.address}
                  productCount={umkm._count.products}
                  coverImage={umkm.products[0]?.imageUrl}
                  operationalHours={umkm.operationalHours}
                />
              </Motion>
            ))}
          </Motion>

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

    </PublicPageContainer>
  )
}