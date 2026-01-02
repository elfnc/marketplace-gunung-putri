"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Store, Package, LogOut, Settings, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { Logo } from "../brand/logo"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Kelola UMKM",
    href: "/admin/umkm",
    icon: Store,
  },
  {
    title: "Produk",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: Calendar,
  },
]

interface AdminSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 h-full border-r bg-sidebar", className)}>
      <div className="space-y-6 py-6 h-full flex flex-col">

        {/* LOGO AREA */}
        <div className="px-6 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#1F3D2B]/10 flex items-center justify-center shadow-xs">
              <Logo className="h-6 w-6" />
            </div>
            <div className="flex flex-col -space-y-0.5">
              <span className="text-sm font-bold text-[#1F3D2B]">Gunung Putri</span>
              <span className="text-[10px] items-center font-medium text-muted-foreground tracking-wider uppercase">Admin Panel</span>
            </div>
          </div>
        </div>

        {/* MAIN MENU */}
        <div className="px-4 flex-1">
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Menu Utama
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  pathname === item.href
                    ? "bg-[#1F3D2B]/10 text-[#1F3D2B] font-semibold hover:bg-[#1F3D2B]/15"
                    : "text-muted-foreground hover:text-[#1F3D2B]"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className={cn("mr-3 h-4 w-4", pathname === item.href ? "text-[#1F3D2B]" : "text-muted-foreground")} />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="px-4 mt-auto">
          <div className="bg-gray-50 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-500">AD</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Administrator</p>
                <p className="text-[10px] text-muted-foreground">admin@gunungputri.id</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Keluar Sesi
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}