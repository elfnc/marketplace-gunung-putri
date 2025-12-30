import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

// Kita define type lokal atau import dari Prisma type nanti
interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  imageUrl?: string | null
  umkmName: string
  category: string
}

export function ProductCard({
  name,
  slug,
  price,
  imageUrl,
  umkmName,
  category,
}: ProductCardProps) {
  // Format Rupiah
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <Card className="group overflow-hidden rounded-xl border-border/50 bg-card transition-all hover:shadow-md hover:border-primary/20">
      {/* IMAGE SECTION */}
      <Link href={`/produk/${slug}`} className="block relative aspect-square overflow-hidden bg-secondary/50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <span className="text-xs">No Image</span>
          </div>
        )}
        {/* Category Badge (Overlay) */}
        <Badge 
          variant="secondary" 
          className="absolute left-3 top-3 bg-white/90 backdrop-blur-sm text-xs font-normal text-foreground shadow-sm hover:bg-white"
        >
          {category}
        </Badge>
      </Link>

      {/* INFO SECTION */}
      <CardContent className="p-4">
        <div className="mb-1 text-xs text-muted-foreground font-medium truncate">
          {umkmName}
        </div>
        <Link href={`/produk/${slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-primary transition-colors h-10">
            {name}
          </h3>
        </Link>
        <div className="mt-2 text-lg font-bold text-primary">
          {formattedPrice}
        </div>
      </CardContent>

      {/* ACTION SECTION */}
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2 rounded-lg" size="sm" variant="outline">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-xs font-medium">Tambah</span>
        </Button>
      </CardFooter>
    </Card>
  )
}