import { Motion } from "@/components/shared/Motion"
import { fadeIn } from "@/lib/animations"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { COPY } from "@/lib/copywritting"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Pertanyaan Umum (FAQ) | DekatRumah",
    description: "Jawaban untuk pertanyaan yang sering diajukan seputar penggunaan platform DekatRumah.",
}

export default function FAQPage() {
    return (
        <Motion
            className="min-h-screen py-12 md:py-20 bg-background"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <Button variant="ghost" size="sm" asChild className="mb-8 pl-0 text-muted-foreground hover:text-[#1F3D2B] transition-colors -ml-2">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Link>
                </Button>

                <div className="space-y-4 mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1C1C1C]">
                        Pertanyaan Umum
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Jawaban untuk pertanyaan yang sering diajukan seputar DekatRumah.
                    </p>
                </div>

                <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
                    <Accordion type="single" collapsible className="w-full">
                        {COPY.FAQ.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b-border/50 last:border-0">
                                <AccordionTrigger className="text-left font-medium text-[#1C1C1C] hover:no-underline hover:text-[#1F3D2B] transition-colors py-4">
                                    {item.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="mt-12 text-center bg-[#F4F1EC] rounded-xl p-8 border border-[#E6E3DF]">
                    <h3 className="font-semibold text-[#1C1C1C] mb-2">Masih ada pertanyaan lain?</h3>
                    <p className="text-muted-foreground mb-6 text-sm">
                        Tim kami siap membantu menjawab pertanyaan kamu seputar platform ini.
                    </p>
                    <Button
                        asChild
                        className="bg-[#1F3D2B] hover:bg-[#152b1e] text-white rounded-xl shadow-lg shadow-[#1F3D2B]/10 active:scale-95 transition-all"
                    >
                        <a href={`https://wa.me/${COPY.CONTACT.ADMIN_WA}?text=${encodeURIComponent(COPY.WA_TEMPLATE.ASK_INFO)}`} target="_blank" rel="noopener noreferrer">
                            Hubungi Admin via WhatsApp
                        </a>
                    </Button>
                </div>
            </div>
        </Motion>
    )
}
