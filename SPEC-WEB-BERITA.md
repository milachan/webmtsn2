# 📋 SPESIFIKASI WEB BERITA (Subdomain)
## Berita MTsN 2 Kebumen

> Dokumen ini untuk diberikan kepada **agent AI** yang akan membangun website berita di subdomain.
> Web berita ini terpisah dari web utama (`D:\vscode\mtsn2`), lokasi: `D:\vscode\mtsn2-berita`

---

## 🎯 Tujuan

Website berita di subdomain (misal: `berita.mtsn2kebumen.sch.id`) yang **sinkron** dengan web utama.
Berita yang diupload dari subdomain → otomatis muncul di web utama (BeritaTerbaru.tsx, UnifiedPopup.tsx).

---

## 🏗️ Arsitektur

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│  Web Berita (baru dibikin)       │     │  Web Utama (sudah jadi)         │
│  D:\vscode\mtsn2-berita          │     │  D:\vscode\mtsn2               │
│  ──────────────────────          │     │  ───────────────────────        │
│  Next.js App Router              │     │  Next.js App Router             │
│  Halaman:                        │     │  Halaman:                       │
│  ├── / (list berita)             │     │  ├── / (homepage)               │
│  ├── /berita/[slug] (detail)     │     │  ├── /informasi/berita          │
│  └── /admin (CRUD berita)        │     │  ├── /informasi/berita/[slug]   │
│                                  │     │  └── /admin (full admin)        │
│  TIDAK PUNYA DATABASE SENDIRI    │     │                                 │
│  ──────────────────────────────  │     │  PUNYA DATABASE MySQL           │
│  Semua data via API panggil      │     │  ─────────────────────────────   │
│  ke web utama                    │     │  Database: mtsn2_kebumen        │
│                                  │     │  Tabel: berita, galeri, dll     │
└──────────────┬──────────────────┘     └──────────────┬──────────────────┘
               │                                      │
               │        1. READ → GET /api/data/berita (tanpa auth)
               │        2. CREATE → POST /api/data/berita (dengan admin auth)
               │        3. UPDATE → PUT /api/data/berita/:id (dengan admin auth)
               │        4. DELETE → DELETE /api/data/berita/:id (dengan admin auth)
               │        5. UPLOAD → POST /api/upload (dengan admin auth)
               │        6. LOGIN → POST /api/auth/login
               │        7. UPLOAD IMAGE → POST /api/upload
               └──────────────────────────────────────────┘

    BASE_URL = https://mtsn2kebumen.sch.id   (web utama)
    ATAU saat development: BASE_URL = http://localhost:3000

    !! CORS: Karena subdomain beda origin, web berita perlu handle CORS.
    !! Solusi: Di web berita, panggil API web utama dari SERVER-SIDE (Server Component / Route Handler),
    !! bukan dari client-side. Dengan begitu tidak kena CORS.
```

---

## 🔌 API ENDPOINTS (Web Utama)

### 1. GET /api/data/berita — Ambil semua berita
```http
GET https://mtsn2kebumen.sch.id/api/data/berita
Authorization: (tidak perlu, publik)
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "MTsN 2 Kebumen Juara Umum Olimpiade Sains",
    "excerpt": "Tim Olimpiade Sains berhasil meraih juara umum...",
    "date": "15 Juli 2026",
    "category": "Prestasi",
    "image": "/uploads/xxx.webp",
    "slug": "juara-olimpiade-sains"
  }
]
```
Data urut: `orderBy: { id: 'desc' }` (terbaru di atas).

**Category yang ada:** `"Prestasi"`, `"Kegiatan"`, `"Pengumuman"`

### 2. GET /api/data/berita/:id — Ambil satu berita
```http
GET https://mtsn2kebumen.sch.id/api/data/berita/1
```
Response sama seperti di atas, tapi satu object.

### 3. POST /api/data/berita — Tambah berita (ADMIN ONLY)
```http
POST https://mtsn2kebumen.sch.id/api/data/berita
Content-Type: application/json
Cookie: session=<token>   ← dari login

