import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/queryProvider";
import { Toaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1F3D2B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://marketplace-gunung-putri.vercel.app'),

  title: {
    default: "Marketplace UMKM Gunung Putri | Jajanan & Jasa Lokal",
    template: "%s | Marketplace Gunung Putri",
  },

  description: "Pusat jajanan, jasa, laundry, dan produk kreatif warga Gunung Putri, Bogor. Dukung usaha tetangga, belanja lebih dekat tanpa aplikasi.",

  keywords: [
    "UMKM Gunung Putri",
    "Kuliner Gunung Putri",
    "Jajanan Bogor",
    "Marketplace Warga",
    "Cikeas",
    "Tlajung Udik",
    "Wanaherang",
    "Cicadas",
    "Jual beli online Gunung Putri"
  ],

  authors: [{ name: "Komunitas Warga Gunung Putri" }],
  creator: "Eldevs",
  publisher: "Marketplace Gunung Putri",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: "Marketplace UMKM Gunung Putri",
    description: "Belanja produk tetangga lebih mudah. Langsung WA penjual.",
    url: 'https://marketplace-gunung-putri.vercel.app',
    siteName: 'Marketplace Gunung Putri',
    locale: 'id_ID',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Marketplace UMKM Gunung Putri",
    description: "Dukung usaha lokal tetangga.",
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  verification: {
    google: "sb6Yv_RS5nvNbsliFL_rBMOpggLc87IVR7aPsvHOH2Y",
  },

  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster position="top-center" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}