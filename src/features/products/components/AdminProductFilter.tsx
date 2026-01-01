"use client"

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

interface UmkmOption {
  id: string
  name: string
}

export function AdminProductFilter({ umkms }: { umkms: UmkmOption[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentUmkm = searchParams.get("umkmId") || "all"

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === "all") {
      params.delete("umkmId")
    } else {
      params.set("umkmId", value)
    }
    
    // Reset page ke 1 setiap ganti filter
    params.set("page", "1")
    
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="w-[200px]">
      <Select value={currentUmkm} onValueChange={handleFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter UMKM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua UMKM</SelectItem>
          {umkms.map((u) => (
            <SelectItem key={u.id} value={u.id}>
              {u.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}