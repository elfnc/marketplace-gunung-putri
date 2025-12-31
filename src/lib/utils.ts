// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { COPY } from "@/lib/copywritting"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Ganti spasi dengan dash
    .replace(/[^\w\-]+/g, '') // Hapus karakter non-word
    .replace(/\-\-+/g, '-')   // Ganti multiple dash dengan single dash
    .replace(/^-+/, '')       // Trim dash di depan
    .replace(/-+$/, '')       // Trim dash di belakang
}


export function getWhatsAppLink(
  message: string = "", 
  phoneNumber: string = COPY.CONTACT.ADMIN_WA
) {
  // 1. Bersihkan nomor telepon (buang karakter non-angka)
  let cleanPhone = phoneNumber.replace(/\D/g, '')

  // 2. Pastikan format 62 (ganti 0 di depan jadi 62)
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1)
  }

  // 3. Encode pesan (biar enter/spasi terbaca di URL)
  const encodedMessage = encodeURIComponent(message)

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}