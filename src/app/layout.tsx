import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/queryProvider";
import { Toaster } from "@/components/ui/sonner";

// Setup Font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://marketplace-gunung-putri.vercel.app'), // Ganti dengan domain aslimu nanti
  title: {
    default: "Marketplace UMKM Gunung Putri",
    template: "%s | Gunung Putri", // Hasil: "Nasi Uduk Bu Siska | Gunung Putri"
  },
  description: "Pusat jajanan, jasa, dan produk kreatif warga Gunung Putri. Dukung usaha tetangga, belanja lebih dekat.",
  openGraph: {
    title: "Marketplace UMKM Gunung Putri",
    description: "Belanja produk tetangga lebih mudah. Dari warga, untuk warga.",
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