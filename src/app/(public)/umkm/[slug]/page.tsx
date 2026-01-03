import { Metadata } from "next"
import { Motion } from "@/components/shared/Motion"
import { fadeIn } from "@/lib/animations"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store, MapPin, MessageCircle, ArrowLeft, ShoppingBag, Clock } from "lucide-react"
import { getUmkmBySlug } from "@/features/umkm/server/getUmkmDetail"
import { getWhatsAppLink } from "@/lib/utils"
import { ProductCard } from "@/features/products/components/ProductCard"
import { ShareButton } from "@/components/shared/share-button"

// Generate Metadata buat SEO (misal: "Warung Bu Siska - Marketplace Gunung Putri")
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug
    const umkm = await getUmkmBySlug(slug)

    if (!umkm) return { title: "UMKM Tidak Ditemukan" }

    return {
        title: `${umkm.name} - Marketplace Gunung Putri`,
        description: `Beli produk dari ${umkm.name}. ${umkm.address}.`,
        openGraph: {
            images: umkm.imageUrl ? [umkm.imageUrl] : [],
        }
    }
}

export default async function UmkmProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const umkm = await getUmkmBySlug(slug)

    if (!umkm) {
        notFound()
    }

    return (
        <Motion
            className="min-h-screen bg-[#F4F1EC]"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >

            {/* 1. HEADER PROFILE */}
            <div className="bg-white border-b border-border">
                <div className="container mx-auto px-4 py-8 md:py-12">

                    {/* Breadcrumb / Back */}
                    <div className="mb-6">
                        <Button variant="link" asChild className="pl-0 text-muted-foreground hover:text-[#1F3D2B]">
                            <Link href="/produk">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Katalog
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:items-start">
                        {/* Logo / Avatar Placeholder */}
                        <div className="shrink-0">
                            <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-[#1F3D2B] flex items-center justify-center text-white shadow-lg">
                                <Store className="h-10 w-10 md:h-12 md:w-12 opacity-80" />
                            </div>
                        </div>

                        {/* Info UMKM */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C1C1C] tracking-tight">
                                        {umkm.name}
                                    </h1>
                                    <Badge variant="secondary" className="bg-[#1F3D2B]/10 text-[#1F3D2B] hover:bg-[#1F3D2B]/20">
                                        {umkm.category.name}
                                    </Badge>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-muted-foreground text-sm md:text-base">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-4 w-4 shrink-0" />
                                        <span>{umkm.address}</span>
                                    </div>
                                    <span className="hidden sm:block text-border">•</span>
                                    <div className="flex items-center gap-1.5">
                                        <ShoppingBag className="h-4 w-4 shrink-0" />
                                        <span>{umkm.products.length} Produk Aktif</span>
                                    </div>
                                    {umkm.operationalHours && (
                                        <>
                                            <span className="hidden sm:block text-border">•</span>
                                            <div className="flex items-center gap-1.5 text-[#1F3D2B] bg-[#1F3D2B]/10 px-2 py-0.5 rounded-md">
                                                <Clock className="h-4 w-4 shrink-0" />
                                                <span>{umkm.operationalHours}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-2 flex flex-row gap-3">
                                <Button asChild className="rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold shadow-sm flex-1">
                                    <Link
                                        href={getWhatsAppLink(`Halo ${umkm.name}, saya lihat profil Anda di Marketplace Gunung Putri...`, umkm.phone)}
                                        target="_blank"
                                    >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Chat WhatsApp
                                    </Link>
                                </Button>
                                <ShareButton
                                    title={umkm.name}
                                    text={`Cek profil UMKM ${umkm.name} di Marketplace Gunung Putri!`}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. ETALASE PRODUK */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-xl font-bold mb-6 text-[#1C1C1C] flex items-center gap-2">
                    Etalase {umkm.name}
                </h2>

                {umkm.products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                        {umkm.products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                slug={product.slug}
                                price={Number(product.price)}
                                imageUrl={product.imageUrl}
                                // Info UMKM (diambil dari parent object umkm)
                                umkmName={umkm.name}
                                category={umkm.category.name}
                                umkmId={umkm.id}
                                umkmPhone={umkm.phone}
                                description={product.description}
                                umkmAddress={umkm.address}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-border rounded-xl bg-white/50">
                        <p className="text-muted-foreground">Belum ada produk yang ditampilkan di etalase ini.</p>
                    </div>
                )}
            </div>

        </Motion>
    )
}