'use client';

import {
  Berita, GaleriItem, Testimoni, Fasilitas, NilaiUnggulan,
  Ekstrakurikuler, Guru, Pengumuman, Agenda,
  TimelineEvent, ProgramUnggulan, HeroSlide, SocialLink,
  Statistik, Prestasi, StrukturPosisi, StrukturGuruBidang,
  KurikulumKategori, Pembiasaan, PmbSettings,
  schoolData as defaultSchoolData, kepalaMadrasah as defaultKepala,
  visiMisi as defaultVisi, tataTertib as defaultTataTertib,
  defaultHeroSlides, defaultSocialLinks, statistikMadrasah as defaultStatistik,
  defaultStrukturOrganisasi, defaultKurikulumData, defaultPmbSettings,
} from './data';
export type { StrukturPosisi, StrukturGuruBidang, KurikulumKategori, Pembiasaan, PmbSettings };

// ===== Re-export types =====
export type {
  Berita, GaleriItem, Testimoni, Fasilitas, NilaiUnggulan,
  Ekstrakurikuler, Guru, Pengumuman, Agenda, TimelineEvent,
  ProgramUnggulan, HeroSlide, SocialLink, Statistik, Prestasi,
};

// ===== API Base =====
const API_BASE = '/api/data';

// ===== In-memory cache =====
interface CacheEntry<T> {
  data: T;
  loaded: boolean;
}

const cache: Record<string, CacheEntry<any>> = {};
export let dataLoaded = false;
const loadCallbacks: Array<() => void> = [];

// ===== Hydration guard (deprecated — getCached no longer checks this) =====
let hydrationGuard = true;

// ===== Reactive store =====
type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  listeners.forEach((fn) => fn());
}

// ===== React hook for reactive store access =====
import { useState, useEffect, useRef } from 'react';

