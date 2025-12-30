import { PublicNavbar } from "@/components/layout/PublicNavbar"

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
      <footer className="border-t bg-card py-6 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>© {new Date().getFullYear()} Marketplace UMKM Gunung Putri. Dibangun oleh warga.</p>
        </div>
      </footer>
    </div>
  )
}