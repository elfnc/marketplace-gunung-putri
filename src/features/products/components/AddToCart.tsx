"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { CartItem, useCartStore } from "@/features/cart/store/useCartStore"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl?: string | null
    umkmId: string
    umkmName: string
    umkmPhone: string
  }
  className?: string
  variant?: "icon" | "full"
}

export function AddToCartButton({ product, className, variant = "full" }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      umkmId: product.umkmId,
      umkmName: product.umkmName,
      umkmPhone: product.umkmPhone
    }

    addItem(item)
    toast.success("Masuk keranjang! 🛒")
  }

  if (variant === "icon") {
    return (
        <Button 
            variant="outline" 
            size="sm"
            className={cn("gap-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all", className)}
            onClick={handleAdd}
        >
            <Plus className="h-4 w-4" />
            <span>Tambah</span>
        </Button>
    )
  }

  // Variant Full (Responsive: Mobile h-8 text-xs, Desktop h-9 text-sm)
  return (
    <Button 
        onClick={handleAdd} 
        variant="outline"
        className={cn(
            "w-full flex items-center justify-center gap-1.5 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all whitespace-nowrap",
            "h-8 text-xs sm:h-9 sm:text-sm font-semibold rounded-lg", // 👈 RESPONSIVE SIZE
            className
        )}
    >
        <Plus className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" /> 
        Tambah
    </Button>
  )
}