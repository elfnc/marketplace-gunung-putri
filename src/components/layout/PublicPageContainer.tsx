import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PublicPageContainerProps {
    title: ReactNode
    description?: ReactNode
    headerAction?: ReactNode
    children: ReactNode
    className?: string
}

export function PublicPageContainer({
    title,
    description,
    headerAction,
    children,
    className
}: PublicPageContainerProps) {
    return (
        <div className="min-h-screen bg-[#F4F1EC]/30">
            <div className={cn("container mx-auto px-4 py-8 md:px-6", className)}>

                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-border/60">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-[#1C1C1C]">
                            {title}
                        </h1>
                        {description && (
                            <div className="text-muted-foreground text-base max-w-xl leading-relaxed">
                                {description}
                            </div>
                        )}
                    </div>

                    {/* ACTION / SEARCH */}
                    {headerAction && (
                        <div className="w-full md:w-auto">
                            {headerAction}
                        </div>
                    )}
                </div>

                {/* MAIN CONTENT */}
                <main>
                    {children}
                </main>

            </div>
        </div>
    )
}