export function useStoreData<T>(getter: () => T): T {
  const [data, setData] = useState(getter);
  const lastRef = useRef<T>(data);

  useEffect(() => {
    // Always sync on mount — covers SSR→client hydration gap where the
    // getter returned the module-level default (same reference) on both
    // server and client, so a reference-equality check would skip the update.
    const next = getter();
    lastRef.current = next;
    setData(next);

    const unsub = subscribe(() => {
      const nextVal = getter();
      if (nextVal !== lastRef.current) {
        lastRef.current = nextVal;
        setData(nextVal);
      }
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data;
}

// ===== Loading state hook =====
export function useStoreLoading(): boolean {
  const [loading, setLoading] = useState(!dataLoaded);

  useEffect(() => {
    if (dataLoaded) {
      setLoading(false);
      return;
    }
    const unsub = subscribe(() => {
      if (dataLoaded) setLoading(false);
    });
    return unsub;
  }, []);

  return loading;
}

// ===== ID Generator =====
let idCounter = Date.now();
export function generateId(): number {
  return ++idCounter;
}

// ===== Data-loaded promise =====
export function onDataLoaded(callback: () => void) {
  if (dataLoaded) {
    callback();
  } else {
    loadCallbacks.push(callback);
  }
}

// ===== API helpers (with proper error logging) =====
async function apiGet<T>(table: string): Promise<T[]> {
  const res = await fetch(`${API_BASE}/${table}`, { cache: 'no-store' });
  if (!res.ok) {
    console.warn(`[apiGet/${table}] HTTP ${res.status} — returning empty array`);
    return [];
  }
  return res.json();
}

async function apiFetch<T>(path: string): Promise<T[]> {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) {
    console.warn(`[apiFetch/${path}] HTTP ${res.status} — returning empty array`);
    return [];
  }
  return res.json();
}

async function apiPost<T>(table: string, data: unknown): Promise<T | null> {
  const res = await fetch(`${API_BASE}/${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.warn(`[apiPost/${table}] HTTP ${res.status} — save failed`);
    return null;
  }
  return res.json();
}

async function apiPut<T>(table: string, id: number, data: unknown): Promise<T | null> {
  const res = await fetch(`${API_BASE}/${table}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.warn(`[apiPut/${table}/${id}] HTTP ${res.status} — update failed`);
    return null;
  }
  return res.json();
}

async function apiDelete(table: string, id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE}/${table}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    console.warn(`[apiDelete/${table}/${id}] HTTP ${res.status} — delete failed`);
  }
  return res.ok;
}

async function apiGetSettings(): Promise<Record<string, any>> {
  const res = await fetch('/api/schoolsettings', { cache: 'no-store' });
  if (!res.ok) return {};
  return res.json();
}

async function apiPostSetting(key: string, value: unknown): Promise<boolean> {
  const res = await fetch('/api/schoolsettings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) {
    console.warn(`[apiPostSetting/${key}] HTTP ${res.status} — save setting failed`);
  }
  return res.ok;
}

// ===== Helper to manage cache entries =====
function getCached<T>(key: string, fallback: T): T {
  // SSR: no cache available — return fallback directly
  if (typeof window === 'undefined') {
    return fallback;
  }
  if (!cache[key]) {
    cache[key] = { data: fallback, loaded: false };
  }
  return cache[key].data as T;
}

function setCached<T>(key: string, data: T): void {
  cache[key] = { data, loaded: true };
}

// ===== Loading promise lock =====
let loadingPromise: Promise<void> | null = null;

// ===== Load all data from API =====
export async function loadAllData(): Promise<void> {
  if (dataLoaded && Object.keys(cache).length > 0) {
    return;
  }
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    try {
      const tables = [
        'galeri', 'testimoni', 'fasilitas',
        'ekstrakurikuler', 'guru', 'pengumuman', 'agenda',
        'sejarah', 'programunggulan', 'nilaiunggulan', 'prestasi',
      ] as const;

      await Promise.all(
        tables.map(async (table) => {
          try {
            const data = await apiGet<any>(table);
            setCached(table, data);
          } catch {
            setCached(table, []);
          }
        })
      );

      // Berita diambil dari portal web berita (bukan DB lokal)
      try {
        const res = await fetch('/api/berita-publik', { cache: 'no-store' });
        const beritaData = res.ok ? await res.json() : [];
        setCached('berita', Array.isArray(beritaData) ? beritaData : []);
      } catch {
        setCached('berita', []);
      }

      try {
        const settings = await apiGetSettings();
        setCached('schoolData', settings.schoolData || defaultSchoolData);
        setCached('kepalaMadrasah', settings.kepalaMadrasah || defaultKepala);
        setCached('visiMisi', settings.visiMisi || defaultVisi);
        setCached('tataTertib', settings.tataTertib || defaultTataTertib);
        setCached('heroSlides', Array.isArray(settings.heroSlides) && settings.heroSlides.length > 0 ? settings.heroSlides : defaultHeroSlides);
        setCached('socialLinks', Array.isArray(settings.socialLinks) && settings.socialLinks.length > 0 ? settings.socialLinks : defaultSocialLinks);
        setCached('popupEnabled', settings.popupEnabled !== false);
        setCached('statistik', Array.isArray(settings.statistik) && settings.statistik.length > 0 ? settings.statistik : defaultStatistik);
        setCached('strukturOrganisasi', settings.strukturOrganisasi || defaultStrukturOrganisasi);
        setCached('kurikulumData', Array.isArray(settings.kurikulumData) ? settings.kurikulumData : defaultKurikulumData);
        setCached('pembiasaanData', Array.isArray(settings.pembiasaanData) ? settings.pembiasaanData : []);
        setCached('pmbSettings', settings.pmbSettings || defaultPmbSettings);
      } catch {
        setCached('schoolData', defaultSchoolData);
        setCached('kepalaMadrasah', defaultKepala);
        setCached('visiMisi', defaultVisi);
        setCached('tataTertib', defaultTataTertib);
        setCached('heroSlides', defaultHeroSlides);
        setCached('socialLinks', defaultSocialLinks);
        setCached('popupEnabled', true);
        setCached('statistik', defaultStatistik);
        setCached('strukturOrganisasi', defaultStrukturOrganisasi);
        setCached('kurikulumData', defaultKurikulumData);
        setCached('pembiasaanData', []);
        setCached('pmbSettings', defaultPmbSettings);
      }

      dataLoaded = true;
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
      notify();
    } catch (e) {
      console.error('[STORE] loadAllData FAILED:', e);
      dataLoaded = true;
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    } finally {
      loadingPromise = null;
    }
  })();

  return loadingPromise;
}

