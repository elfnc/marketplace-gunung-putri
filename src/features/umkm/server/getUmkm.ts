import { prisma } from "@/lib/prisma"

export async function getFeaturedUmkms() {
  try {
    const umkms = await prisma.umkm.findMany({
      take: 6, // Tampilkan 6 UMKM pilihan
      where: {
        isActive: true,
      },
      include: {
        category: true,
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        createdAt: 'desc' // Atau bisa random nanti
      }
    })

    return umkms
  } catch (error) {
    console.error("Error fetching umkms:", error)
    return []
  }
}