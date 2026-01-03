import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/queryProvider";
import { Toaster } from "@/components/ui/sonner";
import { PwaPrompt } from "@/components/pwa/PwaPrompt";
import { GoogleAnalytics } from '@next/third-parties/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1F3D2B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  // Ganti domain ini nanti jika sudah beli domain (misal dekatrumah.id)
  metadataBase: new URL('https://dekat-rumah.vercel.app'),

  title: {
    default: "DekatRumah | Direktori UMKM & Jasa Gunung Putri",
    template: "%s | DekatRumah",
  },

  description: "Cari makanan, laundry, jasa, dan produk tetangga di Gunung Putri lebih mudah. Langsung chat WhatsApp, tanpa biaya admin.",

  keywords: [
    "DekatRumah",
    "UMKM Gunung Putri",
    "Jajanan Gunung Putri",
    "Info Warga Gunung Putri",
    "Cikeas",
    "Tlajung Udik",
    "Wanaherang",
    "Cicadas",
    "Jasa Service AC Gunung Putri",
    "Laundry Terdekat"
  ],

  authors: [{ name: "DekatRumah Team" }],
  creator: "Eldevs",
  publisher: "DekatRumah",

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
    title: "DekatRumah — UMKM Gunung Putri",
    description: "Biar usaha dekat rumah lebih gampang dicari. Langsung WA, tanpa aplikasi ribet.",
    url: '/',
    siteName: 'DekatRumah',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DekatRumah Preview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "DekatRumah — Support Usaha Tetangga",
    description: "Temukan produk dan jasa dari warga sekitar Gunung Putri.",
    images: ['/opengraph-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  verification: {
    google: "sb6Yv_RS5nvNbsliFL_rBMOpggLc87IVR7aPsvHOH2Y",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <QueryProvider>
          {children}
          <PwaPrompt />
          <Toaster position="top-center" richColors />
        </QueryProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}