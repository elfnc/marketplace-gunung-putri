"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteUmkm } from "../actions/UmkmActions"
import { toast } from "sonner"
import { useTransition } from "react"

export function DeleteUmkmButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm("Yakin mau hapus UMKM ini? Produk di dalamnya juga akan terhapus!")) {
        startTransition(async () => {
            await deleteUmkm(id)
            toast.success("UMKM dihapus")
        })
    }
  }

  return (
    <Button 
        variant="ghost" 
        size="icon" 
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={handleDelete}
        disabled={isPending}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}