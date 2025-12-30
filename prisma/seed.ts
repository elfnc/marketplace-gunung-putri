import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs' // Pastikan install: npm i bcryptjs && npm i -D @types/bcryptjs

const prisma = new PrismaClient()

async function main() {
  // 1. Create Admin
  const password = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gunungputri.com' },
    update: {},
    create: {
      email: 'admin@gunungputri.com',
      name: 'Super Admin',
      password,
      role: 'ADMIN',
    },
  })

  // 2. Create Categories
  const catKuliner = await prisma.category.upsert({
    where: { slug: 'kuliner' },
    update: {},
    create: { name: 'Kuliner', slug: 'kuliner' },
  })

  // 3. Create UMKM
  const umkm = await prisma.umkm.upsert({
    where: { slug: 'warung-bu-sri' },
    update: {},
    create: {
      name: 'Warung Bu Sri',
      slug: 'warung-bu-sri',
      description: 'Nasi uduk legendaris di perempatan.',
      phone: '6281234567890',
      categoryId: catKuliner.id,
      products: {
        create: [
          {
            name: 'Nasi Uduk Spesial',
            slug: 'nasi-uduk-spesial',
            price: 15000,
            description: 'Lengkap dengan telor dadar dan orek.',
          },
          {
            name: 'Gorengan Bakwan',
            slug: 'gorengan-bakwan',
            price: 2000,
          }
        ]
      }
    },
  })

  console.log({ admin, umkm })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })