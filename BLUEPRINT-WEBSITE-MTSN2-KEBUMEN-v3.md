# BLUEPRINT WEBSITE MTs NEGERI 2 KEBUMEN

**Versi:** 3.0 — Enhanced Animation, Design, Interactivity + UI/UX Pro Max Skill Integration
**Tanggal Revisi:** 23 Juli 2026
**Tema:** Hijau Modern, Elegan, Profesional, Dinamis
**Target:** Orang Tua, Siswa, dan Publik
**Framework:** Next.js (App Router) — direkomendasikan untuk deploy di CyberPanel via Node.js App Manager + OpenLiteSpeed reverse proxy
**Design Intelligence Tool:** [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — dipakai sebagai validasi silang & referensi berkelanjutan (lihat §7)
**Catatan:** Sitemap, struktur data (JSON schema), dan data service layer dari v1.0 dipertahankan karena sudah solid secara arsitektur. v2.0 memperkuat animasi, desain visual, dan interaktivitas. v3.0 menambahkan integrasi design intelligence engine untuk memvalidasi dan menjaga konsistensi keputusan desain sepanjang development.

---

## 1. SITEMAP & STRUKTUR MENU

*(tidak berubah dari v1.0 — struktur ini sudah baik)*

```
├─ Logo MTs Negeri 2 Kebumen
├─ 🏠 BERANDA
├─ 📖 PROFIL
│  ├─ Sambutan Kepala Madrasah
│  ├─ Sejarah
│  ├─ Visi & Misi
│  ├─ Struktur Organisasi
│  └─ Guru & Tendik
├─ 🏫 SARANA PRASARANA
├─ 📚 AKADEMIK
│  ├─ Kurikulum
│  ├─ Program Unggulan
│  └─ Prestasi
├─ 👥 KESISWAAN
│  ├─ Ekstrakurikuler
│  └─ Tata Tertib
├─ 📢 INFORMASI
│  ├─ Pengumuman
│  ├─ Berita
│  ├─ Agenda
│  └─ Galeri
├─ 📞 KONTAK
├─ 💬 LAYANAN PUBLIK
│  ├─ Kotak Saran & Pengaduan
│  └─ SP4N-LAPOR! (link eksternal)
└─ [🎓 PPDB] ← Tombol CTA Hijau Solid dengan micro-interaction (lihat §3)
```

### FOOTER (4 Kolom) — tidak berubah dari v1.0

---

## 2. STRUKTUR HALAMAN BERANDA (Revisi Layout)

Perubahan utama dari v1.0: layout tidak lagi 100% vertical-stack simetris. Beberapa section dibuat **asimetris/split-layout** agar tidak terasa seperti template default.

```
┌─────────────────────────────────────────────────┐
│ 1. HERO SECTION — full-bleed dengan layered      │
│    parallax (lihat §3.1)                         │
│    Height: 90vh (desktop), 70vh (mobile)         │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 2. POPUP PENGUMUMAN (First Visit) — sama v1.0    │
│    + entrance animation scale+fade (lihat §3.2)  │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 3. QUICK INFO BAR — ticker dengan marquee smooth │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 4. CAROUSEL FASILITAS & KEGIATAN                 │
│    + hover 3D-tilt card, crossfade autoplay      │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 5. SAMBUTAN KEPALA MADRASAH — SPLIT LAYOUT BARU  │
│    Foto besar kiri (sticky saat scroll) + teks   │
│    kanan dengan scroll-reveal per paragraf        │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 6. NILAI UNGGULAN — bento-grid asimetris          │
│    (1 card besar + 3 card kecil, bukan grid rata) │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 7. STATISTIK MADRASAH — animated counter dengan   │
│    easing + trigger via Intersection Observer     │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 8. TIMELINE SEJARAH INTERAKTIF (BARU)             │
│    Scroll-linked horizontal timeline singkat,     │
│    preview sejarah madrasah — link ke halaman     │
│    penuh                                          │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 9. BERITA & KEGIATAN TERBARU — card dengan hover  │
│    image-zoom + shadow-lift                       │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 10. GALERI FOTO — masonry grid interaktif dengan  │
│     filter kategori bertransisi + lightbox        │
│     dengan swipe gesture                          │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 11. PETA LOKASI & FASILITAS INTERAKTIF (BARU)     │
│     Peta embed dengan marker custom fasilitas      │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 12. TESTIMONI — slider crossfade dengan drag-swipe│
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 13. CALL TO ACTION — gradient mesh background     │
│     animasi lembut, tombol dengan magnetic hover  │
└─────────────────────────────────────────────────┘
```

---

## 3. SPESIFIKASI ANIMASI (Baru — Detail Implementasi)

Semua animasi menggunakan **Framer Motion** (untuk React/Next.js) dan CSS custom properties untuk transisi ringan. Prinsip: setiap animasi punya *purpose* (mengarahkan perhatian, memberi feedback), bukan dekorasi kosong.

### 3.1 Hero Section — Layered Parallax
```javascript
// Hero.jsx (konsep)
import { motion, useScroll, useTransform } from 'framer-motion';

const { scrollY } = useScroll();
const yBg = useTransform(scrollY, [0, 500], [0, 150]);   // foto bergerak lambat
const yText = useTransform(scrollY, [0, 500], [0, 60]);  // teks bergerak lebih cepat
const opacity = useTransform(scrollY, [0, 400], [1, 0]);

<motion.div style={{ y: yBg }} className="hero-bg" />
<motion.div style={{ y: yText, opacity }} className="hero-content">
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    {judul}
  </motion.h1>
</motion.div>
```
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo) — terasa premium, bukan linear.
- Stagger antar elemen teks: 0.15s delay per baris.

### 3.2 Popup Modal
```javascript
<motion.div
  initial={{ opacity: 0, scale: 0.92, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.35, ease: 'easeOut' }}
/>
```
Backdrop fade terpisah (duration 0.25s) agar tidak terasa "nempel" dengan konten popup.

### 3.3 Scroll-Reveal (dipakai di hampir semua section)
```javascript
const revealVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
  variants={revealVariant}
/>
```
Untuk grid/list (card, nilai unggulan): tambahkan `staggerChildren: 0.1` di parent variant agar card muncul bergiliran, bukan bersamaan.

### 3.4 Stats Counter (count-up dengan easing)
```javascript
import { animate } from 'framer-motion';

useEffect(() => {
  if (isInView) {
    animate(0, targetValue, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo, bukan linear
      onUpdate: (v) => setDisplay(Math.floor(v))
    });
  }
}, [isInView]);
```

### 3.5 Micro-interactions (Button, Card, Icon)
| Elemen | Interaksi | Implementasi |
|---|---|---|
| Tombol PPDB (CTA utama) | Magnetic hover — tombol sedikit mengikuti posisi cursor dalam radius 20px | `mousemove` listener + `transform: translate()` dengan spring |
| Card fasilitas/berita | Hover: shadow-lift + image scale 1.05 + border-glow tipis warna primary | `transition: all 0.3s cubic-bezier(...)` |
| Icon nilai unggulan | Hover: icon bounce ringan (scale 1.1 → 1) | Framer Motion `whileHover={{ scale: 1.1 }}` |
| Link teks ("Baca Selengkapnya") | Underline yang tumbuh dari kiri ke kanan saat hover | CSS `::after` dengan `transform: scaleX()` |
| Form input | Label float animation saat fokus + border color transition | CSS transition 0.2s |

### 3.6 Page Transition (antar halaman)
Menggunakan Next.js App Router + Framer Motion `AnimatePresence`:
```javascript
<AnimatePresence mode="wait">
  <motion.main
    key={pathname}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

### 3.7 Loading State
Skeleton screen dengan shimmer effect (bukan spinner statis):
```css
.skeleton {
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 4. PENGUATAN DESAIN VISUAL

### 4.1 Layout — Keluar dari Pola Vertical-Stack Simetris
- **Sambutan Kepala Madrasah**: split-layout, foto besar di satu sisi (sticky saat scroll di desktop), teks scroll-reveal per paragraf di sisi lain — bukan card centang biasa.
- **Nilai Unggulan**: bento-grid asimetris (1 card besar highlight + 3 card kecil), bukan grid 4 kolom rata yang terasa seperti PowerPoint.
- **Galeri**: masonry grid (ukuran foto variatif mengikuti aspect ratio asli), bukan grid kotak seragam.

### 4.2 Hero — Lebih dari Foto + Overlay + Teks Tengah
- Tambahkan **layered depth**: foto background + elemen dekoratif geometris Islami (garis/pola tipis, opacity rendah, posisi absolute) yang bergerak parallax terpisah dari foto.
- Overlay gradient (bukan solid opacity flat): `linear-gradient(180deg, rgba(30,87,56,0.2) 0%, rgba(30,87,56,0.6) 100%)` — lebih dalam secara visual.

### 4.3 Ornamen Islami — Dari "Subtle" Jadi Konkret
- Pola geometris islami (girih/tessellation sederhana) sebagai **SVG divider** antar section tertentu (bukan cuma disebut tanpa detail).
- Warna ornamen: gold (`--color-accent`) dengan opacity 8-12%, tidak dominan tapi terlihat jelas sebagai identitas.
- Terapkan di: header border-bottom, footer background pattern, section divider sebelum CTA akhir.

### 4.4 Dark Mode — Naik ke Fase 1 (bukan lagi Future Enhancement)
```css
:root[data-theme="dark"] {
  --color-bg: #0F1712;
  --color-bg-light: #1A241D;
  --color-primary: #4CAF6E;
  --color-text: #E8ECEA;
}
```
Toggle di header, tersimpan di `localStorage`, transisi warna smooth (`transition: background-color 0.3s, color 0.3s`) — bukan switch instan.

### 4.5 Tipografi — Sedikit Diferensiasi dari Kombinasi Umum
Poppins + Inter tetap dipakai (readable, aman), tapi tambahkan:
- **Display font** khusus H1 Hero: satu weight custom (misal Poppins ExtraBold + letter-spacing -0.02em) agar terasa lebih tegas, bukan default H1 biasa.
- Ukuran H1 dibuat fluid dengan `clamp()`: `font-size: clamp(32px, 5vw, 56px);` — responsif natural, bukan breakpoint kaku.

### 4.6 Palet Warna — Tambahan Gradient Signature
Selain solid color v1.0, tambahkan 1 gradient signature untuk elemen aksen (CTA banner, tombol utama saat hover):
```css
--gradient-primary: linear-gradient(135deg, #2D7A4E 0%, #1E5738 100%);
```

---

## 5. INTERAKTIVITAS MODERN (Dipindah dari "Future" ke Fase 1)

| Fitur | v1.0 | v2.0 |
|---|---|---|
| Dark mode | Future Enhancement | **Fase 1** |
| Search instant/autocomplete | Tidak ada detail | **Fase 1** — search bar dengan dropdown live-result saat mengetik (debounce 300ms) |
| Peta interaktif fasilitas | Tidak ada | **Fase 1** — embed peta dengan custom marker per fasilitas, klik marker → popup info singkat |
| Timeline sejarah interaktif | Statis | **Fase 1** — horizontal scroll timeline dengan snap-point per era |
| WhatsApp widget | Future Enhancement | **Fase 1** — floating button, bukan phase 2, karena ini kanal komunikasi utama orang tua |
| Filter galeri dengan transisi | Lightbox saja | **Fase 1** — filter kategori dengan FLIP animation (card reposisi smooth, bukan reload grid) |
| Personalisasi ringan menu | Tidak ada | **Fase 1** — highlight/badge menu berbeda tergantung user flow terdeteksi (misal query param `?ref=ppdb` menonjolkan PPDB) |
| PWA, push notification | Future Enhancement | Tetap Fase 2 (butuh backend notifikasi matang) |
| Multi-language | Future Enhancement | Tetap Fase 2 |

---

## 6. TEKNOLOGI & DEPLOYMENT (Update)

### Frontend Framework — Ditetapkan
**Next.js (App Router)** — dipilih final karena:
- Server-side rendering untuk SEO madrasah
- `next/image` untuk optimasi foto otomatis (WebP, lazy load native)
- Kompatibel penuh dengan Framer Motion untuk seluruh spesifikasi animasi §3
- Terverifikasi bisa dideploy di **CyberPanel** melalui Node.js App Manager bawaan + OpenLiteSpeed sebagai reverse proxy

### Styling & Animasi
- **Tailwind CSS** — utility-first, cepat develop, mendukung `clamp()`/custom properties untuk fluid typography
- **Framer Motion** — seluruh animasi §3
- **Lucide Icons** — icon modern

### Deployment ke CyberPanel (ringkasan alur)
1. Setup Website baru di CyberPanel (`Websites → Create Website`)
2. Install Node.js via CyberPanel Node.js App Manager
3. Clone/upload project, `npm install`, `npm run build`
4. Jalankan `next start` sebagai managed process (PM2 atau Node App Manager CyberPanel)
5. Konfigurasi OpenLiteSpeed sebagai reverse proxy ke port Node.js app
6. Setup SSL (Let's Encrypt, built-in di CyberPanel)

---

## 7. INTEGRASI UI/UX PRO MAX SKILL (Baru — Design Intelligence Engine)

Repo: [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — sebuah AI skill open-source (MIT license, aktif dikembangkan, rilis terbaru v2.11.0) yang berfungsi sebagai *design intelligence engine* untuk Claude Code, Cursor, Windsurf, dan agent AI lain. Skill ini dipakai selama development untuk memvalidasi dan mempertajam keputusan desain di §3–§4, bukan sebagai pengganti — melainkan sebagai *cross-check* otomatis.

### 7.1 Apa yang Dibawa Skill Ini ke Proyek
- **84 UI Style** dengan rekomendasi "paling cocok untuk apa" per style
- **192 palet warna** yang sudah dipetakan ke kategori produk/industri
- **74 pasangan tipografi** (Google Fonts) siap pakai
- **161 reasoning rules** industri-spesifik — termasuk kategori yang relevan untuk madrasah: **Education**, **Government**, dan **Public Services**
- Dukungan stack **Next.js** secara native — sinkron dengan keputusan framework di §6
- Checklist pre-delivery otomatis (kontras warna, `prefers-reduced-motion`, focus state keyboard) yang melengkapi §8 Checklist di bawah

### 7.2 Instalasi (dijalankan developer, satu kali di root project)
```bash
npm install -g ui-ux-pro-max-cli
cd /path/to/proyek-mtsn2-kebumen
uipro init --ai claude
```

### 7.3 Query Design System Khusus Proyek Ini
Menjalankan reasoning engine dengan kata kunci yang mencerminkan sifat proyek (institusi pendidikan Islam negeri, formal, kepercayaan publik):

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "madrasah islamic education government public trust formal" \
  --design-system -p "MTs Negeri 2 Kebumen" -f markdown
```

**Prediksi hasil mapping berdasarkan kategori resmi di repo** (kategori Government/Education/Public Services diarahkan ke style berikut, sesuai deskripsi masing-masing style di daftar Available Styles repo):

| Domain | Rekomendasi Skill | Kesesuaian dengan Blueprint v2.0 |
|---|---|---|
| **Style utama** | *Accessible & Ethical* — untuk Government, healthcare, education | ✅ Cocok dengan §4 (kontras warna, dark mode, focus state sudah diadopsi) |
| **Style sekunder** | *Inclusive Design* — untuk public services, education, healthcare | ✅ Menguatkan alasan dark mode & aksesibilitas naik ke Fase 1 (§5) |
| **Style aksen** | *Bento Box Grid* — untuk dashboard, product feature, personal | ✅ Selaras dengan revisi Nilai Unggulan jadi bento-grid asimetris (§4.1) |
| **Anti-pattern yang harus dihindari** | Neon/warna mencolok berlebihan, animasi kasar/tersentak, gradient AI ungu-pink generik | ✅ Selaras — palet hijau-emas §4.6 dan easing halus §3 sudah menghindari ini |

### 7.4 Query Lanjutan per Domain (dijalankan saat butuh detail spesifik)
```bash
# Validasi palet warna hijau-emas terhadap kategori islamic/education
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "islamic green gold formal trust" --domain color

# Validasi pasangan Poppins + Inter, cari alternatif jika perlu
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "formal readable professional education" --domain typography

# Guideline UX aksesibilitas & animasi (silang-cek dengan §3 dan §5)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation accessibility reduced motion" --domain ux

# Best practice implementasi khusus Next.js
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hero section responsive layout" --stack nextjs
```

### 7.5 Persist Design System — Satu Sumber Kebenaran
Agar seluruh tim (developer, desainer) bekerja dari referensi yang sama sepanjang proyek, hasil query disimpan permanen di repo:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "madrasah islamic education government" \
  --design-system --persist -p "MTs Negeri 2 Kebumen"

# Override khusus halaman PPDB (conversion-focused, berbeda dari halaman profil)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "admission enrollment conversion trust" \
  --design-system --persist -p "MTs Negeri 2 Kebumen" --page "ppdb"
```

Struktur hasil:
```
design-system/
├── MASTER.md           # Source of truth: warna, tipografi, spacing final proyek
└── pages/
    └── ppdb.md          # Override khusus halaman PPDB (lebih conversion-driven)
```
`MASTER.md` inilah yang menjadi rujukan final saat implementasi §3 dan §4 — jika ada perbedaan antara rekomendasi engine dan keputusan manual di blueprint ini, `MASTER.md` yang dipersist menjadi acuan terbaru karena sudah tervalidasi silang dengan 161 reasoning rules.

### 7.6 Posisi dalam Alur Kerja
```
Blueprint v2.0 (keputusan desain manual: §3 animasi, §4 desain, §5 interaktivitas)
              ↓
UI UX Pro Max — validasi & lengkapi (§7.3-§7.5)
              ↓
design-system/MASTER.md (source of truth final, ter-persist di repo)
              ↓
Implementasi kode Next.js (Phase 1-6 di §8)
```

---

## 8. CHECKLIST IMPLEMENTASI (Revisi Fase 1)

### Phase 1: Foundation
- [ ] Setup Next.js project + Tailwind + Framer Motion
- [ ] Setup CSS variables (colors termasuk dark mode, typography fluid, spacing)
- [ ] Base components (Button dengan magnetic hover, Card dengan hover-lift, Container)
- [ ] Data service layer (dipertahankan dari v1.0)

### Phase 2: Navigation & Tema
- [ ] Header sticky + dark mode toggle
- [ ] Mobile hamburger menu dengan animasi slide
- [ ] Footer dengan pattern ornamen islami

### Phase 3: Homepage (dengan animasi §3 diterapkan penuh)
- [ ] Hero parallax layered
- [ ] Popup modal dengan entrance animation
- [ ] Sambutan split-layout sticky
- [ ] Nilai unggulan bento-grid
- [ ] Stats counter dengan easing
- [ ] Timeline sejarah interaktif (baru)
- [ ] Galeri masonry + filter FLIP animation
- [ ] Peta interaktif fasilitas (baru)
- [ ] Testimoni slider drag-swipe
- [ ] CTA gradient mesh

### Phase 4-5: Halaman Profil, Akademik, Kesiswaan, Informasi
*(sama seperti v1.0 — struktur konten tidak berubah)*

### Phase 6: Polish & Optimization
- [ ] Page transition antar route
- [ ] Search instant dengan debounce
- [ ] WhatsApp floating widget
- [ ] Responsive + accessibility testing
- [ ] Lighthouse 90+ (perhatikan animasi tidak menurunkan performance — gunakan `will-change` secukupnya, hindari animasi di elemen besar)

---

**Perubahan utama v1.0 → v2.0:** layout tidak lagi vertical-stack simetris; setiap animasi punya spesifikasi teknis konkret (bukan kata kunci umum "smooth"); dark mode, search instant, peta interaktif, dan WhatsApp widget naik dari Future Enhancement ke Fase 1; framework ditetapkan Next.js dengan alur deploy CyberPanel yang jelas.

**Perubahan utama v2.0 → v3.0:** integrasi `ui-ux-pro-max-skill` (§7) sebagai design intelligence engine untuk memvalidasi keputusan style (Accessible & Ethical + Inclusive Design + Bento Box Grid), warna, tipografi, dan anti-pattern secara sistematis terhadap 161 reasoning rules industri, dengan `design-system/MASTER.md` sebagai source of truth yang ter-persist di repo sepanjang development.

---

**Prepared by:** Claude (revisi atas blueprint v1.0 oleh GitHub Copilot)
**Date:** 23 Juli 2026
**Version:** 3.0
