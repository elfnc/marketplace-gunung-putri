"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

// Schema Validasi
const eventSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  imageUrl: z.string().optional().or(z.literal("")),
  location: z.string().optional(),
  startDate: z.string(),
  isActive: z.boolean().optional(),
})

export async function createEvent(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl"),
    location: formData.get("location"),
    startDate: formData.get("startDate"),
    isActive: formData.get("isActive") === "on",
  }

  const result = eventSchema.safeParse(rawData)

  if (!result.success) {
    return { error: "Data tidak valid" }
  }

  const data = result.data

  // Buat Slug Otomatis dari Title
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") + "-" + Date.now().toString().slice(-4)

  try {
    await prisma.event.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || "",
        content: data.content,
        imageUrl: data.imageUrl || null,
        location: data.location || null,
        startDate: new Date(data.startDate),
        isActive: data.isActive ?? true,
      },
    })
  } catch (error) {
    console.error(error)
    return { error: "Gagal menyimpan event" }
  }

  revalidatePath("/events")
  redirect("/admin/events") // Redirect ke list admin
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } })
    revalidatePath("/admin/events")
    revalidatePath("/events") // Update halaman public juga
  } catch (error) {
    console.error("Gagal hapus event:", error)
    return { error: "Gagal menghapus event" }
  }
}

// 👇 ACTION BARU: TOGGLE STATUS (Aktif/Nonaktif)
export async function toggleEventStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.event.update({
      where: { id },
      data: { isActive: !currentStatus }
    })
    revalidatePath("/admin/events")
    revalidatePath("/events")
  } catch (error) {
    console.error("Gagal update status:", error)
    return { error: "Gagal mengubah status" }
  }
}