{
  "title": "Judul Berita",
  "excerpt": "Ringkasan berita",
  "date": "15 Juli 2026",
  "category": "Kegiatan",
  "image": "/uploads/xxx.webp",
  "slug": "judul-berita"
}
```

**⚠️ Required fields:** `title`, `excerpt`, `date`, `category`, `slug`
**⚠️ Field `image` boleh dikosongkan** (default akan jadi `""`).
**⚠️ `id` jangan dikirim** — auto-increment oleh database.
**⚠️ `slug` harus unique** (validasi di database). Gunakan slugify.

**Response (201):** Object berita yang baru dibuat (dengan id dari database).

### 4. PUT /api/data/berita/:id — Update berita (ADMIN ONLY)
```http
PUT https://mtsn2kebumen.sch.id/api/data/berita/1
Content-Type: application/json
Cookie: session=<token>

{
  "title": "Judul Baru",
  "excerpt": "....",
  "date": "...",
  "category": "...",
  "image": "/uploads/xxx.webp",
  "slug": "judul-baru"
}
```

### 5. DELETE /api/data/berita/:id — Hapus berita (ADMIN ONLY)
```http
DELETE https://mtsn2kebumen.sch.id/api/data/berita/1
Cookie: session=<token>
```

**Response (200):** `{ "success": true }`

### 6. POST /api/auth/login — Login admin
```http
POST https://mtsn2kebumen.sch.id/api/auth/login
Content-Type: application/json

{
  "username": "<username>",
  "password": "<password>"
}
```

**Response (200):** `{ "success": true }`
**Response (401):** `{ "error": "Username atau password salah" }`

**⚠️ Cookie session** akan diset otomatis oleh response. Untuk request API berikutnya, cookie ini harus dikirim.

### 6b. GET /api/auth/me — Cek status login
```http
GET https://mtsn2kebumen.sch.id/api/auth/me
Cookie: session=<token>
```
**Response:** `{ "authenticated": true }` atau 401.

### 6c. POST /api/auth/logout — Logout
```http
POST https://mtsn2kebumen.sch.id/api/auth/logout
```

### 7. POST /api/upload — Upload gambar (ADMIN ONLY)
```http
POST https://mtsn2kebumen.sch.id/api/upload?width=800&height=600
Cookie: session=<token>
Content-Type: multipart/form-data

file: <file>
```

**⚠️ Batasan:**
- Format: JPG, PNG, WEBP
- Maks: 5 MB
- Resize: otomatis 800×600 (center crop) — bisa diubah via query param `?width=X&height=Y`
- Untuk tanpa resize: `?resize=false` (untuk logo)

**Response (200):**
```json
{
  "url": "/uploads/1234567890-abc123.jpg",
  "width": 800,
  "height": 600,
  "size": 123456
}
```

**⚠️ path:** `url` adalah path relatif (`/uploads/...`). Untuk ditampilkan di web berita, perlu digabung dengan BASE_URL: `https://mtsn2kebumen.sch.id/uploads/...`

---

## 📦 STRUCT DATA (TypeScript Interface)

Dari `src/lib/data.ts` web utama:

```typescript
interface Berita {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;    // 'Prestasi' | 'Kegiatan' | 'Pengumuman'
  image: string;       // path relatif: '/uploads/xxx.webp' atau ''
  slug: string;        // unique — untuk URL detail
}
```

Di Prisma schema:
```prisma
model Berita {
  id       Int    @id @default(autoincrement())
  title    String
  excerpt  String
  date     String
  category String
  image    String @default("")
  slug     String @unique
}
```

---

## 🖼️ DESAIN HALAMAN

### Tema: Hijau/Emerald (sama dengan web utama)
- **Warna utama:** Emerald (`#059669`)
- **Warna teks:** Gray 900 / Gray 600
- **Font:** Gunakan Inter (default Next.js) atau font lokal

