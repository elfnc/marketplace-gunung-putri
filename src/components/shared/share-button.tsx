"use client"

import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
    title: string
    text?: string
    url?: string
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
    const isIconOnly = size === "icon"

    const handleShare = async () => {
        const shareUrl = url || window.location.href
        const shareData = {
            title: title,
            text: text || `Cek ${title} di DekatRumah!`,
            url: shareUrl,
        }

        // 1. Coba pakai Native Web Share API (Android/iOS)
        if (navigator.share && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData)
                return
            } catch (err) {
                console.log("Share cancelled")
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            toast.success("Link berhasil disalin!", {
                description: "Siap dibagikan ke teman atau keluarga."
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
            aria-label="Bagikan"
        >
            {copied ? (
                <Check className={cn("h-4 w-4", !isIconOnly && "mr-2")} />
            ) : (
                <Share2 className={cn("h-4 w-4", !isIconOnly && "mr-2")} />
            )}

            {!isIconOnly && (copied ? "Disalin" : "Bagikan")}
        </Button>
    )
}