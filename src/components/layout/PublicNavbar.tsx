"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        {/* LOGO */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold text-primary tracking-tight">
            Gunung Putri<span className="text-accent">.</span>
          </span>
        </Link>

        {/* SEARCH BAR (Desktop) */}
        <div className="hidden flex-1 md:flex md:max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari jajanan, katering, jasa..."
              className="w-full bg-card pl-9 rounded-full focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <span className="sr-only">Cart</span>
            {/* Badge Count Dummy */}
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive animate-pulse" />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex gap-2">
             {/* Nanti diisi logic login user kalau ada */}
          </div>
        </div>
      </div>
    </header>
  )
}