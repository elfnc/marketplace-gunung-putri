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
      }
    }
  })

  if (!umkm) return null

  return umkm
}