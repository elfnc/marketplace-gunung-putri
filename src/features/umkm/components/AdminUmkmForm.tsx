"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { umkmSchema, UmkmFormValues } from "@/lib/schemas"
import { createUmkm } from "../actions/UmkmActions"
import { toast } from "sonner"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

interface Category {
  id: string;
  name: string;
}

interface AdminUmkmFormProps {
  categories: Category[]
  onSuccess?: () => void
}

export function AdminUmkmForm({ categories, onSuccess }: AdminUmkmFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<UmkmFormValues>({
    resolver: zodResolver(umkmSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      phone: "628",
      address: "",
      imageUrl: "",
    }
  })

  async function onSubmit(data: UmkmFormValues) {
    setIsLoading(true)
    const result = await createUmkm(data)
    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("UMKM Berhasil Dibuat!")
      form.reset()
      if (onSuccess) onSuccess()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama UMKM</FormLabel>
              <FormControl>
                <Input placeholder="Warung Bu Sri" {...field} 
                  onChange={(e) => {
                    field.onChange(e)
                    // Auto-generate slug sederhana
                    const slug = e.target.value.toLowerCase().replace(/\s+/g, '-')
                    form.setValue("slug", slug)
                  }}
                />
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

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
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
              <FormLabel>WhatsApp (Format 62...)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
                <Textarea placeholder="Jualan nasi uduk enak..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Image URL sementara Manual dulu */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto URL (Opsional)</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : "Simpan UMKM"}
        </Button>
      </form>
    </Form>
  )
}