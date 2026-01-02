# 🛒 Marketplace UMKM Gunung Putri

> **"Local, Trustable, Calm Commerce."**
> Platform digital untuk menghubungkan warga Gunung Putri dengan UMKM sekitar. Tanpa aplikasi ribet, langsung pesan via WhatsApp.

## 📖 Tentang Project

Project ini dibangun sebagai inisiatif mandiri (*indie hacking*) untuk mendigitalkan UMKM lokal di kecamatan Gunung Putri, Bogor. Tujuannya sederhana: **Memudahkan warga mencari produk tetangga sendiri.**

Berbeda dengan marketplace raksasa, platform ini:

* **Tanpa Potongan Admin:** Transaksi 100% milik pedagang.
* **Tanpa Login User:** Pembeli tinggal pilih barang -> Checkout -> Terhubung ke WhatsApp Penjual.
* **Fokus Komunitas:** Dilengkapi fitur Event & Kabar Warga.

## 🛠️ Tech Stack

Platform ini dibangun dengan teknologi modern untuk performa tinggi dan skalabilitas (siap menahan ribuan request).

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 + [Shadcn/ui](https://ui.shadcn.com/)
* **Database:** PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
* **Auth:** NextAuth.js (Admin Only)
* **State Management:** Zustand (Shopping Cart)
* **Image Storage:** Cloudinary
* **Testing:** Jest (Unit) & k6 (Load Testing)

## ✨ Fitur Utama

### 🛍️ Public (User)

* **Katalog Produk:** Pencarian instan, filter kategori, dan pagination.
* **Direktori UMKM:** Profil lengkap usaha warga (Alamat, Kontak, Etalase).
* **Smart Cart:** Keranjang belanja yang otomatis mengelompokkan barang berdasarkan toko (Split Order).
* **WhatsApp Checkout Engine:** Generate pesan otomatis: *"Halo, saya mau pesan [Barang A, Barang B]..."*
* **Kabar Warga:** Portal berita/event lokal.

### 🔐 Admin (CMS)

* **Dashboard Analytics:** Monitor total produk, UMKM aktif, dan traffic.
* **Manajemen Data:** CRUD Produk, UMKM, dan Event.
* **Image Upload:** Integrasi langsung ke Cloudinary.
* **Rich Text Editor:** Menulis konten berita dengan Tiptap Editor.

## 🚀 Cara Menjalankan (Local Development)

Ikuti langkah ini untuk menjalankan project di laptop kamu.

### 1. Clone Repository

```bash
git clone https://github.com/username/marketplace-gp.git
cd marketplace-gp

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Setup Environment Variables

Buat file `.env` di root folder, lalu copy konfigurasi berikut:

```env
# --- DATABASE ---
# Ganti dengan kredensial PostgreSQL lokal atau Cloud (Neon/Supabase)
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace_gp?schema=public"

# --- AUTH (NextAuth) ---
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="rahasia_dapur_bunda_123" # Generate string acak

# --- GOOGLE OAUTH (Untuk Login Admin) ---
GOOGLE_CLIENT_ID="dapatkan_di_gcp_console"
GOOGLE_CLIENT_SECRET="dapatkan_di_gcp_console"

# --- CLOUDINARY (Upload Gambar) ---
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="nama_cloud"
CLOUDINARY_API_KEY="api_key_kamu"
CLOUDINARY_API_SECRET="api_secret_kamu"

```

### 4. Setup Database & Seeding

Jalankan migrasi untuk membuat tabel, lalu isi dengan data dummy (seeder) agar aplikasi tidak kosong.

```bash
# Push schema ke Database
npx prisma migrate dev --name init

# Isi data dummy (20 UMKM, 20 Event, User Admin)
npx prisma db seed

```

### 5. Jalankan Server

```bash
npm run dev

```

Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser.

---

## 🧪 Testing & Performance

Project ini dilengkapi dengan suite testing untuk memastikan kestabilan.

### Unit Testing (Jest)

Mengecek logika bisnis (Cart calculation, Slug generation, dll).

```bash
npm run test

```

### Load Testing (k6)

Mengecek kekuatan server menahan traffic.

> **Note:** Pastikan install k6 terlebih dahulu atau gunakan binary yang tersedia.

```bash
# Test beban normal (20 User)
npm run test:load

# Test stress (100 User simultan)
npm run test:stress

```

*Hasil Benchmark terakhir: 40k Request dalam 9 menit dengan error rate 0% (Production Build).*

---

## 📂 Struktur Project

```
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── (admin)/          # Route Admin (Protected)
│   ├── (public)/         # Route Public (Storefront)
│   └── api/              # API Routes (Auth, Webhooks)
├── components/           # Reusable UI Components
│   ├── ui/               # Shadcn Primitives (Button, Card, etc)
│   ├── layout/           # Navbar, Sidebar, Footer
│   └── shared/           # Search, Filters, Uploaders
├── features/             # Feature-based Modules (Domain Logic)
│   ├── products/         # Logic Produk (Actions, Components)
│   ├── umkm/             # Logic UMKM
│   ├── cart/             # Logic Keranjang
│   └── events/           # Logic Berita/Event
├── lib/                  # Utilities (Prisma Client, Helpers)
└── styles/               # Global CSS

```

## 🤝 Kontribusi

Project ini *Open Source* untuk komunitas. Jika ingin berkontribusi:

1. Fork repository ini.
2. Buat branch fitur (`git checkout -b fitur-keren`).
3. Commit perubahan (`git commit -m 'feat: nambah fitur keren'`).
4. Push ke branch (`git push origin fitur-keren`).
5. Buat Pull Request.

## 📄 Lisensi

[MIT License](https://www.google.com/search?q=LICENSE) © 2026 Gunung Putri Local Pride.
Dibuat dengan ❤️ dan ☕.