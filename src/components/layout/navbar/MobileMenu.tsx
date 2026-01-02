"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { useState } from "react"
import { getWhatsAppLink } from "@/lib/utils"
import { COPY } from "@/lib/copywritting"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden -ml-2">
          <Menu className="h-6 w-6 text-[#1C1C1C]" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle><Logo /></SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <Link href="/produk" onClick={() => setOpen(false)} className="text-lg font-medium p-2 hover:bg-secondary rounded-md">
            Produk
          </Link>
          <Link href="/umkm" onClick={() => setOpen(false)} className="text-lg font-medium p-2 hover:bg-secondary rounded-md">
            UMKM Lokal
          </Link>
          <Link href="/events" onClick={() => setOpen(false)} className="text-lg font-medium p-2 hover:bg-secondary rounded-md">
            Event & Bazar
          </Link>
          <Link href="/tentang" onClick={() => setOpen(false)} className="text-lg font-medium p-2 hover:bg-secondary rounded-md">
            Tentang Kami
          </Link>
          
          <div className="mt-4 pt-4 border-t">
            <Button className="w-full bg-[#1F3D2B] hover:bg-[#1F3D2B]/90" asChild>
                <Link href={getWhatsAppLink(COPY.WA_TEMPLATE.REGISTER)} target="_blank">
        Daftarkan UMKM
    </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}