"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { umkmSchema, UmkmFormValues } from "@/lib/schemas"
import { createUmkm, updateUmkm } from "../actions/UmkmActions"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { generateSlug } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription
} from "@/components/ui/form"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Umkm } from "@prisma/client"
import { ImageUpload } from "@/components/shared/image-upload"

interface Category {
  id: string;
  name: string;
}

interface AdminUmkmFormProps {
  categories: Category[]
  onSuccess?: () => void
  initialData?: Umkm | null
}

export function AdminUmkmForm({ categories, onSuccess, initialData }: AdminUmkmFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Hapus generic <UmkmFormValues> biar inference jalan otomatis
  const form = useForm({
    resolver: zodResolver(umkmSchema),
    defaultValues: {
      // Jika initialData ada, pakai valuenya. Jika tidak, pakai default kosong.
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      phone: initialData?.phone || "628",
      address: initialData?.address || "",
      operationalHours: initialData?.operationalHours || "",
      imageUrl: initialData?.imageUrl || "",
      categoryId: initialData?.categoryId || "",
      isActive: initialData?.isActive ?? true,
    }
  })

  // Sync form with initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        slug: initialData.slug,
        description: initialData.description,
        phone: initialData.phone,
        address: initialData.address || "",
        operationalHours: initialData.operationalHours || "",
        imageUrl: initialData.imageUrl || "",
        categoryId: initialData.categoryId,
        isActive: initialData.isActive,
      })
    }
  }, [initialData, form])

  // Helper untuk handle auto slug saat nama diketik
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value
    form.setValue("name", nameValue)
    // Auto set slug jika slug masih kosong atau user sedang mengetik nama baru
    const slug = generateSlug(nameValue)
    form.setValue("slug", slug)
  }

  async function onSubmit(data: UmkmFormValues) {
    setIsLoading(true)
    let result;

    if (initialData) {
      // MODE EDIT
      result = await updateUmkm(initialData.id, data)
    } else {
      // MODE CREATE
      result = await createUmkm(data)
    }

    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(initialData ? "UMKM Diupdate!" : "UMKM Dibuat!")
      if (!initialData) form.reset() // Reset cuma kalau create
      if (onSuccess) onSuccess()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* ROW 1: Nama & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama UMKM</FormLabel>
                <FormControl>
                  <Input placeholder="Warung Bu Sri" {...field} onChange={handleNameChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="warung-bu-sri" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ROW 2: Kategori & Telepon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp (62...)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Lengkap</FormLabel>
              <FormControl>
                <Textarea placeholder="Jl. Raya Gunung Putri No..." className="h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="operationalHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jam Operasional</FormLabel>
              <FormControl>
                <Textarea placeholder="Contoh: Senin - Minggu (08:00 - 21:00)" className="h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Singkat</FormLabel>
              <FormControl>
                <Textarea placeholder="Jualan nasi uduk enak..." className="h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto (Opsional)</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(url) => field.onChange(url)}
                  disabled={isLoading}
                  label="Upload Foto UMKM"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* STATUS ACTIVE CHECKBOX */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 bg-secondary/20">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Status Aktif</FormLabel>
                <FormDescription>
                  Jika dimatikan, UMKM tidak akan muncul di halaman publik.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : (initialData ? "Update Data UMKM" : "Simpan Data UMKM")}
        </Button>
      </form>
    </Form>
  )
}