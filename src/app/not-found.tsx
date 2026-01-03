import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center p-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="bg-white p-6 rounded-full inline-block shadow-sm">
                    <FileQuestion className="h-16 w-16 text-[#C56A4A]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1F3D2B]">Halaman Tidak Ditemukan</h2>
                <p className="text-muted-foreground text-lg">
                    Maaf, halaman yang kamu cari sepertinya sudah pindah atau tidak ada.
                </p>
                <div className="pt-4">
                    <Button asChild size="lg" className="rounded-full bg-[#1F3D2B] hover:bg-[#162e20]">
                        <Link href="/">Kembali ke Beranda</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
