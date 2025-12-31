"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteProduct } from "../actions/ProductActions"
import { toast } from "sonner"
import { useTransition } from "react"

export function DeleteProductButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm("Yakin mau hapus produk ini?")) {
        startTransition(async () => {
            await deleteProduct(id)
            toast.success("Produk dihapus")
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