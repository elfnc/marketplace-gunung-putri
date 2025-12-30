import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaJoin() {
  return (
    <section className="border-t bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Punya Usaha di Gunung Putri?</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Gratis, tanpa potongan komisi, dan langsung terhubung ke WhatsApp pelanggan. 
                Saatnya warga lokal saling dukung.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold text-primary hover:bg-white" asChild>
                <Link href="https://wa.me/6281234567890?text=Halo%20Admin%20Marketplace,%20saya%20mau%20daftar%20UMKM">
                    Hubungi Admin via WA
                </Link>
            </Button>
        </div>
    </section>
  )
}