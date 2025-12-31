"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, ProductFormValues } from "@/lib/schemas"
import { createProduct } from "../actions/ProductActions"
import { toast } from "sonner"
import { useState } from "react"
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

interface UmkmOption {
  id: string;
  name: string;
}

export function AdminProductForm({ umkms, onSuccess }: { umkms: UmkmOption[], onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false)

  // 🟢 FIX: Hapus generic <ProductFormValues> biar inference jalan otomatis
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0, 
      umkmId: "",
      imageUrl: "",
      isActive: true
    }
  })

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true)
    const result = await createProduct(data)
    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Produk berhasil ditambahkan")
      form.reset()
      if (onSuccess) onSuccess()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* UMKM SELECT */}
        <FormField
          control={form.control}
          name="umkmId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih UMKM</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Cari UMKM..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {umkms.map((u) => (
                    <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NAMA */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input placeholder="Nasi Uduk" {...field} 
                  onChange={(e) => {
                    field.onChange(e)
                    const slug = e.target.value.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4)
                    form.setValue("slug", slug)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
            {/* SLUG */}
            <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Slug (Unik)</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* PRICE */}
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Harga (Rp)</FormLabel>
                <FormControl>
                    <Input 
                        type="number" 
                        placeholder="15000"
                        {...field}
                        value={field.value as number} 
                        // Handle perubahan input angka
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        {/* DESKRIPSI */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder="Enak banget..." {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IMAGE */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ACTIVE CHECKBOX */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Tampilkan Produk?
                </FormLabel>
                <FormDescription>
                  Uncheck jika stok habis.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          Simpan Produk
        </Button>
      </form>
    </Form>
  )
}