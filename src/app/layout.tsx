// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Atau font pilihanmu
import "./globals.css";
import QueryProvider from "@/providers/queryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace UMKM Gunung Putri",
  description: "Pusat UMKM Lokal Gunung Putri - Belanja mudah via WhatsApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <QueryProvider>
          {children}
          <Toaster position="top-center" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}