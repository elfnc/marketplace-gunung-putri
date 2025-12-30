import { Suspense } from "react"
import { HeroSection } from "@/features/home/components/HeroSection"
import { CategoryRail } from "@/features/home/components/CategoryRail"
import { CtaJoin } from "@/features/home/components/CtaJoin"
import { ProductCard } from "@/features/products/components/ProductCard"
import { getFeaturedProducts } from "@/features/products/server/getProduct"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Store } from "lucide-react"
import { ProductCardSkeleton } from "@/components/ui/skeleton-card"
import { getFeaturedUmkms } from "@/features/umkm/server/getUmkm"
import { UmkmCard } from "@/features/umkm/components/UmkmCard"

// Komponen Async untuk Fetch Data
async function FeaturedProductList() {
  // Simulate delay biar kelihatan skeletonnya (Hapus nanti pas production)
  // await new Promise(resolve => setTimeout(resolve, 1000)) 
  
  const products = await getFeaturedProducts()

  if (products.length === 0) {
    return (
      <div className="col-span-full py-12 text-center text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
        <p>Belum ada produk unggulan saat ini.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-8">
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
        />
      ))}
    </div>
  )
}

async function FeaturedUmkmList() {
  const umkms = await getFeaturedUmkms()

  if (umkms.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* Sticky Category Rail */}
      <CategoryRail />
      
      <section className="container mx-auto px-4 py-16 md:px-6 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
              Terbaru dari Warga
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Support usaha lokal di sekitar kita. Kualitas terjamin, harga tetangga.
            </p>
          </div>
          <Button variant="link" asChild className="hidden md:flex text-primary hover:text-accent p-0 font-semibold">
            <Link href="/produk">
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* SUSPENSE: Bagian ini akan loading terpisah */}
        <Suspense fallback={
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-8">
            {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        }>
          <FeaturedProductList />
        </Suspense>

        {/* Tombol Mobile */}
        <div className="md:hidden pt-4">
            <Button className="w-full" variant="outline" asChild>
                <Link href="/produk">Lihat Semua Katalog</Link>
            </Button>
        </div>
      </section>

      {/* SECTION 2: UMKM LOKAL (BARU) */}
      <section className="bg-secondary/30 border-y border-border/50 py-16">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-primary">
                  Warung & Jasa Sekitar
                </h2>
                <p className="text-sm text-muted-foreground">
                  Langganan tetangga sendiri, lebih hemat ongkir.
                </p>
              </div>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link href="/umkm">Lihat Semua UMKM</Link>
            </Button>
          </div>

          {/* Grid UMKM */}
          <Suspense fallback={<div className="h-40 w-full bg-secondary animate-pulse rounded-xl" />}>
            <FeaturedUmkmList />
          </Suspense>
          
          <div className="md:hidden">
              <Button className="w-full bg-white" variant="outline" asChild>
                  <Link href="/umkm">Cari Warung Lainnya</Link>
              </Button>
          </div>
        </div>
      </section>

      {/* CTA Gabung */}
      <CtaJoin />
    </div>
  )
}