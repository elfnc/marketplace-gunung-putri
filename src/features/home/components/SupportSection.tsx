import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"
import Link from "next/link"
import { COPY } from "@/lib/copywritting" // Import

export function SupportSection() {
  return (
    <section className="py-12 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="inline-flex items-center justify-center p-3 bg-[#F4F1EC] rounded-full mb-4">
            <Coffee className="h-6 w-6 text-[#C56A4A]" />
        </div>
        <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
          {COPY.SUPPORT.TEXT}
        </p>
        <div className="flex justify-center">
             {/* Hapus Button Trakteer */}
             <Button variant="outline" className="rounded-full border-[#E6E3DF] hover:bg-[#F4F1EC] hover:text-[#C56A4A] gap-2 px-6" asChild>
                <Link href={COPY.SUPPORT.LINK_SAWERIA} target="_blank">
                    <Coffee className="h-4 w-4" />
                    {COPY.SUPPORT.BTN_SAWERIA}
                </Link>
             </Button>
        </div>
      </div>
    </section>
  )
}