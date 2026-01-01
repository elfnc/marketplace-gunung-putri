"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { useCartStore } from "@/features/cart/store/useCartStore"

export function CartIndicator() {
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <Link href="/cart" className="relative group p-2.5 rounded-full hover:bg-secondary transition-colors">
      <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-[#1C1C1C] group-hover:text-[#1F3D2B] transition-colors" />
      
      {mounted && totalItems > 0 && (
        <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#C56A4A] text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white animate-in zoom-in">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  )
}