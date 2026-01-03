import { Skeleton } from "@/components/ui/skeleton"
import { PublicPageContainer } from "@/components/layout/PublicPageContainer"

export default function Loading() {
    return (
        <PublicPageContainer
            title="Warga Berniaga"
            description={<Skeleton className="h-6 w-80 max-w-full" />}
            headerAction={<Skeleton className="h-10 w-full sm:w-[300px] rounded-xl" />}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="p-4 rounded-xl border space-y-4">
                        {/* Cover Image & Avatar */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                        {/* Content */}
                        <div className="space-y-2 pt-2">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-full" />
                        </div>
                        {/* Footer */}
                        <div className="pt-2 flex gap-2">
                            <Skeleton className="h-8 w-full rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </PublicPageContainer>
    )
}
