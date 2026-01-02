"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/produk", label: "Produk" },
  { href: "/umkm", label: "UMKM" },
  { href: "/events", label: "Event" },
  { href: "/tentang", label: "Tentang" },
]

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {links.map((link) => {
        // Cek apakah link aktif (exact match atau nested)
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-[#1F3D2B]",
              isActive 
                ? "text-[#1F3D2B] font-semibold"  // Active: Green & Bold
                : "text-[#1C1C1C]/80"             // Inactive: Neutral Dark
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}