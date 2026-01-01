import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Jangan index halaman admin
    },
    sitemap: 'https://marketplace-gunung-putri.vercel.app/sitemap.xml',
  }
}