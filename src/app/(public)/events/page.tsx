import { EventCard } from "@/features/events/components/EventCard"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Kabar Warga & Event - Marketplace Gunung Putri",
    description: "Informasi kegiatan, pengumuman, dan acara seru di sekitar Gunung Putri.",
}

export const revalidate = 60

export default async function PublicEventsPage() {
    const events = await prisma.event.findMany({
        where: { isActive: true },
        orderBy: { startDate: 'desc' }
    })

    return (
        <div className="min-h-screen bg-[#F4F1EC] pb-20">

            {/* HERO HEADER (Full Width) */}
            <div className="bg-[#1F3D2B] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

                {/* Container Manual */}
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center space-y-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase mb-2">
                        Info Komunitas
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Kabar Gunung Putri
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                        Jangan lewatkan kegiatan seru, pengumuman penting, dan cerita inspiratif dari tetangga sekitar.
                    </p>
                </div>
            </div>

            {/* EVENT GRID */}
            {/* Container Manual */}
            <div className="container mx-auto px-4 md:px-6 -mt-12 relative z-20">
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                title={event.title}
                                slug={event.slug}
                                excerpt={event.excerpt}
                                imageUrl={event.imageUrl}
                                startDate={event.startDate}
                                location={event.location}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-dashed border-border max-w-2xl mx-auto">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">📭</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1C1C1C]">Belum ada kabar terbaru</h3>
                        <p className="text-muted-foreground mt-2">
                            Saat ini belum ada event atau pengumuman yang aktif. Cek lagi nanti ya!
                        </p>
                    </div>
                )}
            </div>

        </div>
    )
}