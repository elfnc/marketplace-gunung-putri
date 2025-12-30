import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      {/* Ubah h-[250px] jadi h-64 (256px) biar standar */}
      <Skeleton className="h-64 w-full rounded-xl bg-secondary" />
      <div className="space-y-2 px-1">
        <Skeleton className="h-4 w-3/4 bg-secondary" />
        <Skeleton className="h-4 w-1/2 bg-secondary" />
      </div>
    </div>
  )
}