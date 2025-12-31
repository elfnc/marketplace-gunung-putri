"use server"

import { prisma } from "@/lib/prisma";
import { UmkmFormValues, umkmSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

// CREATE
export async function createUmkm(data: UmkmFormValues){  
    const validated = umkmSchema.safeParse(data)
    if(!validated.success){
        return { error: "Data tidak valid" }
    }

    try {
        await prisma.umkm.create({
            data: validated.data
        })

        revalidatePath("/admin/umkm")
        return { success: true }
    } catch (error) {
        console.error("Gagal create UMKM:", error)
        return { error: "Gagal menyimpan. Cek apakah slug sudah dipakai?"}
    }
}

// DELETE
export async function deleteUmkm(id: string) {
  try {
    await prisma.umkm.delete({ where: { id } })
    revalidatePath("/admin/umkm")
    return { success: true }
  } catch (error) {
    return { error: "Gagal menghapus UMKM" }
  }
}