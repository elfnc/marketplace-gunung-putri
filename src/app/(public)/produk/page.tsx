import { Metadata } from "next"
import Link from "next/link"
import { PaginationControl } from "@/components/ui/pagination-control"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" // 👈 Import Badge buat Chip
import { SearchX, X } from "lucide-react"
import { getCategories, getProducts } from "@/features/products/server/getProduct"
import { ProductSearch } from "@/features/products/components/ProductSearch"
import { FilterSidebar } from "@/features/products/components/FilterSidebar"
import { ProductCard } from "@/features/products/components/ProductCard"
import { Suspense } from "react"
import { PublicPageContainer } from "@/components/layout/PublicPageContainer"
import { Motion } from "@/components/shared/Motion"
import { staggerContainer, fadeInUp } from "@/lib/animations"


export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}): Promise<Metadata> {
  const params = await searchParams
  const categoryName = params.category
    ? params.category.charAt(0).toUpperCase() + params.category.slice(1)
    : "Terlengkap"

  return {
    title: `Jual Produk ${categoryName} - DekatRumah Gunung Putri`,
    description: "Cari produk lokal UMKM Gunung Putri. Makanan, Jasa, dan Kerajinan.",
  }
}

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>
}) {
  const params = await searchParams

  const currentPage = Number(params.page) || 1
  const currentCategory = params.category
  const searchQuery = params.search

  // Fetch Data
  const [categories, { products, metadata }] = await Promise.all([
    getCategories(),
    getProducts({
      page: currentPage,
      category: currentCategory,
      search: searchQuery
    })
  ])

  return (
    <PublicPageContainer
      title="Katalog Warga"
      description={
        <>
          <p>Temukan {metadata.totalCount} produk lokal terbaik dari tetangga sekitarmu.</p>
          {/* Active Filter Chips */}
          {currentCategory && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Kategori:</span>
              <Badge variant="secondary" className="px-3 py-1 rounded-full bg-[#1F3D2B]/10 text-[#1F3D2B] hover:bg-[#1F3D2B]/20 gap-2">
                {categories.find(c => c.slug === currentCategory)?.name || currentCategory}
                <Link href="/produk" className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </Link>
              </Badge>
            </div>
          )}
        </>
      }
      headerAction={
        <Suspense fallback={null}>
          <ProductSearch />
        </Suspense>
      }
    >

      <div className="flex flex-col md:flex-row gap-8">

        {/* SIDEBAR FILTER */}
        <aside className="w-full md:w-64 shrink-0">
          {/* Sticky hanya di desktop */}
          <div className="sticky top-24 space-y-6">
            <div className="hidden md:block">
              <h3 className="font-semibold mb-4 text-foreground">Kategori</h3>
              <FilterSidebar categories={categories} />
            </div>

            {/* Mobile Category Dropdown/Scroll bisa ditaruh disini kalau mau, 
                       tapi Sidebar yang sekarang (List) akan numpuk di mobile.
                       Untuk MVP, biarkan list di atas content di mobile. 
                   */}
            <div className="md:hidden">
              <FilterSidebar categories={categories} />
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {products.length > 0 ? (
            <>
              <Motion
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {products.map((product) => (
                  <Motion key={product.id} variants={fadeInUp} as="div">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      slug={product.slug}
                      price={Number(product.price)}
                      imageUrl={product.imageUrl}
                      umkmName={product.umkm.name}
                      category={product.umkm.category.name}
                      description={product.description}
                      umkmAddress={product.umkm.address}
                      umkmId={product.umkmId}
                      umkmPhone={product.umkm.phone}
                    />
                  </Motion>
                ))}
              </Motion>

              <div className="mt-12 border-t pt-8">
                <PaginationControl
                  currentPage={currentPage}
                  totalPages={metadata.totalPages}
                  hasNextPage={metadata.hasNextPage}
                />
              </div>
            </>
          ) : (
            // EMPTY STATE
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-border/60">
              <div className="bg-secondary/50 p-6 rounded-full mb-4 ring-8 ring-secondary/20">
                <SearchX className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Belum ketemu nih...
              </h3>
              <p className="text-muted-foreground max-w-100 mx-auto mt-2 mb-8 leading-relaxed">
                Produk
                {searchQuery && <span className="font-medium text-foreground"> "{searchQuery}"</span>}
                {currentCategory && <span> di kategori <span className="font-medium text-foreground">{currentCategory}</span></span>}
                {" "}belum tersedia saat ini.
              </p>

              <Button asChild variant="outline" className="rounded-full px-8 h-12 border-primary/20 hover:border-primary/50 text-primary">
                <Link href="/produk">
                  Lihat Semua Produk
                </Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </PublicPageContainer>
  )
}