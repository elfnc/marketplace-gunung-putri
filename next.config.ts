import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // 👈 Wajib buat Unsplash
      },
      {
        protocol: "https",
        hostname: "placehold.co", // 👈 Ganti jadi ini
      },
      // Nanti kalau pakai Supabase Storage, tambahkan ini:
      // {
      //   protocol: "https",
      //   hostname: "namaproject.supabase.co",
      // },
    ],
  },
};

export default nextConfig;
