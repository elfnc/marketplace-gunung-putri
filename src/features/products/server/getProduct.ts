import { prisma } from "@/lib/prisma"

// Function untuk mengambil produk (bisa dikembangkan buat filter/pagination)
export async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 8, // Limit 8 produk untuk home page
      where: {
        isActive: true,
        umkm: { isActive: true } // Pastikan UMKM-nya juga aktif
      },
      include: {
        umkm: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}