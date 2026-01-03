import { Skeleton } from "@/components/ui/skeleton"
import { PublicPageContainer } from "@/components/layout/PublicPageContainer"

export default function Loading() {
    return (
        <PublicPageContainer
            title={<Skeleton className="h-8 w-64" />}
            description={<Skeleton className="h-4 w-96 mt-2" />}
            headerAction={<Skeleton className="h-10 w-32 rounded-xl" />}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: INFO */}
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="aspect-video w-full rounded-2xl" />
                    <div className="p-6 border rounded-2xl space-y-4">
                        <Skeleton className="h-6 w-1/2" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <Skeleton className="h-10 w-full rounded-xl mt-4" />
                    </div>
                </div>

                {/* RIGHT: PRODUCTS */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-8 w-24" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
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
        </PublicPageContainer>
    )
}
