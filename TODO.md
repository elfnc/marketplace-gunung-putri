# 🛒 Marketplace UMKM Gunung Putri - Project Tracker

**Vision:** "Local, Trustable, Calm Commerce."
**Stack:** Next.js (App Router), Prisma, PostgreSQL, Tailwind + Shadcn/ui, Zustand.

---

## 🎨 Visual Guide (Quick Ref)
- **Primary (Green):** `#1F3D2B` (Trust/Mature)
- **Secondary (Sand):** `#F4F1EC` (Background/Warm)
- **Accent (Clay):** `#C56A4A` (Highlights)
- **Font:** Inter / Satoshi
- **Radius:** `rounded-xl`

---

## 🚀 Phase 1: Foundation & Admin (Week 1)
**Goal:** Admin bisa login dan input data real.

### Setup
- [x] Init Next.js App Router (TypeScript)
- [x] Install Tailwind & Shadcn/ui
- [x] Configure `globals.css` (Variables for Custom Palette)
- [x] Setup Folder Structure (Monorepo-style: `(public)`, `(admin)`, `components`, `lib`)

### Database & Backend
- [x] Setup PostgreSQL (Neon / Supabase)
- [x] Install Prisma & Init Client
- [x] **Schema Design:**
    - [x] `User` (Admin Only)
    - [x] `Category`
    - [x] `Umkm` (Relation: Category 1-N UMKM)
    - [x] `Product` (Relation: UMKM 1-N Product)
- [x] Seed Initial Admin Data
- [ ] Setup NextAuth (Credentials Provider)
- [ ] Setup Image Upload (Supabase Storage / Uploadthing)

### Admin UI
- [ ] Login Page (`/login`)
- [ ] Admin Dashboard Layout (Sidebar + Protected Route)
- [ ] **UMKM Management:**
    - [ ] Create/Edit Form (Zod Validation)
    - [ ] List View (Table)
- [ ] **Product Management:**
    - [ ] Create/Edit Form (Image Upload)
    - [ ] List View

---

## 🛍️ Phase 2: Public UI - "The Calm Vibe" (Week 2)
**Goal:** User browsing nyaman, visual "mahal" tapi merakyat.

### Core Layout
- [ ] Navbar (Logo, Search, Cart Icon)
- [ ] Footer (Simple links, Copyright)
- [ ] Mobile Navigation (if needed)

### Pages
- [ ] **Home Page:**
    - [ ] Hero Section (Clean, no carousel drama)
    - [ ] Category Filter (Horizontal Scroll)
    - [ ] Featured UMKM Grid
- [ ] **Product Listing:**
    - [ ] Grid Layout (Responsive)
    - [ ] Pagination (Server-side)
    - [ ] Filter by Category
- [ ] **Detail Page (`/produk/[slug]`):**
    - [ ] Product Image (Object-fit: cover)
    - [ ] Product Info (Price hierarchy)
    - [ ] "Add to Cart" Button
    - [ ] Related Products
- [ ] **UMKM Profile (`/umkm/[slug]`):**
    - [ ] Header Info (Name, Address)
    - [ ] Product List per UMKM

---

## 🛒 Phase 3: The Logic - Cart & WhatsApp (Week 3)
**Goal:** Order flow jalan tanpa login user.

### State Management (Zustand)
- [ ] Setup Store (`useCartStore`)
- [ ] Implement `persist` middleware (LocalStorage)
- [ ] Action: `addItem`, `removeItem`, `updateQty`
- [ ] Selector: `totalPrice`, `totalItems`

### Cart Page Logic
- [ ] **Grouping Logic:** Group items by `umkmId`
- [ ] UI: Render Card per UMKM Group
- [ ] Subtotal per UMKM

### WhatsApp Engine
- [ ] Helper Function: `generateWAUrl(phone, items)`
- [ ] Format Message:
    - [ ] Greeting
    - [ ] List Items
    - [ ] Total Estimate
- [ ] Connect Button "Pesan via WhatsApp"

---

## 💰 Phase 4: Polish & Monetization (Week 4)
**Goal:** Siap rilis, SEO aman, channel duit siap.

### Monetization (Low Profile)
- [ ] Page `/dukung-umkm-lokal`
- [ ] Integration Link: Trakteer / Saweria
- [ ] Section: "Sponsor Lokal" (Static List)

### SEO & Performance
- [ ] Dynamic Metadata (`generateMetadata` for Products/UMKM)
- [ ] Sitemap (`next-sitemap`)
- [ ] Robots.txt
- [ ] OpenGraph Images (Social Share preview)

### Deployment
- [ ] Environment Variables Check (`.env.production`)
- [ ] Build Check (`npm run build`)
- [ ] Deploy to Vercel
- [ ] Domain Setup

---

## 📝 Notes & Ideas
- [ ] **Future:** Search Bar with Debounce
- [ ] **Future:** Filter by Location (Desa)
- [ ] **Strict Rule:** Jangan tambah fitur payment gateway sebelum traffic stabil.