// ===== CRUD factory =====
function createCrud<T extends { id: number }>(
  cacheKey: string,
  getDefaults: () => T[],
  readPath?: string, // custom endpoint untuk baca (mis. /api/berita-publik)
  readOnly = false, // true = mutasi (tambah/ubah/hapus) ditolak — data sumber eksternal
) {
  return {
    getAll: (): T[] => getCached<T[]>(cacheKey, getDefaults()),

    getAllAsync: async (): Promise<T[]> => {
      try {
        const data = await apiFetch<T>(readPath || `${API_BASE}/${cacheKey}`);
        setCached(cacheKey, data);
        return data;
      } catch {
        return getCached<T[]>(cacheKey, getDefaults());
      }
    },

    add: async (item: T): Promise<boolean> => {
      if (readOnly) {
        console.warn(`[createCrud/${cacheKey}] read-only — tambah data ditolak`);
        return false;
      }
      const created = await apiPost<T>(cacheKey, item);
      if (created) {
        const newItems = [...getCached<T[]>(cacheKey, getDefaults()), created];
        setCached(cacheKey, newItems);
        notify();
        return true;
      }
      return false;
    },

    update: async (id: number, data: Partial<T>): Promise<boolean> => {
      if (readOnly) {
        console.warn(`[createCrud/${cacheKey}] read-only — ubah data ditolak`);
        return false;
      }
      const updated = await apiPut<T>(cacheKey, id, data);
      if (updated) {
        const items = getCached<T[]>(cacheKey, getDefaults());
        const newItems = items.map((item) =>
          item.id === id ? { ...item, ...updated } : item
        );
        setCached(cacheKey, newItems);
        notify();
        return true;
      }
      return false;
    },

    remove: async (id: number): Promise<boolean> => {
      if (readOnly) {
        console.warn(`[createCrud/${cacheKey}] read-only — hapus data ditolak`);
        return false;
      }
      const ok = await apiDelete(cacheKey, id);
      if (ok) {
        const items = getCached<T[]>(cacheKey, getDefaults());
        setCached(cacheKey, items.filter((i) => i.id !== id));
        notify();
        return true;
      }
      return false;
    },

    refresh: async (): Promise<T[]> => {
      const data = await apiGet<T>(cacheKey);
      setCached(cacheKey, data);
      notify();
      return data;
    },
  };
}

