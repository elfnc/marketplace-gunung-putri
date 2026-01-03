import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen pb-12 animate-pulse">
            <div className="container mx-auto px-4 py-4">
                <Skeleton className="h-4 w-32" />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                    {/* GALLERY */}
                    <div className="space-y-4">
                        <Skeleton className="aspect-square rounded-2xl w-full" />
                    </div>

                    {/* INFO */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-8 w-1/3 mt-2" />
                        </div>
                        <Skeleton className="h-px w-full" />

                        <div className="space-y-2">
                            <Skeleton className="h-6 w-24 mb-2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        {/* UMKM WIDGET */}
                        <div className="p-4 border rounded-xl flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-3 w-3/4" />
                            </div>
                        </div>

                        <div className="hidden md:flex gap-3 pt-4">
                            <Skeleton className="h-12 flex-1 rounded-xl" />
                            <Skeleton className="h-12 w-12 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
