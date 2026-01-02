import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShieldCheck, MapPin, Zap, Coffee } from "lucide-react"
import { COPY } from "@/lib/copywritting" // 👈 Import Config
import { Motion } from "@/components/shared/Motion"
import { fadeInUp, scaleIn, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations"

export const metadata: Metadata = {
    title: "Tentang Platform - Marketplace Gunung Putri",
    description: "Kenapa marketplace ini dibuat? Dari warga, untuk warga Gunung Putri.",
}

export default function AboutPage() {
    const content = COPY.ABOUT_PAGE

    // Ikon manual mapping biar tetap rapi di code
    const icons = [ShieldCheck, Zap, MapPin]

    return (
        <div className="min-h-screen bg-[#F4F1EC]">

            {/* SECTION 1: THE REALITY (Problem) */}
            <Motion
                className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                <Motion variants={fadeInUp} as="h1" className="text-3xl md:text-5xl font-extrabold text-[#1F3D2B] mb-8 tracking-tight whitespace-pre-line">
                    {content.HEADLINE}
                </Motion>
                <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-4">
                    {content.PROBLEM_PARAGRAPHS.map((paragraph, idx) => (
                        <Motion key={idx} variants={fadeInUp} as="p" className={idx === content.PROBLEM_PARAGRAPHS.length - 1 ? "font-medium text-[#1C1C1C]" : ""}>
                            {paragraph}
                        </Motion>
                    ))}
                </div>
            </Motion>

            {/* SECTION 2: THE SOLUTION (Values) */}
            <section className="bg-white py-16 border-y border-[#E6E3DF] overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Motion
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInLeft}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1F3D2B] mb-4">
                                {content.SOLUTION_TITLE}
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8">
                                {content.SOLUTION_DESC}
                            </p>
                            <ul className="space-y-6">
                                {content.VALUES.map((val, idx) => {
                                    const Icon = icons[idx] || ShieldCheck // Fallback icon
                                    return (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 bg-green-100 p-1.5 rounded-full text-green-700 shrink-0">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <strong className="text-[#1C1C1C] block mb-1">{val.TITLE}</strong>
                                                <p className="text-sm text-muted-foreground leading-snug">{val.DESC}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Motion>

                        {/* Visual/Image Placeholder */}
                        <Motion
                            className="relative h-80 bg-[#1F3D2B]/5 rounded-2xl flex items-center justify-center border border-dashed border-[#1F3D2B]/20"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInRight}
                        >
                            <div className="text-center p-6">
                                <Heart className="h-16 w-16 text-[#C56A4A] mx-auto mb-4 opacity-80" />
                                <h3 className="text-xl font-bold text-[#1F3D2B]">Dibuat dengan ❤️</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Inisiatif kecil untuk dampak yang (semoga) besar.
                                </p>
                            </div>
                        </Motion>
                    </div>
                </div>
            </section>

            {/* SECTION 3: BUILD IN PUBLIC (Transparansi) */}
            <section className="container mx-auto px-4 py-16 max-w-3xl text-center">
                <Motion
                    className="bg-[#1F3D2B] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={scaleIn}
                >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                            <Coffee className="h-6 w-6" />
                            {content.DEV_SECTION.TITLE}
                        </h3>
                        <p className="text-white/90 mb-6 leading-relaxed">
                            {content.DEV_SECTION.STORY}
                        </p>
                        <p className="text-sm text-white/70 italic mb-8">
                            {content.DEV_SECTION.QUOTE}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="lg" className="font-semibold text-[#1F3D2B]" asChild>
                                <Link href={COPY.CONTACT.ADMIN_WA ? `https://wa.me/${COPY.CONTACT.ADMIN_WA}?text=${encodeURIComponent(COPY.WA_TEMPLATE.REGISTER)}` : '#'}>
                                    {COPY.CTA_REGISTER.BUTTON}
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="bg-transparent text-white border-white/30 hover:bg-white/10" asChild>
                                <Link href="/dukung">Dukung Biaya Server</Link>
                            </Button>
                        </div>
                    </div>
                </Motion>
            </section>

        </div>
    )
}