// ===== Create store instances =====
// Berita dibaca dari portal web berita (route proxy /api/berita-publik),
// bukan dari database lokal — upload & kelola berita dilakukan di web berita.
// readOnly=true: mutasi lewat store ini ditolak (sumber data eksternal).
const beritaCrud = createCrud<Berita>('berita', () => {
  try { return require('./data').beritaTerbaru || []; } catch { return []; }
}, '/api/berita-publik', true);
const galeriCrud = createCrud<GaleriItem>('galeri', () => {
  try { return require('./data').galeriFoto || []; } catch { return []; }
});
const testimoniCrud = createCrud<Testimoni>('testimoni', () => {
  try { return require('./data').testimoni || []; } catch { return []; }
});
const fasilitasCrud = createCrud<Fasilitas>('fasilitas', () => {
  try { return require('./data').fasilitas || []; } catch { return []; }
});
const ekskulCrud = createCrud<Ekstrakurikuler>('ekstrakurikuler', () => {
  try { return require('./data').ekstrakurikuler || []; } catch { return []; }
});
const guruCrud = createCrud<Guru>('guru', () => {
  try { return require('./data').guruTendik || []; } catch { return []; }
});
const pengumumanCrud = createCrud<Pengumuman>('pengumuman', () => {
  try { return require('./data').pengumuman || []; } catch { return []; }
});
const agendaCrud = createCrud<Agenda>('agenda', () => {
  try { return require('./data').agenda || []; } catch { return []; }
});
const sejarahCrud = createCrud<TimelineEvent>('sejarah', () => {
  try { return require('./data').sejarahMadrasah || []; } catch { return []; }
});
const programCrud = createCrud<ProgramUnggulan>('programunggulan', () => {
  try { return require('./data').programUnggulan || []; } catch { return []; }
});
const nilaiCrud = createCrud<NilaiUnggulan>('nilaiunggulan', () => {
  try { return require('./data').nilaiUnggulan || []; } catch { return []; }
});
const prestasiCrud = createCrud<Prestasi>('prestasi', () => {
  try { return require('./data').prestasiData || []; } catch { return []; }
});

// ===== Berita =====
export function getBerita(): Berita[] { return beritaCrud.getAll(); }
export async function loadBerita(): Promise<Berita[]> { return beritaCrud.getAllAsync(); }
export async function addBerita(item: Berita): Promise<boolean> { return beritaCrud.add(item); }
export async function updateBerita(id: number, data: Partial<Berita>): Promise<boolean> { return beritaCrud.update(id, data); }
export async function deleteBerita(id: number): Promise<boolean> { return beritaCrud.remove(id); }

// ===== Galeri =====
export function getGaleri(): GaleriItem[] { return galeriCrud.getAll(); }
export async function loadGaleri(): Promise<GaleriItem[]> { return galeriCrud.getAllAsync(); }
export async function addGaleri(item: GaleriItem): Promise<boolean> { return galeriCrud.add(item); }
export async function updateGaleri(id: number, data: Partial<GaleriItem>): Promise<boolean> { return galeriCrud.update(id, data); }
export async function deleteGaleri(id: number): Promise<boolean> { return galeriCrud.remove(id); }

// ===== Testimoni =====
export function getTestimoni(): Testimoni[] { return testimoniCrud.getAll(); }
export async function loadTestimoni(): Promise<Testimoni[]> { return testimoniCrud.getAllAsync(); }
export async function addTestimoni(item: Testimoni): Promise<boolean> { return testimoniCrud.add(item); }
export async function updateTestimoni(id: number, data: Partial<Testimoni>): Promise<boolean> { return testimoniCrud.update(id, data); }
export async function deleteTestimoni(id: number): Promise<boolean> { return testimoniCrud.remove(id); }

// ===== Fasilitas =====
export function getFasilitas(): Fasilitas[] { return fasilitasCrud.getAll(); }
export async function loadFasilitas(): Promise<Fasilitas[]> { return fasilitasCrud.getAllAsync(); }
export async function addFasilitas(item: Fasilitas): Promise<boolean> { return fasilitasCrud.add(item); }
export async function updateFasilitas(id: number, data: Partial<Fasilitas>): Promise<boolean> { return fasilitasCrud.update(id, data); }
export async function deleteFasilitas(id: number): Promise<boolean> { return fasilitasCrud.remove(id); }

// ===== Ekstrakurikuler =====
export function getEkstrakurikuler(): Ekstrakurikuler[] { return ekskulCrud.getAll(); }
export async function loadEkstrakurikuler(): Promise<Ekstrakurikuler[]> { return ekskulCrud.getAllAsync(); }
export async function addEkstrakurikuler(item: Ekstrakurikuler): Promise<boolean> { return ekskulCrud.add(item); }
export async function updateEkstrakurikuler(id: number, data: Partial<Ekstrakurikuler>): Promise<boolean> { return ekskulCrud.update(id, data); }
export async function deleteEkstrakurikuler(id: number): Promise<boolean> { return ekskulCrud.remove(id); }

