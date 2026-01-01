import { Suspense } from "react"
import { ProductCardSkeleton } from "@/components/ui/skeleton-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Store } from "lucide-react"
import { getFeaturedProducts } from "@/features/products/server/getProduct"
import { ProductCard } from "@/features/products/components/ProductCard"
import { getFeaturedUmkms } from "@/features/umkm/server/getUmkm"
import { UmkmCard } from "@/features/umkm/components/UmkmCard"
import { EventBanner } from "@/features/home/components/EventBanner"
import { HeroSection } from "@/features/home/components/HeroSection"
import { CtaRegister } from "@/features/home/components/CtaJoin"
import { SupportSection } from "@/features/home/components/SupportSection"
import { SearchCategorySection } from "@/features/home/components/SearchCategory"
import { COPY } from "@/lib/copywritting"

// Dummy Event Data (Nanti bisa dari DB)
// Coba ubah isActive: false untuk ngetes auto-hide
const ACTIVE_EVENT = {
  title: "Pasar Kaget Minggu Ini!",
  description: "Diskon jajanan pasar di Lapangan Desa, Minggu 07.00 WIB.",
  link: "/event/pasar-kaget",
  isActive: true
}

// --- SUB COMPONENTS (Untuk Rapikan Code) ---

async function FeaturedProductList() {
  const products = await getFeaturedProducts()
  if (products.length === 0) return <div className="text-center py-10 text-muted-foreground">Belum ada produk.</div>

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.slug}
          price={Number(product.price)}
          imageUrl={product.imageUrl}
          umkmName={product.umkm.name}
          category={product.umkm.category.name}
          umkmId={product.umkmId}
          umkmPhone={product.umkm.phone}
          description={product.description}
          umkmAddress={product.umkm.address}
        />
      ))}
    </div>
  )
}

async function FeaturedUmkmList() {
  const umkms = await getFeaturedUmkms()
  if (umkms.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {umkms.map((umkm) => (
        <UmkmCard
          key={umkm.id}
          name={umkm.name}
          slug={umkm.slug}
          category={umkm.category.name}
          address={umkm.address}
          imageUrl={umkm.imageUrl}
          productCount={umkm._count.products}
        />
      ))}
    </div>
  )
}

// --- MAIN PAGE ---

export default async function HomePage() {
  // Fetch produk untuk Visual Hero
  // Kita ambil 6 produk pertama biar grid-nya penuh
  const productsForHero = await getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      {/* <EventBanner event={ACTIVE_EVENT} /> */}

      {/* 1. HERO SECTION (White Background) */}
      <HeroSection products={productsForHero} />

      {/* 2. SEARCH & CATEGORY (Sand Background) */}
      {/* CategoryRail lama dihapus, diganti section ini */}
      <SearchCategorySection />

      {/* 3. PRODUK UNGGULAN */}
      <section className="container mx-auto px-4 py-16 md:px-6 space-y-8">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1C]">
              {COPY.FEATURED_PRODUCTS.TITLE}
            </h2>
            <p className="text-muted-foreground mt-1">
              {COPY.FEATURED_PRODUCTS.SUBTITLE}
            </p>
          </div>
          <Button variant="link" asChild className="hidden md:flex text-[#1F3D2B] font-semibold hover:text-[#1F3D2B]/80">
            <Link href="/produk">
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        }>
          <FeaturedProductList />
        </Suspense>

        <div className="md:hidden">
          <Button className="w-full" variant="outline" asChild>
            <Link href="/produk">Lihat Semua Katalog</Link>
          </Button>
        </div>
      </section>

      {/* 4. UMKM LOKAL */}
      <section className="bg-[#F4F1EC] border-y border-[#E6E3DF] py-16">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-[#1F3D2B] flex items-center justify-center text-white shadow-lg shadow-[#1F3D2B]/20">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1C]">
                  {COPY.UMKM_SECTION.TITLE}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {COPY.UMKM_SECTION.SUBTITLE}
                </p>
              </div>
            </div>
            <Button variant="outline" className="bg-white border-[#E6E3DF]" asChild>
              <Link href="/umkm">Lihat Semua Warung</Link>
            </Button>
          </div>

          <Suspense fallback={<div className="h-40 bg-secondary animate-pulse rounded-xl" />}>
            <FeaturedUmkmList />
          </Suspense>
        </div>
      </section>

      {/* CTA & SUPPORT */}
      <CtaRegister />
      <SupportSection />
    </div>
  )
}