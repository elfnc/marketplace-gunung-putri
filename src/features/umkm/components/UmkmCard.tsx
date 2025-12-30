import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Store } from "lucide-react"

interface UmkmCardProps {
  name: string
  slug: string
  category: string
  address?: string | null
  imageUrl?: string | null
  productCount: number
}

export function UmkmCard({
  name,
  slug,
  category,
  address,
  imageUrl,
  productCount,
}: UmkmCardProps) {
  return (
    <Link href={`/umkm/${slug}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/30 group">
        <CardContent className="p-5 flex items-start space-x-4">
          {/* Avatar Toko */}
          <Avatar className="h-14 w-14 border border-border">
            <AvatarImage src={imageUrl || ""} className="object-cover" />
            <AvatarFallback className="bg-secondary text-primary">
              <Store className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>

          {/* Info Toko */}
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-foreground leading-none group-hover:text-primary transition-colors">
                {name}
              </h3>
            </div>
            
            <Badge variant="secondary" className="text-[10px] px-2 h-5 font-normal">
              {category}
            </Badge>

            <div className="pt-2 flex items-center text-xs text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              <span className="line-clamp-1">
                {address || "Gunung Putri"}
              </span>
            </div>
            
            <p className="text-xs text-primary font-medium pt-1">
              {productCount} Produk
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}