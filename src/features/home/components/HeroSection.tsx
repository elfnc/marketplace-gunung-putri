import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary border-b border-border/50">
      {/* Background Pattern: Fixed Syntax */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]"></div>
      
      <div className="container relative mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
        
        <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-white/50 px-3 py-1 text-sm text-primary backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
          Marketplace Warga Gunung Putri
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-6xl lg:text-7xl mb-6 leading-tight">
          Support Tetangga,<br />
          <span className="text-foreground relative">
            Hidupkan Ekonomi.
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Temukan makanan enak, kerajinan tangan, dan jasa terpercaya langsung dari warga sekitar. 
          Tanpa aplikasi ribet, pesan langsung via WhatsApp.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-xl shadow-primary/10 transition-transform hover:scale-105" asChild>
            <Link href="/produk">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Mulai Belanja
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base bg-white/60 hover:bg-white border-primary/20" asChild>
            <Link href="/dukung-umkm-lokal">
              Daftarkan Usaha
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}