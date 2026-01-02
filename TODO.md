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

## 🚀 Phase 1: Foundation & Admin (DONE)
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
- [x] Setup NextAuth (Credentials Provider)
- [x] Image Handling (Input URL Manual for MVP)

### Admin UI
- [x] Login Page (`/login`)
- [x] Admin Dashboard Layout (Sidebar + Protected Route)
- [x] **UMKM Management:**
    - [x] Create/Edit Form (Zod Validation + Auto Slug)
    - [x] List View (Table + Search + Pagination)
    - [x] Delete with Confirmation
- [x] **Product Management:**
    - [x] Create/Edit Form (Zod Validation + Decimal Fix)
    - [x] List View (Table + Search + Pagination)
    - [x] Delete with Confirmation

---

## 🛍️ Phase 2: Public UI - "The Calm Vibe" (DONE)
**Goal:** User browsing nyaman, visual "mahal" tapi merakyat.

### Core Layout
- [x] Navbar (Logo Polished, Sticky, Mobile Menu)
- [x] Footer (Simple links, Copyright)
- [x] WhatsApp Helper Integration

### Pages
- [x] **Home Page:**
    - [x] Hero Section (Split View + Copywriting)
    - [x] Search & Category Section (Focus Area)
    - [x] Featured UMKM & Products
    - [x] Event Banner (Auto-hide)
    - [x] Soft Donation Section
- [x] **Product Listing (`/produk`):**
    - [x] Grid Layout (Responsive)
    - [x] Pagination (Server-side)
    - [x] Filter by Category & Search
    - [x] Empty States & Polish UI
- [x] **Detail Page (`/produk/[slug]`):**
    - [x] Product Image & Info
    - [x] Dynamic Metadata (SEO)
    - [x] "Add to Cart" Button (Connected to Store)
- [x] **UMKM Profile (`/umkm/[slug]`):** (Implementation Refined)
    - [x] Header Info (Name, Address)
    - [x] Product List per UMKM

---

## 🛒 Phase 3: The Logic - Cart & WhatsApp (DONE)
**Goal:** Order flow jalan tanpa login user.

### State Management (Zustand)
- [x] Install `zustand` + `sonner`
- [x] Setup Store (`useCartStore`)
- [x] Implement `persist` middleware (LocalStorage)
- [x] Action: `addItem`, `removeItem`, `updateQty`
- [x] Selector: `totalPrice`, `totalItems`
- [x] Client Component: `AddToCartButton` & `CartIndicator`

### Cart Page Logic
- [x] **Grouping Logic:** Group items by `umkmId`
- [x] UI: Render Card per UMKM Group (Split Checkout)
- [x] Subtotal per UMKM

### WhatsApp Engine
- [x] Helper Function: `generateWAUrl(phone, items)`
- [x] Format Message:
    - [x] Greeting
    - [x] List Items with Qty & Price
    - [x] Total Estimate
- [x] Connect Button "Checkout ke WhatsApp"

---

## 💰 Phase 4: Polish & Monetization (ALMOST DONE)
**Goal:** Siap rilis, SEO aman, channel duit siap.

### Monetization (Low Profile)
- [x] Page `/dukung` (Soft Donation)
- [x] Integration Link: Trakteer / Saweria (via Copywriting Config)

### SEO & Performance
- [x] Sitemap (`sitemap.ts`)
- [x] Robots.txt (`robots.ts`)
- [x] OpenGraph Images (`opengraph-image.tsx`)
- [x] Check Response Responsiveness (Mobile)

### Deployment (FINAL BOSS)
- [x] Environment Variables Check (`.env.production`)
- [x] Build Check (`npm run build`)
- [x] Deploy to Vercel
- [ ] Domain Setup

---

## 📝 Notes & Ideas
- [x] **Done:** Search Bar with Debounce (Admin & Public)
- [x] **Done:** Copywriting Centralized Config
- [x] **Done:** Product Card Polish (Location & Desc)
- [ ] **Future:** Filter by Location (Desa)