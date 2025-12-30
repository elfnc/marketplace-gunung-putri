import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  // Double protection selain middleware
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* MOBILE SIDEBAR (Drawer) */}
      <Sheet>
        <header className="flex h-14 items-center border-b bg-background px-4 md:hidden">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <span className="font-bold">Admin Panel</span>
        </header>
        <SheetContent side="left" className="p-0 w-64">
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-64 flex-col md:flex fixed inset-y-0 z-50">
        <AdminSidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 bg-secondary/20 min-h-screen">
        <div className="container py-6 px-4 md:px-8">
            {children}
        </div>
      </main>
    </div>
  )
}