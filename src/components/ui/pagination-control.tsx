"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface PaginationControlProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
}

export function PaginationControl({ 
  currentPage, 
  totalPages, 
  hasNextPage 
}: PaginationControlProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (newPage: number) => {
    // 1. Ambil params yang sekarang ada (misal: ?category=kuliner&search=nasi)
    const params = new URLSearchParams(searchParams.toString())
    
    // 2. Update halaman
    params.set("page", newPage.toString())
    
    // 3. Push URL baru (scroll ke atas biar enak)
    router.push(`?${params.toString()}`, { scroll: true })
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-full h-10 w-10 border-[#E6E3DF] hover:bg-[#F4F1EC] hover:text-[#1F3D2B]"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm font-medium text-muted-foreground">
        Halaman <span className="text-[#1F3D2B] font-bold">{currentPage}</span> dari {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="rounded-full h-10 w-10 border-[#E6E3DF] hover:bg-[#F4F1EC] hover:text-[#1F3D2B]"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}