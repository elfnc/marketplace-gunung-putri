import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Coffee, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { COPY } from "@/lib/copywritting" // Import Config
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dukung Project Ini - Marketplace Gunung Putri",
  description: "Bantu jaga platform ini tetap gratis dan bebas iklan untuk UMKM lokal.",
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC] py-12 md:py-20 font-sans">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* HERO HEADER */}
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="border-[#1F3D2B]/20 text-[#1F3D2B] bg-[#1F3D2B]/5 px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold">
            100% Independent & Non-Profit
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C1C1C] leading-[1.15] whitespace-pre-line tracking-tight">
            {COPY.SUPPORT_PAGE.HEADLINE}
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {COPY.SUPPORT_PAGE.SUBHEADLINE}
          </p>
        </div>

        {/* MAIN CONTENT CARD */}
        <Card className="bg-white border-none shadow-2xl shadow-[#1F3D2B]/5 overflow-hidden rounded-[2rem]">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* 1. STORY SECTION */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#FEE2E2] rounded-full">
                    <Heart className="h-5 w-5 text-[#EF4444] fill-[#EF4444]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1F3D2B]">
                  {COPY.SUPPORT_PAGE.STORY_TITLE}
                </h2>
              </div>
              
              <div className="prose prose-stone text-muted-foreground leading-loose text-base md:text-lg">
                <p>{COPY.SUPPORT_PAGE.STORY_P1}</p>
                <p>{COPY.SUPPORT_PAGE.STORY_P2}</p>
              </div>
            </section>

            {/* 2. COST TRANSPARENCY SECTION */}
            <section className="bg-[#F4F1EC]/60 p-6 md:p-8 rounded-2xl border border-[#1F3D2B]/5">
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2 flex items-center gap-2">
                {COPY.SUPPORT_PAGE.COST_TITLE}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {COPY.SUPPORT_PAGE.COST_DESC}
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                {COPY.SUPPORT_PAGE.COST_LIST.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-medium text-[#1F3D2B]/80">
                    <CheckCircle2 className="h-5 w-5 text-[#C56A4A] shrink-0" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. CTA & CLOSING */}
            <section className="text-center pt-2 space-y-8">
              <div className="flex flex-col items-center gap-4">
                {/* Tombol Saweria Dibuat Menonjol */}
                <Button 
                    size="lg" 
                    className="w-full sm:w-auto rounded-full bg-[#C56A4A] hover:bg-[#A8563A] hover:scale-105 transition-all duration-300 h-14 px-10 text-lg font-bold shadow-xl shadow-[#C56A4A]/20" 
                    asChild
                >
                  <Link href={COPY.SUPPORT.LINK_SAWERIA} target="_blank">
                    <Coffee className="mr-2 h-5 w-5" />
                    {COPY.SUPPORT.BTN_SAWERIA}
                  </Link>
                </Button>
                
                <p className="text-sm text-muted-foreground italic max-w-md mx-auto leading-relaxed">
                  "{COPY.SUPPORT_PAGE.CLOSING}"
                </p>
              </div>
            </section>

          </div>
        </Card>

        {/* BACK LINK */}
        <div className="mt-12 text-center pb-8">
            <Button variant="ghost" className="text-muted-foreground hover:text-[#1F3D2B] gap-2 rounded-full px-6" asChild>
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Beranda
                </Link>
            </Button>
        </div>

      </div>
    </div>
  )
}