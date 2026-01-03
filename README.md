# 🏠 DekatRumah

> **"Usaha dekat rumah, lebih gampang dicari."**
> Direktori digital untuk menghubungkan warga Gunung Putri dengan usaha dan jasa di sekitarnya. Tanpa aplikasi ribet, langsung hubungi via WhatsApp.

---

## 📖 Tentang Project

**DekatRumah** (sebelumnya *Marketplace GP*) adalah inisiatif mandiri untuk mendigitalkan potensi ekonomi warga di kecamatan Gunung Putri, Bogor. 

Platform ini berfungsi sebagai **jembatan digital** agar usaha rumahan, jasa servis, hingga kuliner tetangga lebih mudah ditemukan, terdokumentasi rapi, dan bisa dihubungi langsung tanpa perantara.

**Status Project:** Internal / Closed Beta.
*Saat ini platform dikelola secara mandiri. Pendaftaran usaha dilakukan melalui kurasi admin untuk menjaga validitas data warga.*

### Kenapa DekatRumah?
* **Tanpa Potongan:** Transaksi 100% milik pedagang (Direct to WhatsApp).
* **Tanpa Akun/Login:** Warga tinggal cari -> Klik -> Chat Penjual.
* **Hyper-Local:** Fokus pada radius lingkungan sekitar (Gunung Putri & sekitarnya).
* **Progressive Web App (PWA):** Bisa diinstall di HP, hemat kuota, dan performa tinggi.

---

## 🛠️ Tech Stack

Dibangun dengan teknologi modern ("Bleeding Edge") untuk performa maksimal dan *Developer Experience* terbaik.

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 + [Shadcn/ui](https://ui.shadcn.com/)
* **Animation:** Framer Motion (Page Transitions & Scroll Reveal)
* **Database:** PostgreSQL (via Prisma ORM)
* **Auth:** NextAuth.js (Admin Whitelist Only)
* **PWA:** @ducanh2912/next-pwa
* **Storage:** Cloudinary

---

## ✨ Fitur Utama

### 🏘️ Public (Warga)
* **Direktori Usaha:** Cari jajanan, katering, laundry, atau tukang AC di sekitar rumah.
* **Filter Kategori:** Navigasi mudah (Makanan, Jasa, Fashion, dll).
* **WhatsApp Integration:** Tombol "Hubungi" langsung membuka chat WA dengan format pesan otomatis.
* **Info Warga:** Portal informasi event bazar, kerja bakti, atau pengajian.
* **PWA Installable:** Prompt install otomatis untuk Android & panduan manual untuk iOS.

### 🔐 Admin (Internal)
* **Dashboard:** Monitor statistik usaha dan produk.
* **Management (CRUD):** Kelola data Usaha, Produk, Kategori, dan Event.
* **Image Upload:** Upload foto produk praktis terintegrasi Cloudinary.

---

## 🚀 Cara Menjalankan (Local Development)

### 1. Clone Repository
```bash
git clone [https://github.com/elfnc/dekat-rumah.git](https://github.com/elfnc/dekat-rumah.git)
cd dekat-rumah

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Setup Environment Variables

Buat file `.env` di root folder dan sesuaikan dengan `env.example`:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/dekatrumah_db"
NEXTAUTH_SECRET="rahasia_super_aman"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
# ... variable lainnya

```

### 4. Database Setup

Pastikan PostgreSQL sudah berjalan, lalu jalankan perintah ini:

```bash
# Generate Prisma Client
npx prisma generate

# Push Schema ke Database
npx prisma db push

# 🌱 Seed Data (PENTING: Untuk mengisi Kategori awal)
npx prisma db seed

```

### 5. Jalankan Server

```bash
# Gunakan --webpack jika ada isu dengan plugin PWA di Turbopack
npm run dev
# Buka localhost:3000

```

---

## 🤝 Kontribusi & Lisensi

Project ini dikembangkan secara mandiri (Indie Hacking) untuk kontribusi sosial bagi warga sekitar.

**Lisensi:** Proprietary / Internal Use Only.
*Dibuat dengan ❤️ oleh [Eldevs](https://www.google.com/search?q=https://github.com/elfnc) untuk Warga Gunung Putri.*