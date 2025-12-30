import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { 
        slug,
        isActive: true 
    },
    include: {
      umkm: {
        include: { category: true } // Ambil kategori UMKM juga
      }
    }
  })

  if (!product) return null

  return product
}

// Function bonus: Ambil produk terkait (Related Products)
export async function getRelatedProducts(categoryId: string, currentProductId: string) {
    return await prisma.product.findMany({
        where: {
            umkm: { categoryId },
            id: { not: currentProductId }, // Jangan tampilkan produk yang sedang dibuka
            isActive: true
        },
        take: 4,
        include: { umkm: { include: { category: true } } }
    })
}