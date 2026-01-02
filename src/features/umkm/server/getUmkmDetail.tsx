import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export async function getUmkmBySlug(slug: string) {
  const umkm = await prisma.umkm.findUnique({
    where: { 
        slug,
        isActive: true // Hanya tampilkan UMKM aktif
    },
    include: {
      category: true,
      products: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        // Kita perlu include umkm lagi di dalam product buat props ProductCard
        include: { 
            umkm: {
                include: { category: true }
            } 
        } 
      }
    }
  })

  if (!umkm) return null

  return umkm
}