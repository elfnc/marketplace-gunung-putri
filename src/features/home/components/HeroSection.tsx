import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Store, MapPin } from "lucide-react"
import { COPY } from "@/lib/copywritting"
import { getWhatsAppLink } from "@/lib/utils" // Sesuaikan path jika beda
import { Badge } from "@/components/ui/badge"
import { Motion } from "@/components/shared/Motion"
import { fadeInUp, slideInRight } from "@/lib/animations"

interface HeroProduct {
  id: string
  imageUrl: string | null
  name: string
}

interface HeroSectionProps {
  products: HeroProduct[]
}

export function HeroSection({ products }: HeroSectionProps) {
  // Ambil 4 produk pertama saja untuk grid 2x2
  const heroProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <section className="relative w-full bg-white min-h-150 lg:min-h-[80vh] flex items-center border-b border-border/40 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F4F1EC]/30 -z-10 skew-x-12 hidden lg:block" />

      <div className="container mx-auto px-4 md:px-6 h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full py-16 lg:py-0">

          {/* KIRI: CONTENT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">

            <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-[#1F3D2B] bg-[#1F3D2B]/10 hover:bg-[#1F3D2B]/20 transition-colors">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Marketplace Warga Gunung Putri
            </Badge>

            <div className="space-y-6 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1C1C] leading-[1.15]">
                {COPY.HERO.HEADLINE}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                {COPY.HERO.SUBHEADLINE}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <Button
                size="lg"
                className="bg-[#1F3D2B] hover:bg-[#152b1e] text-white rounded-full h-12 px-8 text-base font-semibold shadow-lg shadow-[#1F3D2B]/20 transition-transform hover:scale-105"
                asChild
              >
                <Link href="/produk">
                  {COPY.HERO.CTA_PRIMARY}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-base border-input hover:bg-secondary text-foreground bg-white/50 backdrop-blur-sm"
                asChild
              >
                <Link href={getWhatsAppLink(COPY.WA_TEMPLATE.REGISTER)} target="_blank">
                  <Store className="mr-2 h-4 w-4" />
                  {COPY.HERO.CTA_SECONDARY}
                </Link>
              </Button>
            </div>
          </div>

          {/* KANAN: SINGLE FRAME VISUAL */}
          <Motion
            className="hidden lg:flex justify-center items-center relative"
            initial="hidden"
            animate="visible"
            variants={slideInRight}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1F3D2B]/10 to-transparent rounded-[2.5rem] blur-2xl transform scale-95 translate-y-4 -z-10" />

            <div className="relative w-full max-w-125 aspect-square rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-white">

              {heroProducts.length > 0 ? (
                <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-2 p-2 bg-gray-50">
                  {/* Render 4 Kotak Gambar yang sudah diacak */}
                  {[0, 1, 2, 3].map((idx) => {
                    const product = heroProducts[idx]
                    return (
                      <div key={idx} className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-200 group">
                        {product?.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary/30 text-muted-foreground/30">
                            <Store className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="w-full h-full bg-secondary/20 flex items-center justify-center flex-col gap-4 text-muted-foreground">
                  <div className="bg-white p-4 rounded-full shadow-sm">
                    <Store className="h-10 w-10 text-[#1F3D2B]" />
                  </div>
                  <p>Belum ada produk</p>
                </div>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 whitespace-nowrap z-20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-[#1F3D2B]">Support Produk Lokal</span>
              </div>

            </div>
          </Motion>

        </div>
      </div>
    </section >
  )
}