import { Metadata } from "next"
import { Motion } from "@/components/shared/Motion"
import { fadeIn } from "@/lib/animations"
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

// 1. GENERATE METADATA (SEO WAJIB)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Produk Tidak Ditemukan" }

  return {
    title: `${product.name} - ${product.umkm.name} | Gunung Putri`,
    description: product.description?.slice(0, 160) || `Beli ${product.name} dari ${product.umkm.name} di Marketplace UMKM Gunung Putri.`,
    openGraph: {
      images: product.imageUrl ? [product.imageUrl] : [],
    }
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  // 2. FETCH DATA
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound() // Akan melempar ke halaman 404 Next.js
  }

  const relatedProducts = await getRelatedProducts(product.umkm.categoryId, product.id)

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(product.price))

  return (
    <Motion
      className="min-h-screen pb-24 md:pb-12"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Breadcrumb Simple */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground pl-0 hover:text-primary">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Home
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* KOLOM KIRI: IMAGE GALLERY */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border border-border shadow-sm">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
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
                <Badge variant="outline" className="border-primary/20 text-primary">
                  {product.umkm.category.name}
                </Badge>
                {/* Kalau mau ada label stok/status bisa disini */}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {product.name}
              </h1>
              <div className="mt-4 text-3xl font-bold text-primary">
                {formattedPrice}
              </div>
            </div>

            <Separator />

            {/* Deskripsi */}
            <div className="prose prose-sm text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-semibold mb-2">Deskripsi</h3>
              <p className="whitespace-pre-line">
                {product.description || "Belum ada deskripsi produk."}
              </p>
            </div>

            {/* INFO UMKM (Sidebar Widget) */}
            <div className="rounded-xl border border-border bg-secondary/30 p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-border shrink-0">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Dijual oleh:</p>
                <Link href={`/umkm/${product.umkm.slug}`} className="font-semibold hover:text-primary hover:underline block">
                  {product.umkm.name}
                </Link>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {product.umkm.address || "Gunung Putri"}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/umkm/${product.umkm.slug}`}>Lihat Toko</Link>
              </Button>
            </div>

            {/* ACTIONS DESKTOP */}
            <div className="hidden md:flex gap-3 pt-4">
              <Button size="lg" className="flex-1 text-base h-12 rounded-xl shadow-lg shadow-primary/10">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Tambah ke Keranjang
              </Button>
              <ShareButton
                title={product.name}
                text={`Jual ${product.name} murah di ${product.umkm.name}. Cek sekarang!`}
                size="lg"
                className="h-12 w-12 rounded-xl"
                variant="outline"
              />
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-bold mb-6">Produk Lainnya</h2>
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

      {/* MOBILE STICKY BOTTOM BAR (UX WAJIB) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:hidden z-50 pb-6">
        <div className="flex gap-3">
          <ShareButton
            title={product.name}
            text={`Cek produk ${product.name} ini!`}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl border-primary/20 shrink-0 text-primary"
          />
          <Button className="w-full h-12 rounded-xl text-base shadow-lg shadow-primary/10" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Tambah - {formattedPrice}
          </Button>
        </div>
      </div>
    </Motion>
  )
}