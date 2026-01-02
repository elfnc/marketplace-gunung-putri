import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { COPY } from "@/lib/copywritting"
import { getFeaturedProducts } from "@/features/products/server/getProduct"
import { getFeaturedUmkms } from "@/features/umkm/server/getUmkm"
import { HeroSection } from "@/features/home/components/HeroSection"
import { SearchCategorySection } from "@/features/home/components/SearchCategory"
import { ProductCard } from "@/features/products/components/ProductCard"
import { UmkmCard } from "@/features/umkm/components/UmkmCard"
import { CtaRegister } from "@/features/home/components/CtaJoin"
import { SupportSection } from "@/features/home/components/SupportSection"


const ACTIVE_EVENT = {
  title: "Bazar UMKM Gunung Putri - Akhir Pekan Ini! 🎉",
  link: "/events/bazar-warga"
}

export const revalidate = 60

export default async function HomePage() {
  // Fetch Produk & UMKM secara paralel biar cepat
  const [products, featuredUmkms] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedUmkms()
  ])

  return (
    <div className="flex flex-col min-h-screen">
      {/* <EventBanner event={ACTIVE_EVENT} /> */}
      <HeroSection products={products} />

      <Suspense fallback={<div className="container mx-auto h-24 bg-secondary/20 animate-pulse rounded-xl my-8" />}>
        <SearchCategorySection />
      </Suspense>
      
      {/* 3. PRODUK UNGGULAN */}
      <section className="container mx-auto px-4 py-16 md:px-6 space-y-8">
        <div className="flex items-end justify-between border-b pb-4 border-border">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1C1C1C]">
              {COPY.FEATURED_PRODUCTS.TITLE}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              {COPY.FEATURED_PRODUCTS.SUBTITLE}
            </p>
          </div>
          <Button variant="link" className="text-[#1F3D2B] font-semibold hidden md:flex" asChild>
            <Link href="/produk">Lihat Semua →</Link>
          </Button>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
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
                umkmId={product.umkm.id}
                umkmPhone={product.umkm.phone}
                umkmSlug={product.umkm.slug} // ✅ Pass slug buat link ke profil
                description={product.description}
                umkmAddress={product.umkm.address}
              />
            ))}
          </div>
        ) : (
           <div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-xl border border-dashed">
             Belum ada produk unggulan saat ini.
           </div>
        )}

        <div className="md:hidden text-center mt-4">
            <Button variant="outline" className="w-full" asChild>
                <Link href="/produk">Lihat Semua Produk</Link>
            </Button>
        </div>
      </section>

      {/* 4. UMKM LOKAL SECTION (UPDATED) */}
      <section className="bg-[#F4F1EC] border-y border-[#E6E3DF] py-16">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1C1C1C]">
                  {COPY.UMKM_SECTION.TITLE}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                  {COPY.UMKM_SECTION.SUBTITLE}
                </p>
             </div>
             <Button variant="outline" className="bg-white border-[#E6E3DF] shadow-sm hover:bg-white/80" asChild>
                  <Link href="/umkm">{COPY.UMKM_SECTION.CTA_ALL}</Link>
             </Button>
          </div>
          
          {/* 👇 INI YANG KITA PERBAIKI */}
          {featuredUmkms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featuredUmkms.map((umkm) => (
                    <UmkmCard 
                        key={umkm.id}
                        name={umkm.name}
                        slug={umkm.slug}
                        category={umkm.category.name}
                        address={umkm.address}
                        productCount={umkm._count.products}
                        // 👇 FIX ERROR: Ganti 'imageUrl' jadi 'coverImage'
                        // Dan ambil dari array products[0]
                        coverImage={umkm.products[0]?.imageUrl} 
                    />
                ))}
            </div>
          ) : (
            <div className="py-12 text-center opacity-60">
                <p>Belum ada UMKM yang ditampilkan.</p>
            </div>
          )}

        </div>
      </section>

      <CtaRegister />
      <SupportSection />
    </div>
  )
}