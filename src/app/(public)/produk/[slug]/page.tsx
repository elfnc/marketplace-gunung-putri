import { Metadata } from "next"
import { Motion } from "@/components/shared/Motion"
import { fadeIn } from "@/lib/animations"
import { formatRupiah } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductBySlug, getRelatedProducts } from "@/features/products/server/getProductDetail"
import { ProductCard } from "@/features/products/components/ProductCard"
import { ShareButton } from "@/components/shared/share-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, ShoppingCart, Store, ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

// 1. GENERATE METADATA (BRANDING: DEKATRUMAH)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Produk Tidak Ditemukan" }

  return {
    title: `${product.name} | DekatRumah`,
    description: product.description?.slice(0, 160) || `Beli ${product.name} dari ${product.umkm.name} di DekatRumah. Langsung chat WhatsApp penjual.`,
    openGraph: {
      title: `Jual ${product.name} — ${product.umkm.name}`,
      description: `Harga: ${formatRupiah(Number(product.price))} | Lokasi: ${product.umkm.address || 'Gunung Putri'}`,
      images: product.imageUrl ? [product.imageUrl] : [],
      url: `/produk/${product.slug}`, // SEO friendly URL
      siteName: 'DekatRumah'
    }
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  // 2. FETCH DATA
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.umkm.categoryId, product.id)
  const formattedPrice = formatRupiah(Number(product.price));

  return (
    <Motion
      // 👇 PENTING: pb-32 memberikan ruang ekstra agar konten terakhir tidak tertutup tombol sticky di mobile
      className="min-h-screen pb-32 md:pb-12"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Breadcrumb Simple */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground pl-0 hover:text-[#1F3D2B]">
          <Link href="/produk">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Katalog
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* KOLOM KIRI: IMAGE GALLERY */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border border-[#E6E3DF] shadow-sm">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
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

          {/* KOLOM KANAN: INFO PRODUK */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-[#1F3D2B]/20 text-[#1F3D2B] bg-[#1F3D2B]/5">
                  {product.umkm.category.name}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C1C] md:text-4xl leading-tight">
                {product.name}
              </h1>
              <div className="mt-4 text-3xl font-bold text-[#1F3D2B]">
                {formattedPrice}
              </div>
            </div>

            <Separator className="bg-[#E6E3DF]" />

            {/* Deskripsi */}
            <div className="prose prose-sm text-muted-foreground leading-relaxed">
              <h3 className="text-[#1C1C1C] font-semibold mb-2">Deskripsi</h3>
              <p className="whitespace-pre-line">
                {product.description || "Belum ada deskripsi produk."}
              </p>
            </div>

            {/* INFO UMKM (Sidebar Widget) */}
            <div className="rounded-xl border border-[#E6E3DF] bg-[#F4F1EC]/50 p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-[#E6E3DF] shrink-0 text-[#1F3D2B]">
                <Store className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Dijual oleh:</p>
                <Link href={`/umkm/${product.umkm.slug}`} className="font-semibold hover:text-[#1F3D2B] hover:underline block truncate">
                  {product.umkm.name}
                </Link>
                <div className="flex items-center text-xs text-muted-foreground mt-1 truncate">
                  <MapPin className="h-3 w-3 mr-1 shrink-0" />
                  <span className="truncate">{product.umkm.address || "Gunung Putri"}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-[#1F3D2B] text-[#1F3D2B] hover:bg-[#1F3D2B] hover:text-white" asChild>
                <Link href={`/umkm/${product.umkm.slug}`}>Lihat Toko</Link>
              </Button>
            </div>

            {/* ACTIONS DESKTOP (Hidden on Mobile) */}
            <div className="hidden md:flex gap-3 pt-4">
              <Button size="lg" className="flex-1 text-base h-12 rounded-xl shadow-lg bg-[#1F3D2B] hover:bg-[#152b1e]">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Tambah ke Keranjang
              </Button>
              <ShareButton
                title={product.name}
                text={`Cek ${product.name} di DekatRumah. Harga: ${formattedPrice}`}
                size="lg"
                className="h-12 w-12 rounded-xl border-[#1F3D2B]/20 text-[#1F3D2B]"
                variant="outline"
              />
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24 border-t border-[#E6E3DF] pt-12">
            <h2 className="text-2xl font-bold mb-6 text-[#1C1C1C]">Produk Sejenis</h2>
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

      {/* 📱 MOBILE STICKY BOTTOM BAR (FIXED) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E6E3DF] md:hidden z-50 px-4 pt-3 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
        {/* pb-safe: ini utility class (atau inline style) untuk iPhone home bar */}
        <div
          className="flex gap-3 max-w-md mx-auto mb-4"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <ShareButton
            title={product.name}
            text={`Cek ${product.name} di DekatRumah. Harga: ${formattedPrice}`}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl border-[#1F3D2B]/20 shrink-0 text-[#1F3D2B]"
          />
          <Button className="w-full h-12 rounded-xl text-base shadow-lg bg-[#1F3D2B] hover:bg-[#152b1e]" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Beli - {formattedPrice}
          </Button>
        </div>
      </div>
    </Motion>
  )
}