### 1. Halaman Utama (`/`)
- **Hero:** Header dengan judul "Berita MTsN 2 Kebumen" background gradient emerald
- **Grid berita:** Card-grid 3 kolom (desktop) / 2 kolom (tablet) / 1 kolom (mobile)
- **Filter:** Tombol filter kategori (Semua, Prestasi, Kegiatan, Pengumuman)
- **Search:** Input search untuk mencari berdasarkan judul
- **Pagination:** Load more button atau pagination
- **Card berita:** Image thumbnail (jika ada), kategori badge, judul (line-clamp-2), excerpt, tanggal, "Baca Selengkapnya" link

### 2. Halaman Detail (`/berita/[slug]`)
- **Featured image** (jika ada, pakai stacking pattern fallback gradient)
- **Kategori badge + tanggal**
- **Judul besar**
- **Konten** (hanya excerpt karena konten berita dari web utama cuma punya excerpt)
- **CTA:** "Baca di Website Utama" → link ke `https://mtsn2kebumen.sch.id/informasi/berita/[slug]`
- **Share buttons** (copy link, WhatsApp share)
- **Sidebar:** Berita terkait (random atau kategori sama)

### 3. Halaman Admin (`/admin`)
**Fitur login:**
- Form login username + password
- POST ke `BASE_URL/api/auth/login`
- Simpan cookie session (from response Set-Cookie header)
- Untuk request selanjutnya, kirim cookie

**Fitur CRUD:**
- **List berita:** Table/card view, tombol edit & hapus
- **Tambah berita:** Form dengan field title, excerpt, date, category (select), image (upload), slug (auto-generate dari title)
- **Edit berita:** Sama seperti tambah, data di-preload
- **Hapus:** Konfirmasi dulu

**Upload gambar:**
- Pake form data POST ke `BASE_URL/api/upload`
- Simpan url response, kirim ke POST/PUT berita sebagai field `image`

---

## ⚠️ PENTING — CORS & COOKIE

Karena subdomain berbeda origin, **kirim request dari SERVER**, bukan dari browser client:

```typescript
// ✅ OK — Server Component / Route Handler / getServerSideProps
const res = await fetch(`${BASE_URL}/api/data/berita`);
const data = await res.json();

// ❌ JANGAN — Client Component fetch (kena CORS)
// fetch(`${BASE_URL}/api/data/berita`)  ← NO
```

**Untuk admin login di web berita:**
- Karena login menggunakan cookie (httpOnly, sameSite: lax), request login HARUS dari server-side
- Cara: Buat API route sendiri di web berita (`/api/berita` atau `/api/login`) yang forward ke web utama
- Atau pakai proxy/middleware

**Alternatif lebih mudah:**
- Jangan pake cookie. Pake mekanisme token sendiri di web berita:
  1. Di web utama, tambah endpoint `POST /api/auth/token` yang balikin JWT token string (bukan cookie)
  2. Di web berita, simpan token di localStorage
  3. Kirim token via header `Authorization: Bearer <token>`

TAPI untuk sekarang, **sederhanakan** dulu:
- Web berita panggil API login dari server-side (Route Handler `src/app/api/login/route.ts`)
- Setelah login, redirect ke halaman admin

---

## 🛠️ LANGKAH MEMULAI

```bash
# 1. Buat project baru di folder terpisah
cd D:\vscode
npx create-next-app@latest mtsn2-berita --typescript --tailwind --eslint --app --src-dir

# 2. Masuk folder
cd mtsn2-berita

# 3. Install tambahan
npm install lucide-react framer-motion

# 4. Mulai bikin halaman
#    - src/app/page.tsx → halaman utama (list berita)
#    - src/app/berita/[slug]/page.tsx → detail berita
#    - src/app/admin/page.tsx → login + CRUD berita
#    - src/app/api/... → Route handler untuk forward ke web utama

# 5. Development
npm run dev    # http://localhost:3001 (biar tidak bentrok dengan web utama di 3000)
```

