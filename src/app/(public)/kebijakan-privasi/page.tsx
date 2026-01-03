
import { Motion } from "@/components/shared/Motion"
import { fadeIn } from "@/lib/animations"
import { COPY } from "@/lib/copywritting"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Kebijakan Privasi | DekatRumah",
    description: "Kebijakan privasi dan ketentuan penggunaan platform DekatRumah.",
}

export default function PrivacyPage() {
    const { PRIVACY } = COPY

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

                <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-10 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-full bg-[#1F3D2B]/10 flex items-center justify-center text-[#1F3D2B]">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1C1C1C]">
                                {PRIVACY.TITLE}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                {PRIVACY.LAST_UPDATED}
                            </p>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="space-y-8">
                        {PRIVACY.SECTIONS.map((section, index) => (
                            <div key={index} className="space-y-3">
                                <h2 className="text-xl font-semibold text-[#1F3D2B]">
                                    {section.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-8" />

                    <div className="bg-[#F4F1EC]/50 rounded-xl p-6 text-sm text-muted-foreground border border-[#E6E3DF] italic">
                        <p>
                            "DekatRumah berkomitmen untuk menjaga keamanan dan kenyamanan pengguna dengan prinsip kesederhanaan dan keterbukaan."
                        </p>
                    </div>
                </div>
            </div>
        </Motion>
    )
}
