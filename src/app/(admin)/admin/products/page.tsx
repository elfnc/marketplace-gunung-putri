import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { PlusCircle, Trash2 } from "lucide-react"
import { AdminProductForm } from "@/features/products/components/AdminProductForm"
import { DeleteProductButton } from "@/features/products/components/DeleteProductButton" // Buat file ini mirip UMKM

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { umkm: true },
    orderBy: { createdAt: 'desc' }
  })
  
  const umkms = await prisma.umkm.findMany({ select: { id: true, name: true } })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kelola Produk</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Tambah Produk Baru</DialogTitle>
            </DialogHeader>
            <AdminProductForm umkms={umkms} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Produk</TableHead>
              <TableHead>UMKM</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.umkm.name}</TableCell>
                <TableCell>
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(p.price))}
                </TableCell>
                <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {p.isActive ? 'Aktif' : 'Draft'}
                    </span>
                </TableCell>
                <TableCell className="text-right">
                   <DeleteProductButton id={p.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}