// ===== Guru =====
export function getGuru(): Guru[] { return guruCrud.getAll(); }
export async function loadGuru(): Promise<Guru[]> { return guruCrud.getAllAsync(); }
export async function addGuru(item: Guru): Promise<boolean> { return guruCrud.add(item); }
export async function updateGuru(id: number, data: Partial<Guru>): Promise<boolean> { return guruCrud.update(id, data); }
export async function deleteGuru(id: number): Promise<boolean> { return guruCrud.remove(id); }

// ===== Pengumuman =====
export function getPengumuman(): Pengumuman[] { return pengumumanCrud.getAll(); }
export async function loadPengumuman(): Promise<Pengumuman[]> { return pengumumanCrud.getAllAsync(); }
export async function addPengumuman(item: Pengumuman): Promise<boolean> { return pengumumanCrud.add(item); }
export async function updatePengumuman(id: number, data: Partial<Pengumuman>): Promise<boolean> { return pengumumanCrud.update(id, data); }
export async function deletePengumuman(id: number): Promise<boolean> { return pengumumanCrud.remove(id); }

// ===== Agenda =====
export function getAgenda(): Agenda[] { return agendaCrud.getAll(); }
export async function loadAgenda(): Promise<Agenda[]> { return agendaCrud.getAllAsync(); }
export async function addAgenda(item: Agenda): Promise<boolean> { return agendaCrud.add(item); }
export async function updateAgenda(id: number, data: Partial<Agenda>): Promise<boolean> { return agendaCrud.update(id, data); }
export async function deleteAgenda(id: number): Promise<boolean> { return agendaCrud.remove(id); }

// ===== Sejarah =====
export function getSejarah(): TimelineEvent[] { return sejarahCrud.getAll(); }
export async function loadSejarah(): Promise<TimelineEvent[]> { return sejarahCrud.getAllAsync(); }
export async function addSejarah(item: TimelineEvent): Promise<boolean> { return sejarahCrud.add(item); }
export async function updateSejarah(id: number, data: Partial<TimelineEvent>): Promise<boolean> { return sejarahCrud.update(id, data); }
export async function deleteSejarah(id: number): Promise<boolean> { return sejarahCrud.remove(id); }
export async function saveSejarah(data: TimelineEvent[]): Promise<boolean> {
  try {
    const current = getSejarah();
    for (const item of current) {
      await sejarahCrud.remove(item.id);
    }
    for (const item of data) {
      await sejarahCrud.add(item);
    }
    return true;
  } catch {
    return false;
  }
}

// ===== Program Unggulan =====
export function getProgramUnggulan(): ProgramUnggulan[] { return programCrud.getAll(); }
export async function loadProgramUnggulan(): Promise<ProgramUnggulan[]> { return programCrud.getAllAsync(); }
export async function addProgramUnggulan(item: ProgramUnggulan): Promise<boolean> { return programCrud.add(item); }
export async function updateProgramUnggulan(id: number, data: Partial<ProgramUnggulan>): Promise<boolean> { return programCrud.update(id, data); }
export async function deleteProgramUnggulan(id: number): Promise<boolean> { return programCrud.remove(id); }
export async function saveProgramUnggulan(data: ProgramUnggulan[]): Promise<boolean> {
  try {
    const current = getProgramUnggulan();
    for (const item of current) {
      await programCrud.remove(item.id);
    }
    for (const item of data) {
      await programCrud.add(item);
    }
    return true;
  } catch {
    return false;
  }
}

// ===== Prestasi =====
export function getPrestasi(): Prestasi[] { return prestasiCrud.getAll(); }
export async function loadPrestasi(): Promise<Prestasi[]> { return prestasiCrud.getAllAsync(); }
export async function addPrestasi(item: Prestasi): Promise<boolean> { return prestasiCrud.add(item); }
export async function updatePrestasi(id: number, data: Partial<Prestasi>): Promise<boolean> { return prestasiCrud.update(id, data); }
export async function deletePrestasi(id: number): Promise<boolean> { return prestasiCrud.remove(id); }

