import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Store, MapPin, Package, Clock } from "lucide-react"

interface UmkmCardProps {
    name: string
    slug: string
    category: string
    address: string | null
    productCount: number
    coverImage?: string | null
    operationalHours?: string | null
}

export function UmkmCard({
    name,
    slug,
    category,
    address,
    productCount,
    coverImage,
    operationalHours
}: UmkmCardProps) {

    // Handle address kalau null, pakai default "Gunung Putri"
    const displayAddress = address
        ? address.split(',').slice(-2).join(',').trim()
        : "Lokasi tidak tersedia"

    return (
        <Link href={`/umkm/${slug}`}>
            <Card className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/30 h-full flex flex-col">

                {/* COVER HEADER */}
                <div className="relative h-24 bg-secondary/30 overflow-hidden">
                    {/* Kalau ada coverImage, tampilkan. Kalau null, tampilkan pattern. */}
                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={name}
                            fill
                            className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105 blur-[1px]"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(#1F3D2B_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                    )}

                    <div className="absolute top-3 right-3 z-10">
                        <Badge variant="secondary" className="bg-white/90 text-[10px] backdrop-blur-sm shadow-sm text-[#1F3D2B]">
                            {category}
                        </Badge>
                    </div>
                </div>

                {/* AVATAR & INFO */}
                <div className="px-4 pb-4 flex flex-col flex-1 relative">

                    {/* Logo Circle (Avatar) */}
                    <div className="-mt-10 mb-3 relative z-10">
                        <div className="h-16 w-16 rounded-xl bg-white p-1 shadow-md border border-border/50">
                            <div className="h-full w-full rounded-lg bg-secondary/20 flex items-center justify-center text-muted-foreground overflow-hidden group-hover:bg-[#1F3D2B] group-hover:text-white transition-colors">
                                {coverImage ? (
                                    <Image
                                        src={coverImage}
                                        alt={name}
                                        width={64}
                                        height={64}
                                        className="object-cover h-full w-full"
                                    />
                                ) : (
                                    <Store className="h-8 w-8" />
                                )}
                            </div>
                        </div>
                    </div>

                    <h3 className="font-bold text-lg text-[#1C1C1C] leading-tight group-hover:text-[#1F3D2B] transition-colors mb-1 line-clamp-1">
                        {name}
                    </h3>

                    <div className="text-sm text-muted-foreground space-y-2 mt-1">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate max-w-[200px]">{displayAddress}</span>
                        </div>

                        {operationalHours && (
                            <div className="flex items-center gap-1.5 text-[#1F3D2B]">
                                <Clock className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate max-w-[200px] text-xs font-medium">{operationalHours}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-1.5 text-xs bg-secondary/30 w-fit px-2 py-1 rounded-md text-[#1F3D2B]">
                            <Package className="h-3 w-3 shrink-0" />
                            <span>{productCount} Produk</span>
                        </div>
                    </div>

                </div>
            </Card>
        </Link>
    )
}