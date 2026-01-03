import { Skeleton } from "@/components/ui/skeleton"
import { PublicPageContainer } from "@/components/layout/PublicPageContainer"

export default function Loading() {
    return (
        <PublicPageContainer
            title="Katalog Warga"
            description={<Skeleton className="h-6 w-96 max-w-full" />}
            headerAction={<Skeleton className="h-10 w-full sm:w-[300px] rounded-xl" />}
        >
            <div className="flex flex-col md:flex-row gap-8">

                {/* SIDEBAR SKELETON */}
                <aside className="w-full md:w-64 shrink-0 hidden md:block space-y-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full rounded-xl" />
                        ))}
                    </div>
                </aside>

                {/* MAIN GRID SKELETON */}
                <main className="flex-1">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="aspect-square rounded-xl w-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <Skeleton className="h-5 w-1/3 mt-2" />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </PublicPageContainer>
    )
}
