import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen animate-pulse">
            {/* HERO SKELETON */}
            <div className="container mx-auto px-4 md:px-6 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-8">
                        <Skeleton className="h-8 w-64 rounded-full" />
                        <div className="space-y-4">
                            <Skeleton className="h-16 w-3/4 sm:w-full" />
                            <Skeleton className="h-16 w-1/2 sm:w-3/4" />
                        </div>
                        <Skeleton className="h-6 w-full max-w-md" />
                        <div className="flex gap-4 pt-2">
                            <Skeleton className="h-12 w-40 rounded-full" />
                            <Skeleton className="h-12 w-40 rounded-full" />
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <Skeleton className="w-full aspect-square rounded-[2.5rem]" />
                    </div>
                </div>
            </div>

            {/* SEARCH CATEGORY SKELETON */}
            <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-24 w-full rounded-xl" />
            </div>

            {/* PRODUCTS SKELETON */}
            <div className="container mx-auto px-4 py-16 space-y-8">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="aspect-square rounded-xl w-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
