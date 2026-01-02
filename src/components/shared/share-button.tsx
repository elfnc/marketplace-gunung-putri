"use client"

import { Button } from "@/components/ui/button"
import { Share2, Check, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ShareButtonProps {
    title: string
    text?: string
    url?: string // Kalau kosong, pakai current URL
    className?: string
    variant?: "outline" | "ghost" | "default" | "secondary"
    size?: "default" | "sm" | "lg" | "icon"
}

export function ShareButton({
    title,
    text,
    url,
    className,
    variant = "outline",
    size = "default"
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        const shareUrl = url || window.location.href
        const shareData = {
            title: title,
            text: text || `Cek ${title} di Marketplace Gunung Putri!`,
            url: shareUrl,
        }

        // 1. Coba pakai Native Web Share API (Android/iOS)
        if (navigator.share && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData)
                return
            } catch (err) {
                // User cancel share, ignore
                console.log("Share cancelled")
            }
        }

        // 2. Fallback: Copy to Clipboard (Desktop)
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            toast.success("Link berhasil disalin!", {
                description: "Siap dibagikan ke grup WA tetangga."
            })

            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error("Gagal menyalin link")
        }
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleShare}
            className={className}
        >
            {copied ? (
                <Check className="h-4 w-4 mr-2" />
            ) : (
                <Share2 className="h-4 w-4 mr-2" />
            )}
            {size !== "icon" && (copied ? "Disalin" : "Bagikan")}
        </Button>
    )
}