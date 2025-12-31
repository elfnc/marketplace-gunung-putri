import { prisma } from "@/lib/prisma"
import { AdminUmkmForm } from "@/features/umkm/components/AdminUmkmForm"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { PlusCircle, Trash2 } from "lucide-react"
import { deleteUmkm } from "@/features/umkm/actions/UmkmActions"

// Komponen Client kecil untuk Tombol Delete (biar interaktif)
import { DeleteUmkmButton } from "@/features/umkm/components/DeleteUmkmButton" // Nanti kita buat di bawah

export default async function AdminUmkmPage() {
  // Fetch Data (Server Side)
  const umkms = await prisma.umkm.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })
  
  const categories = await prisma.category.findMany()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kelola UMKM</h1>
        
        {/* ADD BUTTON WITH MODAL */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Tambah UMKM
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah UMKM Baru</DialogTitle>
            </DialogHeader>
            <AdminUmkmForm categories={categories} />
          </DialogContent>
        </Dialog>
      </div>

      {/* DATA TABLE */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama UMKM</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {umkms.map((umkm) => (
              <TableRow key={umkm.id}>
                <TableCell className="font-medium">{umkm.name}</TableCell>
                <TableCell>{umkm.category.name}</TableCell>
                <TableCell>{umkm.phone}</TableCell>
                <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${umkm.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {umkm.isActive ? 'Aktif' : 'Non-Aktif'}
                    </span>
                </TableCell>
                <TableCell className="text-right">
                  {/* DELETE BUTTON Component */}
                  <DeleteUmkmButton id={umkm.id} />
                </TableCell>
              </TableRow>
            ))}
            {umkms.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        Belum ada data UMKM.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}