import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Ambil semua produk untuk dynamic routes
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true },
  })

  // 2. Base URL
  const baseUrl = 'https://marketplace-gunung-putri.vercel.app'

  // 3. Static Routes
  const routes = [
    '',
    '/produk',
    '/dukung',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  // 4. Dynamic Product Routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/produk/${product.slug}`,
    lastModified: product.updatedAt,
  }))

  return [...routes, ...productRoutes]
}