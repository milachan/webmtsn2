// ===== Portal Web Berita =====
// Base URL portal berita untuk tautan publik (klien). Dapat dioverride lewat
// NEXT_PUBLIC_BERITA_URL di .env — default menunjuk ke domain produksi
// (berita.mtsnegeri2kebumen.sch.id).
export const BERITA_SITE_URL = (
  process.env.NEXT_PUBLIC_BERITA_URL || 'https://berita.mtsnegeri2kebumen.sch.id'
).replace(/\/+$/, '');

// Guard produksi: nilai NEXT_PUBLIC_BERITA_URL di-inline saat build.
// Jika masih menunjuk ke localhost saat build produksi, semua link berita di situs
// live akan rusak senyap — tampilkan peringatan keras di konsol.
if (
  process.env.NODE_ENV === 'production' &&
  /^(?:https?:)?\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$)/i.test(BERITA_SITE_URL)
) {
  console.error(
    '[berita] NEXT_PUBLIC_BERITA_URL masih menunjuk ke localhost! ' +
      'Set ke domain produksi (mis. https://berita.mtsnegeri2kebumen.sch.id) di .env ' +
      'sebelum build produksi.'
  );
}

/**
 * Bangun tautan ke portal web berita.
 * - Tanpa slug  → halaman daftar berita portal (homepage portal)
 * - Dengan slug → halaman detail berita portal (/berita/{slug})
 */
export function beritaLink(slug?: string): string {
  return slug ? `${BERITA_SITE_URL}/berita/${slug}` : `${BERITA_SITE_URL}/`;
}
