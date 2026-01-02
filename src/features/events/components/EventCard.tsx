import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface EventCardProps {
  title: string
  slug: string
  excerpt?: string | null
  imageUrl?: string | null
  startDate: Date
  location?: string | null
}

export function EventCard({ title, slug, excerpt, imageUrl, startDate, location }: EventCardProps) {
  return (
    <Link href={`/events/${slug}`} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
      {/* IMAGE CONTAINER */}
      <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // Fallback Pattern
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-gray-50">
             <CalendarDays className="h-10 w-10 opacity-20 mb-2" />
             <span className="text-xs font-medium opacity-40">Tidak ada gambar</span>
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur shadow-sm px-3 py-1.5 rounded-lg flex flex-col items-center text-[#1C1C1C]">
            <span className="text-xl font-bold leading-none">{format(startDate, 'dd')}</span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">{format(startDate, 'MMM', { locale: id })}</span>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="p-5 flex flex-col flex-1">
         {/* Meta */}
         <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            {location && (
                <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-[150px]">{location}</span>
                </div>
            )}
            {!location && <span>Berita Warga</span>}
         </div>

         <h3 className="text-lg font-bold text-[#1C1C1C] mb-2 leading-snug group-hover:text-[#C56A4A] transition-colors line-clamp-2">
            {title}
         </h3>

         {excerpt && (
             <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
                {excerpt}
             </p>
         )}

         <div className="mt-auto pt-3 border-t border-dashed border-gray-100">
             <span className="text-xs font-semibold text-[#1F3D2B] group-hover:underline">Baca Selengkapnya &rarr;</span>
         </div>
      </div>
    </Link>
  )
}