---

## 📝 YANG HARUS DIBUAT AGENT

### File-file utama:
```
mtsn2-berita/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts (atau .mjs)
├── .env.local (isi: BASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD)
│
└── src/
    ├── app/
    │   ├── layout.tsx          ← Layout utama (header, footer)
    │   ├── page.tsx            ← Halaman list berita (publik)
    │   ├── globals.css
    │   │
    │   ├── berita/
    │   │   └── [slug]/
    │   │       └── page.tsx    ← Halaman detail berita
    │   │
    │   ├── admin/
    │   │   ├── page.tsx        ← Login / Dashboard admin
    │   │   └── berita/
    │   │       ├── page.tsx    ← List berita (admin)
    │   │       ├── tambah/
    │   │       │   └── page.tsx    ← Form tambah berita
    │   │       └── edit/
    │   │           └── [id]/
    │   │               └── page.tsx   ← Form edit berita
    │   │
    │   └── api/
    │       ├── berita/
    │       │   └── route.ts    ← Forward ke web utama GET/POST
    │       ├── login/
    │       │   └── route.ts    ← Forward login ke web utama
    │       └── upload/
    │           └── route.ts    ← Forward upload ke web utama
    │
    └── lib/
        ├── types.ts            ← Interface Berita
        └── api.ts              ← Helper functions (fetchBerita, dll)
```

### Setelah selesai, agent WAJIB membuat file laporan:
**File:** `REPORT-WEB-BERITA.md` (di root proyek mtsn2-berita)

Isi laporan:
```markdown
# LAPORAN PEMBUATAN WEB BERITA

## Status
✅ Web berita selesai dibuat di D:\vscode\mtsn2-berita

## Halaman yang dibuat
- [✅/❌] Halaman Utama (list berita) - src/app/page.tsx
- [✅/❌] Halaman Detail Berita - src/app/berita/[slug]/page.tsx
- [✅/❌] Halaman Admin Login - src/app/admin/page.tsx
- [✅/❌] Halaman Admin List Berita - src/app/admin/berita/page.tsx
- [✅/❌] Halaman Admin Tambah Berita - src/app/admin/berita/tambah/page.tsx
- [✅/❌] Halaman Admin Edit Berita - src/app/admin/berita/edit/[id]/page.tsx

## API Routes
- [✅/❌] src/app/api/berita/route.ts
- [✅/❌] src/app/api/login/route.ts
- [✅/❌] src/app/api/upload/route.ts

## Fitur
- [✅/❌] Filter kategori berita
- [✅/❌] Search berita
- [✅/❌] Pagination / Load more
- [✅/❌] Upload gambar (via web utama)
- [✅/❌] Admin CRUD berita
- [✅/❌] Slug auto-generate dari title

## Catatan
- BASE_URL yang digunakan: https://mtsn2kebumen.sch.id
- Masalah yang ditemukan: ...
```

---

## ⚡ SPESIFIKASI UNTUK AGENT

> Kepada agent yang akan membuat web berita ini:
>
> 1. **Jangan mengubah apapun di folder `D:\vscode\mtsn2`** — web utama tidak boleh disentuh.
> 2. **Buat semua file di folder baru `D:\vscode\mtsn2-berita`**.
> 3. **Baca file `SPEC-WEB-BERITA.md` ini dengan saksama** — semua API info ada di sini.
> 4. **Gunakan `create-next-app`** untuk inisialisasi project.
> 5. **Setelah selesai, buat file `REPORT-WEB-BERITA.md`** yang berisi laporan lengkap.
> 6. **WAJIB typecheck** dengan `npx tsc --noEmit` — pastikan tidak ada error.
> 7. **Test build** dengan `npm run build` — pastikan build sukses.
