"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { COPY } from "@/lib/copywritting";
import { MobileMenu } from "./navbar/MobileMenu";
import { Logo } from "../brand/logo";
import { NavLinks } from "./navbar/NavLink";
import { getWhatsAppLink } from "@/lib/utils";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E6E3DF] supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto h-18 px-4 md:px-6 flex items-center justify-between">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Hamburger (Hidden on Desktop) */}
          <MobileMenu />
          
          {/* LOGO AREA (Polished) */}
          <Link href="/" className="flex items-center gap-2.5 group hover:opacity-95 transition-all">
            {/* Icon Container */}
            <div className="h-10 w-10 bg-[#1F3D2B]/5 border border-[#1F3D2B]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1F3D2B]/10 transition-colors">
               <Logo className="h-6 w-6" />
            </div>
            
            {/* Text Stack */}
            <div className="flex flex-col justify-center -space-y-0.5">
               <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80 leading-none">
                 Marketplace
               </span>
               <span className="text-lg font-bold text-[#1F3D2B] tracking-tight leading-none">
                 Gunung Putri<span className="text-[#C56A4A]">.</span>
               </span>
            </div>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <NavLinks className="hidden md:flex" />
        </div>

        {/* RIGHT SECTION (CTA & Cart) */}
        <div className="flex items-center gap-3">
          
          {/* CTA: Growth Lever */}
          <Button 
            className="bg-[#1F3D2B] hover:bg-[#1F3D2B]/90 text-white rounded-full font-medium text-xs md:text-sm px-4 md:px-5 h-9 md:h-10 shadow-sm transition-all hover:scale-105"
            asChild
          >
            <Link href={getWhatsAppLink(COPY.WA_TEMPLATE.REGISTER)} target="_blank">
                <span className="md:hidden">Daftar</span>
                <span className="hidden md:inline">Daftarkan UMKM</span>
            </Link>
          </Button>

          {/* Cart Icon */}
          <Link href="/cart" className="relative group p-2.5 rounded-full hover:bg-secondary transition-colors">
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-[#1C1C1C] group-hover:text-[#1F3D2B] transition-colors" />
            {/* Badge Dummy (Nanti diganti logic cart) */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#C56A4A] ring-2 ring-white" />
          </Link>

        </div>
      </div>
    </header>
  )
}