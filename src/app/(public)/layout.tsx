import { PublicNavbar } from "@/components/layout/PublicNavbar"
import { Logo } from "@/components/brand/logo"
import { COPY } from "@/lib/copywritting"
import Link from "next/link"
import { Heart, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getWhatsAppLink } from "@/lib/utils" // 👈 Pastikan import ini ada!

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <PublicNavbar />

      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER MODERN */}
      <footer className="bg-[#F4F1EC] border-t border-[#E6E3DF] pt-16 pb-8">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

            {/* COLUMN 1: Brand Identity */}
            <div className="md:col-span-5 space-y-6">
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white border border-[#1F3D2B]/10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Logo className="h-6 w-6" />
                  </div>
                  <span className="text-xl font-bold text-[#1F3D2B]">DekatRumah<span className="text-[#C56A4A]">.</span></span>
                </div>
              </Link>

              <p className="text-muted-foreground leading-relaxed max-w-sm text-sm">
                {COPY.FOOTER.TAGLINE}
                <br />
                Membantu perputaran ekonomi warga Gunung Putri agar tetap tumbuh di lingkungan sendiri.
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-[#1F3D2B]/80 bg-white/50 w-fit px-3 py-1.5 rounded-full border border-[#1F3D2B]/10">
                <MapPin className="h-4 w-4 text-[#C56A4A]" />
                Gunung Putri, Bogor
              </div>
            </div>

            {/* COLUMN 2: Platform Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-bold text-[#1C1C1C]">Platform</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/produk" className="hover:text-[#1F3D2B] transition-colors">Jajanan & Produk</Link>
                </li>
                <li>
                  <Link href="/umkm" className="hover:text-[#1F3D2B] transition-colors">Direktori Usaha</Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-[#1F3D2B] transition-colors">Info Sekitar</Link>
                </li>
                <li>
                  <Link href="/tentang" className="hover:text-[#1F3D2B] transition-colors">Tentang Kami</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#1F3D2B] transition-colors">Pertanyaan Umum (FAQ)</Link>
                </li>
                <li>
                  <Link href="/kebijakan-privasi" className="hover:text-[#1F3D2B] transition-colors">Kebijakan Privasi</Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: Community & Support */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-bold text-[#1C1C1C]">Dukungan & Komunitas</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Platform ini dikelola secara mandiri. Dukunganmu membantu kami membayar biaya server.
              </p>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-[#C56A4A] text-[#C56A4A] hover:bg-[#C56A4A] hover:text-white transition-all gap-2"
                asChild
              >
                <Link href="/dukung">
                  <Heart className="h-4 w-4" />
                  Dukung Pengembangan
                </Link>
              </Button>

              <div className="pt-4 mt-4 border-t border-gray-200">
                {/* 👇 DISINI INTEGRASI WA NYA */}
                <Link
                  href={getWhatsAppLink(COPY.WA_TEMPLATE.ASK_INFO)}
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-[#1F3D2B] flex items-center gap-1 group w-fit"
                >
                  Butuh bantuan? <span className="underline decoration-dotted group-hover:text-[#1F3D2B]">Chat Admin</span> <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION */}
          <div className="border-t border-[#1F3D2B]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DekatRumah. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <span>Developed by</span>
              <a href="https://github.com/eldevs" target="_blank" className="font-medium text-[#1F3D2B] hover:underline">
                Eldevs
              </a>
              <span>— for the community.</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}