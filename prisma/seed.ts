import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

// Helper: Generate placeholder image yang rapi & estetik
// Warna diambil dari palet brand: Primary, Accent, Dark, dll.
const colors = ['1F3D2B', 'C56A4A', '333333', '2563EB', 'D97706', '5F6F65']

function getPlaceholder(text: string) {
  const bg = colors[Math.floor(Math.random() * colors.length)]
  const fg = 'FFFFFF' // Teks putih biar kontras
  // Ganti spasi dengan + agar valid di URL
  const encodedText = text.replace(/\s+/g, '+')
  return `https://placehold.co/600x400/${bg}/${fg}/png?text=${encodedText}`
}

async function main() {
  console.log('🌱 Start seeding with Placeholders...')

  // 1. CLEANUP (Hapus data lama)
  await prisma.product.deleteMany()
  await prisma.umkm.deleteMany()
  await prisma.category.deleteMany()
  
  console.log('🧹 Database cleaned')

  // 2. SEED CATEGORIES
  const catKuliner = await prisma.category.create({ data: { name: 'Kuliner', slug: 'kuliner' } })
  const catFashion = await prisma.category.create({ data: { name: 'Fashion', slug: 'fashion' } })
  const catJasa = await prisma.category.create({ data: { name: 'Jasa', slug: 'jasa' } })
  const catKerajinan = await prisma.category.create({ data: { name: 'Kerajinan', slug: 'kerajinan' } })
  const catPertanian = await prisma.category.create({ data: { name: 'Pertanian', slug: 'pertanian' } })

  console.log('✅ Categories created')

  // 3. SEED UMKM
  const umkm1 = await prisma.umkm.create({
    data: {
      name: 'Dapur Bu Siska',
      slug: slugify('Dapur Bu Siska'),
      description: 'Menyediakan aneka masakan rumahan, nasi box, dan tumpeng. Lokasi di Griya Bukit Jaya.',
      phone: '6281299887766',
      address: 'Perum Griya Bukit Jaya Blok F, Gn. Putri',
      categoryId: catKuliner.id,
      isActive: true,
      imageUrl: getPlaceholder('Dapur Bu Siska')
    }
  })

  const umkm2 = await prisma.umkm.create({
    data: {
      name: 'Berkah Laundry',
      slug: slugify('Berkah Laundry'),
      description: 'Cuci kiloan, satuan, karpet, dan sepatu. Bisa antar jemput area Wanaherang.',
      phone: '6285611223344',
      address: 'Jl. Mercedes Benz, Wanaherang',
      categoryId: catJasa.id,
      isActive: true,
      imageUrl: getPlaceholder('Berkah Laundry')
    }
  })

  const umkm3 = await prisma.umkm.create({
    data: {
      name: 'Distro Lokal Pride',
      slug: slugify('Distro Lokal Pride'),
      description: 'Kaos sablon custom dan hoodie kekinian anak muda Cicadas.',
      phone: '6287788990011',
      address: 'Kp. Cicadas RT 02/05',
      categoryId: catFashion.id,
      isActive: true,
      imageUrl: getPlaceholder('Distro Lokal')
    }
  })

  const umkm4 = await prisma.umkm.create({
    data: {
      name: 'Tani Makmur',
      slug: slugify('Tani Makmur'),
      description: 'Jual pupuk kandang, media tanam, dan bibit tanaman hias.',
      phone: '6281344556677',
      address: 'Jl. Tlajung Udik No. 45',
      categoryId: catPertanian.id,
      isActive: true,
      imageUrl: getPlaceholder('Tani Makmur')
    }
  })

  console.log('✅ UMKMs created')

  // 4. SEED PRODUCTS
  const products = [
    // UMKM 1 (Dapur Bu Siska)
    { name: 'Nasi Uduk Komplit', price: 15000, umkmId: umkm1.id, desc: 'Nasi uduk dengan bihun, orek tempe, telur balado.' },
    { name: 'Paket Nasi Box', price: 25000, umkmId: umkm1.id, desc: 'Cocok untuk acara syukuran dan jumat berkah.' },
    { name: 'Tumpeng Mini', price: 35000, umkmId: umkm1.id, desc: 'Tumpeng nasi kuning cantik untuk ulang tahun.' },

    // UMKM 2 (Berkah Laundry)
    { name: 'Cuci Komplit /kg', price: 7000, umkmId: umkm2.id, desc: 'Cuci + Gosok rapi wangi. Selesai 2 hari.' },
    { name: 'Cuci Sepatu Deep Clean', price: 35000, umkmId: umkm2.id, desc: 'Perawatan khusus sepatu canvas dan sneakers.' },
    { name: 'Cuci Bed Cover Besar', price: 25000, umkmId: umkm2.id, desc: 'Laundry bed cover king size wangi tahan lama.' },

    // UMKM 3 (Distro)
    { name: 'Kaos Polos 30s', price: 45000, umkmId: umkm3.id, desc: 'Bahan cotton combed 30s adem menyerap keringat.' },
    { name: 'Hoodie Zipper Black', price: 120000, umkmId: umkm3.id, desc: 'Jaket hoodie simpel warna hitam pekat.' },

    // UMKM 4 (Tani Makmur)
    { name: 'Media Tanam 5kg', price: 15000, umkmId: umkm4.id, desc: 'Campuran tanah lembang, sekam, dan pupuk.' },
    { name: 'Bibit Cabai Rawit', price: 5000, umkmId: umkm4.id, desc: 'Bibit dalam polybag siap tanam.' },
    { name: 'Pupuk Kandang', price: 10000, umkmId: umkm4.id, desc: 'Pupuk organik untuk menyuburkan tanah.' }
  ]

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: slugify(p.name) + '-' + Math.floor(Math.random() * 1000),
        description: p.desc,
        price: p.price,
        umkmId: p.umkmId,
        imageUrl: getPlaceholder(p.name),
        isActive: true
      }
    })
  }

  console.log(`✅ ${products.length} Products created`)
  console.log('🎉 Seeding completed.')
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