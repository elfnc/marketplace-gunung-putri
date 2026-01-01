"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function ProductSearch() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  
  // Local state untuk input value biar responsif saat ngetik
  const [value, setValue] = useState(searchParams.get("search")?.toString() || "")

  // Sinkronisasi kalau URL berubah dari luar (misal tombol reset)
  useEffect(() => {
    setValue(searchParams.get("search")?.toString() || "")
  }, [searchParams])

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    
    // Reset page ke 1 kalau search berubah
    params.set("page", "1")
    
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    
    replace(`?${params.toString()}`)
  }, 300)

  const clearSearch = () => {
    setValue("")
    handleSearch("")
  }

  return (
    <div className="relative w-full md:w-[300px] lg:w-[400px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari nasi uduk, jasa laundry..."
          className="pl-9 pr-10 rounded-full bg-background border-muted-foreground/20 focus-visible:ring-[#1F3D2B] h-11 transition-all hover:border-muted-foreground/50"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            handleSearch(e.target.value)
          }}
        />
        {value && (
            <Button
                variant="ghost" 
                size="icon"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-secondary text-muted-foreground"
            >
                <X className="h-4 w-4" />
            </Button>
        )}
      </div>
    </div>
  )
}