"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { COPY } from "@/lib/copywritting"
import { Category } from "@prisma/client" // Import type dari Prisma

interface SearchCategorySectionProps {
  categories: Category[] // Menerima data dari server
}

export function SearchCategorySection({ categories }: SearchCategorySectionProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/produk?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  // Ambil category dari URL (slug)
  const currentCategorySlug = searchParams.get("category") || "all"

  // Gabungkan opsi "Semua" dengan data dari database
  const categoryList = [
    { id: "all", name: "Semua", slug: "all" },
    ...categories
  ]

  return (
    <section id="search-section" className="bg-[#F4F1EC] py-12 md:py-16 border-b border-[#E6E3DF]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8 text-center">

          {/* 1. SEARCH BAR */}
          <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-[#1F3D2B] transition-colors" />
              <Input
                type="search"
                placeholder={COPY.SEARCH.PLACEHOLDER}
                className="w-full h-14 pl-12 rounded-full border-2 border-transparent bg-white shadow-sm ring-offset-0 focus-visible:ring-0 focus-visible:border-[#1F3D2B] text-base transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-2 top-2 h-10 px-6 rounded-full bg-[#1F3D2B] hover:bg-[#1F3D2B]/90 text-white"
              >
                Cari
              </Button>
            </div>
          </form>

          {/* 2. CATEGORY PILLS (Dynamic from DB) */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Kategori Pilihan</p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categoryList.map((cat) => {
                // Cek aktif berdasarkan slug
                const isActive = currentCategorySlug === cat.slug

                return (
                  <Button
                    key={cat.id}
                    variant="ghost"
                    onClick={() => router.push(cat.slug === "all" ? "/produk" : `/produk?category=${cat.slug}`)}
                    className={cn(
                      "rounded-full px-6 h-10 text-sm font-medium transition-all border",
                      isActive
                        ? "bg-[#1F3D2B] text-white border-[#1F3D2B] hover:bg-[#1F3D2B] hover:text-white"
                        : "bg-white text-[#1C1C1C] border-[#E6E3DF] hover:border-[#1F3D2B] hover:text-[#1F3D2B]"
                    )}
                  >
                    {cat.name}
                  </Button>
                )
              })}
            </div>
            <p className="text-sm text-muted-foreground/80">{COPY.SEARCH.HELPER}</p>
          </div>

        </div>
      </div>
    </section>
  )
}