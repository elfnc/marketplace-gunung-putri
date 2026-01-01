import { PublicNavbar } from "@/components/layout/PublicNavbar"
import { COPY } from "@/lib/copywritting"
import Link from "next/link"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <PublicNavbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-[#E6E3DF] bg-white py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
            <h4 className="font-semibold text-[#1F3D2B] mb-2">{COPY.FOOTER.BRAND}</h4>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {COPY.FOOTER.TAGLINE}
            </p>
            <div className="text-sm font-medium">
         <Link href="/dukung" className="text-[#C56A4A] hover:underline">
            Dukung Project Ini ♡
         </Link>
      </div>
            <div className="mt-8 text-xs text-muted-foreground/60">
                &copy; {new Date().getFullYear()} Gunung Putri. Local Pride.
            </div>
        </div>
      </footer>
    </div>
  )
}