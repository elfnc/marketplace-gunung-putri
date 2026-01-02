import { z } from "zod"

export const umkmSchema = z.object({
  name: z.string().min(3, "Nama UMKM minimal 3 karakter"),
  slug: z.string().min(3, "Slug wajib diisi (unik)"),
  categoryId: z.string().min(1, "Pilih kategori"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  phone: z.string().min(10, "Nomor WA wajib (mis: 628...)").regex(/^62/, "Wajib format 62..."),
  address: z.string().optional(),
  operationalHours: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().default(true),
})


export const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  slug: z.string().min(3, "Slug wajib diisi"),
  description: z.string().optional(),
  price: z.coerce.number().min(100, "Harga minimal 100 perak"), // coerce biar string "10000" jadi number
  umkmId: z.string().min(1, "Wajib pilih UMKM"),
  imageUrl: z.string().optional(),
  isActive: z.boolean().default(true),
})

export type UmkmFormValues = z.infer<typeof umkmSchema>
export type ProductFormValues = z.infer<typeof productSchema>