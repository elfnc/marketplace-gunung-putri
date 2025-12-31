import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Store } from "lucide-react"
import { COPY } from "@/lib/copywritting"
import { getWhatsAppLink } from "@/lib/utils"

// Kita butuh data produk buat grid visual kanan
interface HeroProduct {
  id: string
  imageUrl: string | null
  name: string
}

interface HeroSectionProps {
  products: HeroProduct[]
}

export function HeroSection({ products }: HeroSectionProps) {
  // Ambil 6 produk pertama untuk grid visual
  const heroProducts = products.slice(0, 6)

  return (
    <section className="relative w-full bg-white min-h-[80vh] flex items-center overflow-hidden border-b border-border/20">
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full py-12 lg:py-0">

          {/* KIRI: CONTENT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1C1C] leading-[1.1] whitespace-pre-line">
                {COPY.HERO.HEADLINE}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed whitespace-pre-line">
                {COPY.HERO.SUBHEADLINE}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[#1F3D2B] hover:bg-[#1F3D2B]/90 text-white rounded-full h-12 px-8 text-base font-semibold shadow-xl shadow-[#1F3D2B]/20"
                asChild
              >
                <Link href="#search-section">
                  {COPY.HERO.CTA_PRIMARY}
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-base border-input hover:bg-secondary text-foreground"
                asChild
              >
                <Link href={getWhatsAppLink(COPY.WA_TEMPLATE.REGISTER)} target="_blank">
                  <Store className="mr-2 h-4 w-4" />
                  {COPY.HERO.CTA_SECONDARY}
                </Link>
              </Button>
            </div>
          </div>

          {/* KANAN: VISUAL GRID (4-6 Produk) */}
          <div className="relative hidden lg:block h-full min-h-[500px]">
            {/* Background Blob Halus */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#F4F1EC] rounded-full blur-3xl opacity-60 -z-10" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              {heroProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-sm border border-black/5 hover:shadow-md transition-shadow
                      ${idx % 2 === 0 ? 'translate-y-4' : '-translate-y-4'} // Efek naik turun dikit
                    `}
                >
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-xs">
                      No Image
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}