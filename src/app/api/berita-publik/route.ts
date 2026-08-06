import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Route proxy "Berita & Kegiatan Terbaru" — web utama.
 *
 * Web utama (mtsn2_kebumen) dan web berita (mtsn2_berita) memakai database
 * terpisah. Agar berita yang di-upload di web berita otomatis tampil di web
 * utama, route ini mem-baca data dari API publik web berita:
 *
 *   GET {BERITA_API_URL}/api/berita
 *
 * Perilaku:
 *  - Hanya berita berstatus publish (sudah difilter oleh API web berita).
 *  - Cache in-memory 60 detik agar tidak membebani web berita tiap request.
 *  - URL gambar relatif ("/uploads/...") di-absolutkan ke origin web berita,
 *    karena file gambar tersimpan di server web berita, bukan di web utama.
 *  - Jika web berita tidak dapat diakses, fallback ke tabel Berita lokal
 *    (graceful degradation — homepage tidak pernah kosong/error).
 */

const API_ORIGIN = (process.env.BERITA_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
const CACHE_TTL_MS = 60_000; // 60 detik
const FETCH_TIMEOUT_MS = 5_000;

interface CacheEntry {
  data: unknown;
  at: number;
}

let cache: CacheEntry | null = null;

/** Ubah path relatif menjadi URL absolut milik web berita */
function absolutize(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path)) return path; // sudah URL absolut / protocol-relative
  if (path.startsWith('/')) return `${API_ORIGIN}${path}`;
  return path; // data URI / path aneh lainnya — biarkan apa adanya
}

/** Absolutkan src/href relatif di dalam konten HTML (gambar di dalam artikel) */
function absolutizeHtml(html: string): string {
  if (!html) return html;
  return html
    .replace(/(src|href)="\/(?!\/)/g, `$1="${API_ORIGIN}/`)
    .replace(/(src|href)='\/(?!\/)/g, `$1='${API_ORIGIN}/`);
}

/**
 * Sanitasi sisi-server (defense-in-depth): SSR mengirimkan HTML mentah ke browser,
 * jadi pastikan konten yang di-cache & disalurkan tidak membawa tag <script>,
 * atribut handler event, atau URL javascript: sebelum DOMParser client membersihkannya.
 */
function sanitizeServerSide(html: string): string {
  if (!html) return html;
  return html
    // buang tag <script> dan <style> (utuh / self-closing)
    .replace(/<\s*script\b[^>]*>[\s\S]*?<\/\s*script\s*>/gi, '')
    .replace(/<\s*script\b[^>]*\/>/gi, '')
    .replace(/<\s*style\b[^>]*>[\s\S]*?<\/\s*style\s*>/gi, '')
    // buang atribut handler event (onclick, onerror, ...)
    .replace(/\s+on[a-z]+\s*=\s*(["'])[\s\S]*?\1/gi, '')
    // netralkan URL javascript: pada href/src
    .replace(/(\s(?:href|src|xlink:href)\s*=\s*["'])\s*javascript:[^"']*(["'])/gi, '$1$2');
}

interface ExternalBerita {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  category: string;
  image?: string;
  slug: string;
  author?: string;
  views?: number;
}

function normalize(data: unknown): ExternalBerita[] {
  if (!Array.isArray(data)) return [];
  return data.map((b) => {
    const item = (b ?? {}) as ExternalBerita;
    return {
      ...item,
      excerpt: item.excerpt || '',
      image: absolutize(item.image || ''),
      content: item.content ? sanitizeServerSide(absolutizeHtml(item.content)) : '',
    };
  });
}

export async function GET() {
  try {
    // 1) Cache masih hangat?
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      return NextResponse.json(cache.data);
    }

    // 2) Ambil dari web berita (public API — tanpa autentikasi)
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(`${API_ORIGIN}/api/berita`, {
        cache: 'no-store',
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) {
      throw new Error(`Web berita mengembalikan HTTP ${res.status}`);
    }

    const data = await res.json();
    const normalized = normalize(data);
    cache = { data: normalized, at: Date.now() };
    return NextResponse.json(normalized);
  } catch (e) {
    // 3) Fallback: web berita down → tampilkan berita dari DB lokal
    console.warn('[berita-publik] Gagal mengambil berita dari web berita, fallback ke DB lokal:', e);
    try {
      const local = await prisma.berita.findMany({ orderBy: { id: 'desc' } });
      return NextResponse.json(local);
    } catch {
      return NextResponse.json([]);
    }
  }
}

// Hanya baca — web utama tidak lagi mengelola berita (upload dilakukan di web berita)
export const dynamic = 'force-dynamic';
