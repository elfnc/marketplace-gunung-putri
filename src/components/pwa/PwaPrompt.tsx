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
import { Logo } from "@/components/brand/logo" // 👈 Kita import Logo biar keren

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
            e.preventDefault()
            setDeferredPrompt(e)

            const hasRefused = localStorage.getItem("pwa_install_refused")
            if (!hasRefused) {
                setTimeout(() => setShowInstallModal(true), 3000)
            }
        }

        // 3. Handler untuk Update Service Worker
        if (
            typeof window !== "undefined" &&
            "serviceWorker" in navigator &&
            (window as any).workbox !== undefined
        ) {
            const wb = (window as any).workbox
            wb.addEventListener("waiting", () => {
                setShowUpdateModal(true)
            })
            wb.register()
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

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
        window.location.reload()
    }

    const handleCloseInstall = () => {
        setShowInstallModal(false)
        localStorage.setItem("pwa_install_refused", "true")
    }

    // Logic iOS Manual Trigger
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
                <DialogContent className="sm:max-w-xs md:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-[#1F3D2B]">
                            <Smartphone className="h-5 w-5" />
                            Install Aplikasi
                        </DialogTitle>
                        <DialogDescription>
                            Pasang <strong>DekatRumah</strong> agar akses lebih cepat dan hemat kuota internet.
                        </DialogDescription>
                    </DialogHeader>

                    {isIOS ? (
                        // Layout Khusus iOS (Tutorial)
                        <div className="flex flex-col gap-4 py-3 text-sm text-muted-foreground bg-secondary/30 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-md shadow-sm text-blue-500">
                                    <Share className="h-5 w-5" />
                                </div>
                                <span>1. Klik tombol <strong>Share</strong> di menu bawah Safari.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-md shadow-sm text-gray-700">
                                    <PlusSquare className="h-5 w-5" />
                                </div>
                                <span>2. Pilih menu <strong>Add to Home Screen</strong>.</span>
                            </div>
                        </div>
                    ) : (
                        // Layout Android / Desktop (Visual Preview)
                        <div className="py-6 flex flex-col items-center justify-center gap-4 bg-secondary/10 rounded-xl border border-dashed border-[#1F3D2B]/20">
                            <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-[#1F3D2B]/10">
                                <Logo className="h-10 w-10" />
                            </div>
                            <div className="text-center space-y-1">
                                <p className="font-bold text-[#1F3D2B] text-lg">DekatRumah</p>
                                <p className="text-xs text-muted-foreground">Direktori Usaha Warga</p>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-2">
                        <Button variant="ghost" onClick={handleCloseInstall} className="text-muted-foreground">
                            Nanti Saja
                        </Button>
                        {!isIOS && (
                            <Button onClick={handleInstallClick} className="bg-[#1F3D2B] hover:bg-[#152b1e] font-semibold">
                                <Download className="mr-2 h-4 w-4" /> Install Sekarang
                            </Button>
                        )}
                        {isIOS && (
                            <Button onClick={handleCloseInstall} className="bg-[#1F3D2B]">Saya Mengerti</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* --- DIALOG UPDATE --- */}
            <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
                <DialogContent className="sm:max-w-sm rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-[#C56A4A] animate-spin-slow" />
                            Update Tersedia
                        </DialogTitle>
                        <DialogDescription>
                            Versi baru <strong>DekatRumah</strong> sudah tersedia. Refresh aplikasi untuk mendapatkan fitur terbaru.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                        <Logo className="h-12 w-12 opacity-80 grayscale" />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdateClick} className="w-full bg-[#1F3D2B] hover:bg-[#152b1e]">
                            Refresh Aplikasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}