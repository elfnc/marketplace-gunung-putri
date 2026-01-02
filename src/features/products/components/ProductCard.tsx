import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Store, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { AddToCartButton } from "./AddToCart"

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  imageUrl?: string | null
  umkmName: string
  umkmAddress?: string | null 
  description?: string | null
  category: string
  className?: string
  umkmId: string 
  umkmPhone: string
  umkmSlug?: string // Optional
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  imageUrl,
  umkmName,
  umkmAddress, 
  description,
  category,
  umkmId,
  umkmPhone,
  umkmSlug,
  className
}: ProductCardProps) {
  
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price)

  const shortAddress = umkmAddress ? umkmAddress.split(',').slice(-2).join(',').trim() : "Lokasi"

  return (
    <Card className={cn(
      "group relative flex flex-col h-full overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary/30", 
      className
    )}>
      
      {/* 1. IMAGE AREA -> Link ke Produk */}
      <Link href={`/produk/${slug}`} className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-secondary/20 block">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-secondary/30">
              <PackageIcon className="h-10 w-10 opacity-20" />
            </div>
          )}

          <div className="absolute left-2 top-2 sm:left-3 sm:top-3 z-10">
            <Badge 
              variant="secondary" 
              className="bg-white/90 backdrop-blur-md text-[#1F3D2B] font-medium text-[10px] px-2 py-0.5 shadow-sm"
            >
              {category}
            </Badge>
          </div>
      </Link>

      {/* 2. CONTENT AREA (Container) */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 pb-0 sm:pb-2 space-y-2 sm:space-y-3">
          
          {/* UMKM Info -> Link ke Profil UMKM (Jika ada slug) */}
          <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground gap-1.5 leading-none">
            {umkmSlug ? (
               <Link 
                  href={`/umkm/${umkmSlug}`} 
                  className="flex items-center gap-1 truncate shrink hover:text-primary transition-colors hover:underline decoration-primary/50 z-20"
               >
                  <Store className="h-3 w-3 shrink-0" />
                  <span className="truncate max-w-20 sm:max-w-none font-medium">{umkmName}</span>
               </Link>
            ) : (
               <div className="flex items-center gap-1 truncate shrink">
                  <Store className="h-3 w-3 shrink-0" />
                  <span className="truncate max-w-20 sm:max-w-none">{umkmName}</span>
               </div>
            )}

            {umkmAddress && (
                <>
                    <span className="text-border">•</span>
                    <div className="hidden sm:flex items-center gap-1 truncate shrink-0 text-muted-foreground/80">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate max-w-24">{shortAddress}</span>
                    </div>
                </>
            )}
          </div>

          {/* Product Info -> Link ke Produk (Sisanya) */}
          <Link href={`/produk/${slug}`} className="flex flex-col flex-1">
             <div>
                <h3 className="line-clamp-2 text-xs sm:text-sm font-bold text-[#1C1C1C] leading-tight group-hover:text-[#1F3D2B] transition-colors min-h-[2.5em]">
                    {name}
                </h3>
                {description && (
                    <p className="hidden sm:block line-clamp-2 text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        {description}
                    </p>
                )}
             </div>

             {/* Price */}
             <div className="mt-auto pt-1 sm:pt-2">
                <div className="text-sm sm:text-lg font-bold text-[#1F3D2B] tracking-tight">
                    {formattedPrice}
                </div>
             </div>
          </Link>
      </div>

      {/* FOOTER ACTION */}
      <div className="p-3 sm:p-4 pt-3 mt-auto">
        <AddToCartButton 
            variant="full"
            product={{
                id,
                name,
                price,
                imageUrl,
                umkmId,
                umkmName,
                umkmPhone
            }}
        />
      </div>
    </Card>
  )
}

function PackageIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22v-10" />
    </svg>
  )
}