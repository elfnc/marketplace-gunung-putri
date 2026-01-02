"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { createEvent } from "@/features/events/server/action" // Import Action tadi

export default function CreateEventPage() {
  const [content, setContent] = useState("")
const [isPending, setIsPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsPending(true) // Set loading state
    
    // Pastikan konten dari Rich Text Editor masuk ke FormData
    // (Meskipun sudah ada hidden input, kadang lebih aman di-set manual jika perlu)
    formData.set("content", content)

    // Panggil Server Action
    const result = await createEvent(formData)

    if (result?.error) {
      // Tampilkan error jika ada
      alert(result.error) // atau toast.error(result.error)
      setIsPending(false)
    } else {
      // Jika sukses, redirect ditangani di server action (action.ts),
      // tapi kita bisa reset loading state jaga-jaga
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-2xl font-bold">Tulis Kabar / Event Baru</h1>
      </div>

      <form action={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-xl border shadow-sm">
        
        {/* Title & Slug (Slug auto di server) */}
        <div className="space-y-2">
          <Label>Judul Artikel / Event</Label>
          <Input name="title" placeholder="Misal: Bazar Murah RW 05" required className="text-lg font-medium" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label>Ringkasan (Excerpt)</Label>
          <Textarea 
            name="excerpt" 
            placeholder="Tulis ringkasan pendek untuk tampilan di kartu depan..." 
            className="resize-none h-20"
          />
        </div>

        {/* Rich Editor */}
        <div className="space-y-2">
          <Label>Konten Lengkap</Label>
          {/* Hidden input untuk kirim data rich text ke server action */}
          <input type="hidden" name="content" value={content} />
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
                <Label>Tanggal Mulai</Label>
                <Input type="datetime-local" name="startDate" required />
            </div>
            <div className="space-y-2">
                <Label>Lokasi (Opsional)</Label>
                <Input name="location" placeholder="Balai Warga, Lapangan, dll" />
            </div>
        </div>

        <div className="space-y-2">
            <Label>URL Gambar Banner</Label>
            <Input name="imageUrl" placeholder="https://..." />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between border p-4 rounded-lg bg-gray-50">
            <div className="space-y-0.5">
                <Label className="text-base">Status Publikasi</Label>
                <p className="text-sm text-muted-foreground">Aktifkan agar langsung muncul di halaman depan.</p>
            </div>
            <Switch name="isActive" defaultChecked />
        </div>

        <div className="pt-4 flex justify-end gap-3">
             <Button type="button" variant="outline">Batal</Button>
             <Button type="submit" className="bg-[#1F3D2B] px-8" disabled={isPending}>
                {isPending ? "Menyimpan..." : "Terbitkan"}
             </Button>
        </div>
      </form>
    </div>
  )
}