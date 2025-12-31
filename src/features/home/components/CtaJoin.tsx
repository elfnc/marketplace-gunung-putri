import { Button } from "@/components/ui/button"
import Link from "next/link"
import { COPY } from "@/lib/copywritting" // Import
import { getWhatsAppLink } from "@/lib/utils"

export function CtaRegister() {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-5xl bg-[#1F3D2B] rounded-3xl overflow-hidden relative shadow-2xl">
                {/* Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10 p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            {COPY.CTA_REGISTER.HEADLINE}
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
                            {COPY.CTA_REGISTER.SUBHEADLINE}
                        </p>
                    </div>
                    <div className="shrink-0 flex flex-col items-center gap-2">
                        <Button size="lg" variant="secondary" className="rounded-full px-8 h-12 text-[#1F3D2B] font-bold hover:bg-white transition-transform hover:scale-105" asChild>
                            <Link href={getWhatsAppLink(COPY.WA_TEMPLATE.REGISTER)} target="_blank">
                                {COPY.CTA_REGISTER.BUTTON}
                            </Link>
                        </Button>
                        <span className="text-white/60 text-xs">{COPY.CTA_REGISTER.HELPER}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}