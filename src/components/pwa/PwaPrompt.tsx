"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Download, Share, PlusSquare, RefreshCw, Smartphone } from "lucide-react"
import { toast } from "sonner"

export function PwaPrompt() {
    const [showInstallModal, setShowInstallModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

    useEffect(() => {
        // 1. Cek apakah ini iOS
        const userAgent = window.navigator.userAgent.toLowerCase()
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
        setIsIOS(isIosDevice)

        // 2. Handler untuk Install Prompt (Android/Desktop)
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault() // Mencegah browser menampilkan prompt bawaan
            setDeferredPrompt(e)

            // Cek apakah sudah pernah menolak/install sebelumnya (opsional: pakai localStorage)
            const hasRefused = localStorage.getItem("pwa_install_refused")
            if (!hasRefused) {
                // Tampilkan modal setelah 3 detik agar tidak kaget
                setTimeout(() => setShowInstallModal(true), 3000)
            }
        }

        // 3. Handler untuk Update Service Worker (Versi Baru)
        // next-pwa menginject object 'workbox' ke window
        if (
            typeof window !== "undefined" &&
            "serviceWorker" in navigator &&
            (window as any).workbox !== undefined
        ) {
            const wb = (window as any).workbox

            // Event ketika service worker baru ditemukan
            wb.addEventListener("waiting", () => {
                setShowUpdateModal(true)
            })

            // Register workbox
            wb.register()
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

        // Cek mode standalone (artinya sudah diinstall)
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches
        if (isStandalone) {
            setShowInstallModal(false)
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        }
    }, [])

    // --- ACTIONS ---

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === "accepted") {
                setDeferredPrompt(null)
            }
            setShowInstallModal(false)
        }
    }

    const handleUpdateClick = () => {
        // Reload halaman untuk mengaktifkan service worker baru
        // next-pwa biasanya otomatis skipWaiting, jadi reload cukup
        window.location.reload()
    }

    const handleCloseInstall = () => {
        setShowInstallModal(false)
        // Simpan preferensi user agar tidak diganggu lagi sesi ini
        localStorage.setItem("pwa_install_refused", "true")
    }

    // Jika sedang di iOS dan belum diinstall, kita bisa tampilkan instruksi manual
    // (Logic sederhana: tampilkan modal install jika iOS & bukan standalone)
    useEffect(() => {
        if (isIOS && !window.matchMedia("(display-mode: standalone)").matches) {
            const hasRefused = localStorage.getItem("pwa_install_refused")
            if (!hasRefused) {
                setTimeout(() => setShowInstallModal(true), 3000)
            }
        }
    }, [isIOS])


    return (
        <>
            {/* --- DIALOG INSTALL --- */}
            <Dialog open={showInstallModal} onOpenChange={setShowInstallModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-[#1F3D2B]" />
                            Install Aplikasi
                        </DialogTitle>
                        <DialogDescription>
                            Pasang aplikasi Marketplace Gunung Putri di HP kamu untuk akses lebih cepat, hemat kuota, dan bisa dibuka offline.
                        </DialogDescription>
                    </DialogHeader>

                    {isIOS ? (
                        // Layout Khusus iOS
                        <div className="flex flex-col gap-4 py-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2 rounded-md">
                                    <Share className="h-5 w-5 text-blue-500" />
                                </div>
                                <span>1. Klik tombol <strong>Share</strong> di browser Safari bawah.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2 rounded-md">
                                    <PlusSquare className="h-5 w-5 text-gray-700" />
                                </div>
                                <span>2. Pilih menu <strong>Add to Home Screen</strong> (Tambah ke Layar Utama).</span>
                            </div>
                        </div>
                    ) : (
                        // Layout Android / Desktop
                        <div className="py-2">
                            {/* Bisa taruh gambar preview app icon disini kalau mau */}
                        </div>
                    )}

                    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                        <Button variant="ghost" onClick={handleCloseInstall}>
                            Nanti Saja
                        </Button>
                        {!isIOS && (
                            <Button onClick={handleInstallClick} className="bg-[#1F3D2B] hover:bg-[#152b1e]">
                                <Download className="mr-2 h-4 w-4" /> Install Sekarang
                            </Button>
                        )}
                        {isIOS && (
                            <Button onClick={handleCloseInstall}>Saya Mengerti</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* --- DIALOG UPDATE --- */}
            <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Tersedia</DialogTitle>
                        <DialogDescription>
                            Versi baru Marketplace Gunung Putri tersedia. Refresh untuk mendapatkan fitur terbaru.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleUpdateClick} className="w-full">
                            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Aplikasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}