// ===== Nilai Unggulan =====
export function getNilaiUnggulan(): NilaiUnggulan[] { return nilaiCrud.getAll(); }
export async function loadNilaiUnggulan(): Promise<NilaiUnggulan[]> { return nilaiCrud.getAllAsync(); }
export async function addNilaiUnggulan(item: NilaiUnggulan): Promise<boolean> { return nilaiCrud.add(item); }
export async function updateNilaiUnggulan(id: number, data: Partial<NilaiUnggulan>): Promise<boolean> { return nilaiCrud.update(id, data); }
export async function deleteNilaiUnggulan(id: number): Promise<boolean> { return nilaiCrud.remove(id); }
export async function saveNilaiUnggulan(data: NilaiUnggulan[]): Promise<boolean> {
  try {
    const current = getNilaiUnggulan();
    for (const item of current) {
      await nilaiCrud.remove(item.id);
    }
    for (const item of data) {
      await nilaiCrud.add(item);
    }
    return true;
  } catch {
    return false;
  }
}

// ===== School Settings =====
function getSettingCached<T>(key: string, fallback: T): T {
  return getCached<T>(key, fallback);
}

function setSettingCached<T>(key: string, data: T): void {
  setCached(key, data);
}

function saveSettingWithCache<T>(cacheKey: string, data: T, apiKey: string): Promise<boolean> {
  const prevData = getSettingCached<T>(cacheKey, data as any);
  setSettingCached(cacheKey, data);
  notify(); // Update UI immediately for responsiveness
  return apiPostSetting(apiKey, data).then((ok) => {
    if (!ok) {
      console.warn(`[saveSetting/${apiKey}] API failed — rolling back cache`);
      setSettingCached(cacheKey, prevData);
      notify();
      return false;
    }
    return true;
  });
}

export function getSchoolData() { return getSettingCached('schoolData', defaultSchoolData); }
export async function saveSchoolData(data: typeof defaultSchoolData): Promise<boolean> {
  return saveSettingWithCache('schoolData', data as any, 'schoolData');
}

export function getKepalaMadrasah() { return getSettingCached('kepalaMadrasah', defaultKepala); }
export async function saveKepalaMadrasah(data: typeof defaultKepala): Promise<boolean> {
  return saveSettingWithCache('kepalaMadrasah', data as any, 'kepalaMadrasah');
}

export function getVisiMisi() { return getSettingCached('visiMisi', defaultVisi); }
export async function saveVisiMisi(data: typeof defaultVisi): Promise<boolean> {
  return saveSettingWithCache('visiMisi', data as any, 'visiMisi');
}

export function getTataTertib() { return getSettingCached('tataTertib', defaultTataTertib); }
export async function saveTataTertib(data: typeof defaultTataTertib): Promise<boolean> {
  return saveSettingWithCache('tataTertib', data as any, 'tataTertib');
}

export function getHeroSlides(): HeroSlide[] { return getSettingCached('heroSlides', defaultHeroSlides); }
export async function saveHeroSlides(items: HeroSlide[]): Promise<boolean> {
  return saveSettingWithCache('heroSlides', items as any, 'heroSlides');
}

export function getSocialLinks(): SocialLink[] { return getSettingCached('socialLinks', defaultSocialLinks); }
export async function saveSocialLinks(items: SocialLink[]): Promise<boolean> {
  return saveSettingWithCache('socialLinks', items as any, 'socialLinks');
}

export function getPopupEnabled(): boolean { return getSettingCached('popupEnabled', true); }
export async function savePopupEnabled(enabled: boolean): Promise<boolean> {
  return saveSettingWithCache('popupEnabled', enabled as any, 'popupEnabled');
}

