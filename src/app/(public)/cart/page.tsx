"use client"

import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, MessageCircle, Store, ArrowLeft, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { formatRupiah, getWhatsAppLink } from "@/lib/utils"
import { CartItem, useCartStore } from "@/features/cart/store/useCartStore"
import { Motion } from "@/components/shared/Motion"
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null // Prevent hydration error

  // 1. GROUPING ITEMS BY UMKM
  // Hasil: { "umkmId1": [item1, item2], "umkmId2": [item3] }
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.umkmId]) {
      acc[item.umkmId] = []
    }
    acc[item.umkmId].push(item)
    return acc
  }, {} as Record<string, CartItem[]>)

  // 2. GENERATE WA MESSAGE
  const handleCheckout = (umkmId: string, umkmName: string, umkmPhone: string, items: CartItem[]) => {
    const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)

    let message = `Halo ${umkmName}, saya mau pesan via Marketplace Gunung Putri:\n\n`
    items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name} (${item.quantity}x) - ${formatRupiah(item.price * item.quantity)}\n`
    })
    message += `\n*Total: ${formatRupiah(totalPrice)}*`
    message += `\n\nMohon info pembayaran dan pengirimannya ya. Terima kasih!`

    const link = getWhatsAppLink(message, umkmPhone)
    window.open(link, '_blank')
  }

  if (items.length === 0) {
    return (
      <Motion
        className="container min-h-[60vh] flex flex-col items-center justify-center text-center"
        initial="hidden"
        animate="visible"
        variants={scaleIn}
      >
        <div className="bg-secondary/30 p-6 rounded-full mb-4">
          <ShoppingCart className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <h2 className="text-xl font-bold text-[#1C1C1C]">Keranjang Masih Kosong</h2>
        <p className="text-muted-foreground mt-2 mb-8">Yuk dukung UMKM sekitar dengan jajan produk mereka.</p>
        <Button asChild className="rounded-full bg-[#1F3D2B]">
          <Link href="/produk">Jelajahi Produk</Link>
        </Button>
      </Motion>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 max-w-4xl min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="h-6 w-6" /> Keranjang Belanja
      </h1>

      <Motion
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {Object.keys(groupedItems).map((umkmId) => {
          const group = groupedItems[umkmId]
          const umkmName = group[0].umkmName
          const umkmPhone = group[0].umkmPhone
          const subtotal = group.reduce((sum, i) => sum + (i.price * i.quantity), 0)

          return (
            <Motion key={umkmId} variants={fadeInUp} className="border rounded-xl overflow-hidden bg-white shadow-sm" as="div">
              {/* HEADER UMKM */}
              <div className="bg-secondary/30 p-4 border-b flex items-center gap-2">
                <Store className="h-4 w-4 text-[#1F3D2B]" />
                <span className="font-semibold text-[#1F3D2B]">{umkmName}</span>
              </div>

              {/* ITEM LIST */}
              <div className="p-4 space-y-4">
                {group.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Image */}
                    <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-md overflow-hidden bg-secondary border shrink-0">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-secondary" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-sm md:text-base line-clamp-1">{item.name}</h4>
                        <p className="text-sm font-bold text-[#1F3D2B]">{formatRupiah(item.price)}</p>
                      </div>
                    </div>

                    {/* Actions (Qty & Delete) */}
                    <div className="flex flex-col items-end justify-between gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2 bg-secondary/20 rounded-lg p-1">
                        <Button
                          variant="ghost" size="icon" className="h-6 w-6 rounded-md"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost" size="icon" className="h-6 w-6 rounded-md"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER CHECKOUT PER UMKM */}
              <div className="p-4 bg-secondary/10 border-t flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Subtotal untuk toko ini: <span className="text-lg font-bold text-[#1C1C1C] ml-1">{formatRupiah(subtotal)}</span>
                </div>
                <Button
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold shadow-sm w-full md:w-auto"
                  onClick={() => handleCheckout(umkmId, umkmName, umkmPhone, group)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Checkout ke WhatsApp
                </Button>
              </div>
            </Motion>
          )
        })}
      </Motion>

      <div className="mt-8">
        <Button variant="link" asChild className="text-muted-foreground pl-0">
          <Link href="/produk"><ArrowLeft className="mr-2 h-4 w-4" /> Lanjut Belanja</Link>
        </Button>
      </div>
    </div>
  )
}