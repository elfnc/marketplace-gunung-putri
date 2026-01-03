import { Metadata } from "next"
import { Motion } from "@/components/shared/Motion"
import { fadeIn } from "@/lib/animations"
import { formatRupiah, getWhatsAppLink } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductBySlug, getRelatedProducts } from "@/features/products/server/getProductDetail"
import { ProductCard } from "@/features/products/components/ProductCard"
import { ShareButton } from "@/components/shared/share-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Store, ArrowLeft, MessageCircle, CheckCircle2 } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

// 1. SEO METADATA
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Produk Tidak Ditemukan" }

  return {
    title: `${product.name} | DekatRumah`,
    description: `Beli ${product.name} harga ${formatRupiah(Number(product.price))} di DekatRumah. Penjual: ${product.umkm.name}.`,
    openGraph: {
      type: "website",
      title: `Jual ${product.name} — ${product.umkm.name}`,
      description: `Harga: ${formatRupiah(Number(product.price))} | Lokasi: ${product.umkm.address || 'Gunung Putri'}`,
      images: product.imageUrl ? [product.imageUrl] : [],
      url: `/produk/${product.slug}`,
      siteName: 'DekatRumah',
    }
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.umkm.categoryId, product.id)
  const formattedPrice = formatRupiah(Number(product.price));

  // Format Pesan WhatsApp yang Rapi
  const waMessage = `Halo kak *${product.umkm.name}*, 
Saya lihat produk *${product.name}* di aplikasi DekatRumah. 

Harganya: ${formattedPrice}
Apakah stoknya masih tersedia?`;

  const waLink = getWhatsAppLink(waMessage, product.umkm.phone);

  return (
    <Motion
      className="min-h-screen pb-32 md:pb-16 bg-[#FAFAFA]"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* 1. HEADER / BREADCRUMB */}
      <div className="bg-white border-b border-[#E6E3DF] sticky top-0 z-40 md:static">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground pl-0 hover:text-[#1F3D2B] -ml-2">
            <Link href="/produk">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

          {/* 2. IMAGE GALLERY (Kiri - 7 Kolom di Desktop) */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white border border-[#E6E3DF] shadow-sm group">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* 3. PRODUCT INFO (Kanan - 5 Kolom di Desktop) */}
          <div className="md:col-span-6 lg:col-span-7 space-y-6 md:pl-4">
            {/* Header Produk */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-[#1F3D2B]/10 text-[#1F3D2B] hover:bg-[#1F3D2B]/20 border-0 px-3 py-1">
                  {product.umkm.category.name}
                </Badge>
                {product.umkm.isActive && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1C1C] leading-snug mb-2">
                {product.name}
              </h1>

              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-[#1F3D2B]">
                  {formattedPrice}
                </p>
              </div>
            </div>

            <Separator className="bg-[#E6E3DF]" />

            {/* Deskripsi */}
            <div className="prose prose-sm prose-neutral max-w-none text-muted-foreground leading-relaxed">
              <h3 className="text-[#1C1C1C] font-semibold text-base mb-2">Tentang Produk</h3>
              <p className="whitespace-pre-line">
                {product.description || "Penjual belum menambahkan deskripsi detail untuk produk ini. Silakan tanya langsung via chat."}
              </p>
            </div>

            {/* Card Info Penjual */}
            <div className="bg-white rounded-2xl border border-[#E6E3DF] p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-14 w-14 rounded-full bg-[#F4F1EC] flex items-center justify-center border border-[#E6E3DF] shrink-0 text-[#1F3D2B]">
                <Store className="h-7 w-7" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Penjual:</p>
                <Link href={`/umkm/${product.umkm.slug}`} className="font-bold text-[#1C1C1C] text-lg hover:text-[#1F3D2B] hover:underline block truncate">
                  {product.umkm.name}
                </Link>
                <div className="flex items-center text-sm text-muted-foreground mt-1 truncate">
                  <MapPin className="h-3.5 w-3.5 mr-1 shrink-0 text-[#C56A4A]" />
                  <span className="truncate">{product.umkm.address || "Gunung Putri, Bogor"}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="hidden sm:flex text-[#1F3D2B]" asChild>
                <Link href={`/umkm/${product.umkm.slug}`}>Kunjungi Toko</Link>
              </Button>
            </div>

            {/* ACTIONS DESKTOP (Perbaikan Layout) */}
            <div className="hidden md:flex items-center gap-3 pt-6 border-t border-[#E6E3DF]/50 mt-4">
              <Button
                size="lg"
                className="flex-1 h-14 text-base rounded-xl shadow-md bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold transition-all hover:scale-[1.01]"
                asChild
              >
                <Link href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Beli via WhatsApp
                </Link>
              </Button>

              <ShareButton
                title={product.name}
                text={`Cek ${product.name} di DekatRumah. Harga: ${formattedPrice}`}
                size="icon"
                className="h-14 w-14 rounded-xl border-[#E6E3DF] bg-white text-[#1F3D2B] hover:bg-[#F4F1EC] shrink-0 flex items-center justify-center"
                variant="outline"
              />
            </div>

            <p className="hidden md:block text-xs text-center text-muted-foreground">
              Transaksi aman & langsung dengan penjual.
            </p>
          </div>
        </div>

        {/* 4. RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24 border-t border-[#E6E3DF] pt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1C1C1C]">Lainnya dari {product.umkm.name}</h2>
              <Link href={`/umkm/${product.umkm.slug}`} className="text-sm font-semibold text-[#1F3D2B] hover:underline">
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  slug={p.slug}
                  price={Number(p.price)}
                  imageUrl={p.imageUrl}
                  umkmName={p.umkm.name}
                  category={p.umkm.category.name}
                  umkmId={p.umkmId}
                  umkmPhone={p.umkm.phone}
                  description={p.description}
                  umkmAddress={p.umkm.address}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E6E3DF] md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="px-4 pt-3 pb-safe">
          <div className="flex gap-3 max-w-md mx-auto mb-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <ShareButton
              title={product.name}
              text={`Cek ${product.name} di DekatRumah. Harga: ${formattedPrice}`}
              variant="outline"
              size="icon"
              className="h-12 w-14 rounded-xl border-[#E6E3DF] shrink-0 text-[#1F3D2B]"
            />
            <Button
              className="w-full h-12 rounded-xl text-base font-bold shadow-sm bg-[#25D366] hover:bg-[#1EBE57] text-white"
              size="lg"
              asChild
            >
              <Link href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Beli - {formattedPrice}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Motion>
  )
}