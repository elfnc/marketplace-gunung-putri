import { prisma } from "@/lib/prisma"

const ITEMS_PER_PAGE = 12

export interface ProductFilterParams {
  page?: number
  category?: string
  search?: string
}

export async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 8,
      where: {
        isActive: true,
        umkm: { isActive: true }
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
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function getProducts({ page = 1, category, search }: ProductFilterParams) {
  // 1. Build Query Conditions
  const whereClause: any = {
    isActive: true,
    umkm: { isActive: true }
  }

  // Logic filter Kategori (tetap menjaga isActive: true punya UMKM)
  if (category && category !== "all") {
    whereClause.umkm = {
      ...whereClause.umkm,
      category: {
        slug: category
      }
    }
  }

  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { umkm: { name: { contains: search, mode: 'insensitive' } } }
    ]
  }

  // 2. Transaction: Get Data & Total Count (Parallel)
  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      where: whereClause,
      include: {
        umkm: {
          include: { category: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.count({ where: whereClause })
  ])

  return {
    products,
    metadata: {
      hasNextPage: page * ITEMS_PER_PAGE < totalCount,
      totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
      totalCount,
      // Tambahkan ini biar dipake di pagination UI
      currentPage: page 
    }
  }
}

// Helper buat ambil list kategori untuk Sidebar
export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })
}