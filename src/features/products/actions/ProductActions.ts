"use server"

import { prisma } from "@/lib/prisma"
import { productSchema, ProductFormValues } from "@/lib/schemas"
import { revalidatePath } from "next/cache"

export async function createProduct(data: ProductFormValues) {
  const validated = productSchema.safeParse(data)
  if (!validated.success) return { error: "Data invalid" }

  try {
    await prisma.product.create({
      data: validated.data
    })
    revalidatePath("/admin/products")
    revalidatePath("/") // Refresh home juga biar produk baru muncul
    revalidatePath("/produk") // Refresh list produk
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Gagal membuat produk" }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } })
    revalidatePath("/admin/products")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Gagal hapus produk" }
  }
}