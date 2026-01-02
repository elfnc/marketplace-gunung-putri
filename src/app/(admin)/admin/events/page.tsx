import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Eye, Calendar } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { deleteEvent, toggleEventStatus } from "@/features/events/server/action"

export const dynamic = "force-dynamic"

export default async function AdminEventListPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1F3D2B]">Kelola Kabar & Event</h1>
          <p className="text-muted-foreground">List artikel dan kegiatan warga Gunung Putri.</p>
        </div>
        <Button asChild className="bg-[#1F3D2B] hover:bg-[#152b1e]">
          <Link href="/admin/events/create">
            <Plus className="mr-2 h-4 w-4" /> Buat Baru
          </Link>
        </Button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Judul Event</th>
                <th className="px-6 py-4 font-medium">Tanggal Acara</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    Belum ada event. Silakan buat baru.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#1C1C1C]">{event.title}</div>
                      {/* 👇 Tailwind Suggestion Fix: max-w-[200px] -> max-w-50 */}
                      <div className="text-xs text-muted-foreground truncate max-w-50">
                        {event.location || "Lokasi tidak diset"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {format(event.startDate, "dd MMM yyyy", { locale: id })}
                      </div>
                      <div className="text-xs mt-1">
                        {format(event.startDate, "HH:mm")} WIB
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {/* 👇 TS Fix: Gunakan Inline Server Action wrapper */}
                      <form action={async () => {
                        "use server"
                        await toggleEventStatus(event.id, event.isActive)
                      }}>
                        <button type="submit" title="Klik untuk ubah status">
                          <Badge
                            variant={event.isActive ? "default" : "secondary"}
                            className={event.isActive ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-gray-200 text-gray-500 hover:bg-gray-300 cursor-pointer"}
                          >
                            {event.isActive ? "Publik" : "Draft"}
                          </Badge>
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild title="Lihat Preview">
                          <Link href={`/events/${event.slug}`} target="_blank">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Link>
                        </Button>

                        {/* 👇 TS Fix: Gunakan Inline Server Action wrapper */}
                        <form action={async () => {
                          "use server"
                          await deleteEvent(event.id)
                        }}>
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}