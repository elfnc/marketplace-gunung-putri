'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center space-y-6">
            <div className="bg-red-50 p-6 rounded-full">
                <AlertCircle className="h-12 w-12 text-red-500" />
            </div>

            <div className="space-y-2 max-w-md">
                <h2 className="text-2xl font-bold text-[#1F3D2B]">Terjadi Kesalahan</h2>
                <p className="text-muted-foreground">
                    Maaf, ada masalah saat memuat halaman ini. Silakan coba muat ulang atau kembali nanti.
                </p>
            </div>

            <div className="flex gap-4">
                <Button
                    onClick={() => reset()}
                    variant="outline"
                    className="rounded-full"
                >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Coba Lagi
                </Button>
                <Button
                    onClick={() => window.location.href = '/'}
                    className="rounded-full bg-[#1F3D2B]"
                >
                    Kembali ke Beranda
                </Button>
            </div>
        </div>
    )
}