export function getStatistik() { return getSettingCached('statistik', defaultStatistik); }
export async function saveStatistik(data: typeof defaultStatistik): Promise<boolean> {
  return saveSettingWithCache('statistik', data as any, 'statistik');
}

export function getStrukturOrganisasi() { return getSettingCached('strukturOrganisasi', defaultStrukturOrganisasi); }
export async function saveStrukturOrganisasi(data: typeof defaultStrukturOrganisasi): Promise<boolean> {
  return saveSettingWithCache('strukturOrganisasi', data as any, 'strukturOrganisasi');
}

export function getKurikulumData(): KurikulumKategori[] { return getSettingCached('kurikulumData', defaultKurikulumData); }
export async function saveKurikulumData(data: KurikulumKategori[]): Promise<boolean> {
  return saveSettingWithCache('kurikulumData', data as any, 'kurikulumData');
}

export function getPembiasaanData(): Pembiasaan[] { return getSettingCached('pembiasaanData', []); }
export async function savePembiasaanData(data: Pembiasaan[]): Promise<boolean> {
  return saveSettingWithCache('pembiasaanData', data as any, 'pembiasaanData');
}

export function getPmbSettings(): PmbSettings { return getSettingCached('pmbSettings', defaultPmbSettings); }
export async function savePmbSettings(data: PmbSettings): Promise<boolean> {
  return saveSettingWithCache('pmbSettings', data as any, 'pmbSettings');
}

// ===== Reset All =====
export async function resetAllData(): Promise<void> {
  // 'berita' sengaja dikecualikan — sumber datanya portal web berita (bukan DB lokal)
  const tableNames = [
    'galeri', 'testimoni', 'fasilitas',
    'ekstrakurikuler', 'guru', 'pengumuman', 'agenda',
    'sejarah', 'programunggulan', 'nilaiunggulan', 'prestasi',
  ];

  for (const table of tableNames) {
    try {
      const items = getCached<any[]>(table, []);
      for (const item of items) {
        await apiDelete(table, item.id);
      }
      setCached(table, []);
    } catch { /* ignore */ }
  }

  notify();
}

// ===== Seed default data if empty (per-table) =====
export async function seedIfEmpty(): Promise<void> {
  try {
    const {
      beritaTerbaru, galeriFoto, testimoni,
      fasilitas, ekstrakurikuler, guruTendik,
      pengumuman, agenda, sejarahMadrasah,
      programUnggulan, nilaiUnggulan, prestasiData,
    } = await import('./data');

    const tables = [
      { name: 'berita', items: beritaTerbaru, getter: getBerita },
      { name: 'galeri', items: galeriFoto, getter: getGaleri },
      { name: 'testimoni', items: testimoni, getter: getTestimoni },
      { name: 'fasilitas', items: fasilitas, getter: getFasilitas },
      { name: 'ekstrakurikuler', items: ekstrakurikuler, getter: getEkstrakurikuler },
      { name: 'guru', items: guruTendik, getter: getGuru },
      { name: 'pengumuman', items: pengumuman, getter: getPengumuman },
      { name: 'agenda', items: agenda, getter: getAgenda },
      { name: 'sejarah', items: sejarahMadrasah, getter: getSejarah },
      { name: 'programunggulan', items: programUnggulan, getter: getProgramUnggulan },
      { name: 'nilaiunggulan', items: nilaiUnggulan, getter: getNilaiUnggulan },
      { name: 'prestasi', items: prestasiData, getter: getPrestasi },
    ] as const;

    await Promise.all(
      tables.map(async ({ name, items, getter }) => {
        // Only seed this specific table if its cache is still empty
        if (getter().length > 0 || items.length === 0) return;
        for (const item of items as any[]) {
          await apiPost(name, item);
        }
        const data = await apiGet<any>(name);
        setCached(name, data);
      })
    );

    notify();
  } catch (e) {
    console.error('Seed failed (database may already have data):', e);
  }
}
