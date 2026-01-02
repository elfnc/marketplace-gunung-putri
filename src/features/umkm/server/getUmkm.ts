import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const ITEMS_PER_PAGE = 12

interface GetUmkmsParams {
  page?: number
  search?: string
}

// Function 1: Untuk Halaman List (/umkm) - Pakai Pagination & Search
export async function getUmkms({ page = 1, search }: GetUmkmsParams) {
  const where: Prisma.UmkmWhereInput = {
    isActive: true,
    ...(search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        // Bisa tambah search by category name kalau mau
        { category: { name: { contains: search, mode: "insensitive" } } }
      ]
    } : {})
  }

  const [umkms, totalCount] = await prisma.$transaction([
    prisma.umkm.findMany({
      where,
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      include: {
        category: true,
        // Kita ambil 1 produk yang punya gambar untuk jadi "Cover Toko"
        products: {
          take: 1,
          where: { imageUrl: { not: null }, isActive: true },
          orderBy: { createdAt: 'desc' },
          select: { imageUrl: true }
        },
        _count: {
            select: { products: true }
        }
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.umkm.count({ where })
  ])

  return {
    umkms,
    metadata: {
      totalCount,
      totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
      currentPage: page,
      hasNextPage: page * ITEMS_PER_PAGE < totalCount,
    }
  }
}

// Function 2: Untuk Homepage / Sidebar (Function kamu yg lama, saya rapihin dikit)
export async function getFeaturedUmkms() {
  try {
    const umkms = await prisma.umkm.findMany({
      take: 6,
      where: {
        isActive: true,
      },
      include: {
        category: true,
        // Tetap ambil 1 produk image buat jaga-jaga kalau mau nampilin cover di homepage juga
        products: {
            take: 1,
            where: { imageUrl: { not: null } },
            select: { imageUrl: true }
        },
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return umkms
  } catch (error) {
    console.error("Error fetching umkms:", error)
    return []
  }
}