'use client';

import {
  Berita, GaleriItem, Testimoni, Fasilitas, NilaiUnggulan,
  Statistik, Ekstrakurikuler, Guru, Pengumuman, Agenda,
  TimelineEvent,
  beritaTerbaru, galeriFoto, testimoni, fasilitas,
  nilaiUnggulan, statistikMadrasah, ekstrakurikuler, guruTendik,
  pengumuman, agenda, schoolData, kepalaMadrasah, visiMisi,
  sejarahMadrasah, tataTertib, programUnggulan,
} from './data';

// ===== Re-export types =====
export type { Berita, GaleriItem, Testimoni, Fasilitas, NilaiUnggulan, Statistik, Ekstrakurikuler, Guru, Pengumuman, Agenda, TimelineEvent };

// ===== API / Storage Dual-Mode =====
// - Lokal (default): localStorage → cocok untuk development tanpa database
// - API (NEXT_PUBLIC_USE_API=true): panggil API routes → cocok untuk deploy dengan MySQL

const USE_API = typeof window !== 'undefined' && 
  (process.env.NEXT_PUBLIC_USE_API === 'true' || 
   window.location.hostname !== 'localhost' && 
   window.location.hostname !== '127.0.0.1');

const API_BASE = '/api/data';

// ===== API Helpers =====
async function apiGet<T>(table: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/${table}`);
    if (!res.ok) return null;
    return await res.json() as T;
  } catch {
    return null;
  }
}

async function apiPost(table: string, data: unknown): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function apiDelete(table: string, id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/${table}?id=${id}`, { method: 'DELETE' });
    return res.ok;
  } catch {
    return false;
  }
}

// ===== Storage Keys =====
const KEYS = {
  berita: 'mtsn_admin_berita',
  galeri: 'mtsn_admin_galeri',
  testimoni: 'mtsn_admin_testimoni',
  fasilitas: 'mtsn_admin_fasilitas',
  nilaiUnggulan: 'mtsn_admin_nilai_unggulan',
  ekstrakurikuler: 'mtsn_admin_ekstrakurikuler',
  guru: 'mtsn_admin_guru',
  pengumuman: 'mtsn_admin_pengumuman',
  agenda: 'mtsn_admin_agenda',
  schoolData: 'mtsn_admin_school_data',
  kepalaMadrasah: 'mtsn_admin_kepala',
  visiMisi: 'mtsn_admin_visi_misi',
  sejarah: 'mtsn_admin_sejarah',
  tataTertib: 'mtsn_admin_tata_tertib',
  programUnggulan: 'mtsn_admin_program_unggulan',
} as const;

// ===== Generic Helpers =====
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* ignore */ }
  return fallback;
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

// ===== Reactive store =====
type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((fn) => fn());
}

// ===== ID Generator =====
let idCounter = Date.now();
export function generateId(): number {
  return ++idCounter;
}

// ===== Generic CRUD Factory =====
function createCrud<T extends { id: number }>(
  storageKey: string,
  apiTable: string,
  fallbackData: T[],
) {
  const get = (): T[] => loadFromStorage<T[]>(storageKey, fallbackData);

  return {
    getAll: get,

    add: async (item: T): Promise<void> => {
      const items = get();
      items.push(item);
      saveToStorage(storageKey, items);
      if (USE_API) await apiPost(apiTable, item);
      notify();
    },

    update: async (id: number, data: Partial<T>): Promise<void> => {
      const items = get();
      const idx = items.findIndex((i) => i.id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...data };
        saveToStorage(storageKey, items);
        if (USE_API) await apiPost(apiTable, { id, ...data });
        notify();
      }
    },

    remove: async (id: number): Promise<void> => {
      const items = get();
      saveToStorage(storageKey, items.filter((i) => i.id !== id));
      if (USE_API) await apiDelete(apiTable, id);
      notify();
    },

    saveAll: (items: T[]): void => {
      saveToStorage(storageKey, items);
      if (USE_API) items.forEach((item) => apiPost(apiTable, item));
      notify();
    },

    getRaw: get,
  };
}

// ===== Create store instances =====
const beritaStore = createCrud<Berita>(KEYS.berita, 'berita', beritaTerbaru);
const galeriStore = createCrud<GaleriItem>(KEYS.galeri, 'galeri', galeriFoto);
const testimoniStore = createCrud<Testimoni>(KEYS.testimoni, 'testimoni', testimoni);
const fasilitasStore = createCrud<Fasilitas>(KEYS.fasilitas, 'fasilitas', fasilitas);
const ekskulStore = createCrud<Ekstrakurikuler>(KEYS.ekstrakurikuler, 'ekstrakurikuler', ekstrakurikuler);
const guruStore = createCrud<Guru>(KEYS.guru, 'guru', guruTendik);
const pengumumanStore = createCrud<Pengumuman>(KEYS.pengumuman, 'pengumuman', pengumuman);
const agendaStore = createCrud<Agenda>(KEYS.agenda, 'agenda', agenda);

// ===== Berita =====
export function getBerita(): Berita[] { return beritaStore.getRaw(); }
export function saveBerita(items: Berita[]): void { beritaStore.saveAll(items); }
export function addBerita(item: Berita): void { beritaStore.add(item); }
export function updateBerita(id: number, data: Partial<Berita>): void { beritaStore.update(id, data); }
export function deleteBerita(id: number): void { beritaStore.remove(id); }

// ===== Galeri =====
export function getGaleri(): GaleriItem[] { return galeriStore.getRaw(); }
export function saveGaleri(items: GaleriItem[]): void { galeriStore.saveAll(items); }
export function addGaleri(item: GaleriItem): void { galeriStore.add(item); }
export function updateGaleri(id: number, data: Partial<GaleriItem>): void { galeriStore.update(id, data); }
export function deleteGaleri(id: number): void { galeriStore.remove(id); }

// ===== Testimoni =====
export function getTestimoni(): Testimoni[] { return testimoniStore.getRaw(); }
export function saveTestimoni(items: Testimoni[]): void { testimoniStore.saveAll(items); }
export function addTestimoni(item: Testimoni): void { testimoniStore.add(item); }
export function updateTestimoni(id: number, data: Partial<Testimoni>): void { testimoniStore.update(id, data); }
export function deleteTestimoni(id: number): void { testimoniStore.remove(id); }

// ===== Fasilitas =====
export function getFasilitas(): Fasilitas[] { return fasilitasStore.getRaw(); }
export function saveFasilitas(items: Fasilitas[]): void { fasilitasStore.saveAll(items); }
export function addFasilitas(item: Fasilitas): void { fasilitasStore.add(item); }
export function updateFasilitas(id: number, data: Partial<Fasilitas>): void { fasilitasStore.update(id, data); }
export function deleteFasilitas(id: number): void { fasilitasStore.remove(id); }

// ===== Ekstrakurikuler =====
export function getEkstrakurikuler(): Ekstrakurikuler[] { return ekskulStore.getRaw(); }
export function saveEkstrakurikuler(items: Ekstrakurikuler[]): void { ekskulStore.saveAll(items); }
export function addEkstrakurikuler(item: Ekstrakurikuler): void { ekskulStore.add(item); }
export function updateEkstrakurikuler(id: number, data: Partial<Ekstrakurikuler>): void { ekskulStore.update(id, data); }
export function deleteEkstrakurikuler(id: number): void { ekskulStore.remove(id); }

// ===== Guru =====
export function getGuru(): Guru[] { return guruStore.getRaw(); }
export function saveGuru(items: Guru[]): void { guruStore.saveAll(items); }
export function addGuru(item: Guru): void { guruStore.add(item); }
export function updateGuru(id: number, data: Partial<Guru>): void { guruStore.update(id, data); }
export function deleteGuru(id: number): void { guruStore.remove(id); }

// ===== Pengumuman =====
export function getPengumuman(): Pengumuman[] { return pengumumanStore.getRaw(); }
export function savePengumuman(items: Pengumuman[]): void { pengumumanStore.saveAll(items); }
export function addPengumuman(item: Pengumuman): void { pengumumanStore.add(item); }
export function updatePengumuman(id: number, data: Partial<Pengumuman>): void { pengumumanStore.update(id, data); }
export function deletePengumuman(id: number): void { pengumumanStore.remove(id); }

// ===== Agenda =====
export function getAgenda(): Agenda[] { return agendaStore.getRaw(); }
export function saveAgenda(items: Agenda[]): void { agendaStore.saveAll(items); }
export function addAgenda(item: Agenda): void { agendaStore.add(item); }
export function updateAgenda(id: number, data: Partial<Agenda>): void { agendaStore.update(id, data); }
export function deleteAgenda(id: number): void { agendaStore.remove(id); }

// ===== School Data =====
export function getSchoolData() {
  return loadFromStorage(KEYS.schoolData, schoolData);
}
export function saveSchoolData(data: typeof schoolData): void {
  saveToStorage(KEYS.schoolData, data);
  if (USE_API) apiPost('schoolsetting', { key: 'schoolData', value: JSON.stringify(data) });
  notify();
}

// ===== Kepala Madrasah =====
export function getKepalaMadrasah() {
  return loadFromStorage(KEYS.kepalaMadrasah, kepalaMadrasah);
}
export function saveKepalaMadrasah(data: typeof kepalaMadrasah): void {
  saveToStorage(KEYS.kepalaMadrasah, data);
  if (USE_API) apiPost('schoolsetting', { key: 'kepalaMadrasah', value: JSON.stringify(data) });
  notify();
}

// ===== Visi Misi =====
export function getVisiMisi() {
  return loadFromStorage(KEYS.visiMisi, visiMisi);
}
export function saveVisiMisi(data: typeof visiMisi): void {
  saveToStorage(KEYS.visiMisi, data);
  if (USE_API) apiPost('schoolsetting', { key: 'visiMisi', value: JSON.stringify(data) });
  notify();
}

// ===== Sejarah =====
export function getSejarah(): TimelineEvent[] {
  return loadFromStorage<TimelineEvent[]>(KEYS.sejarah, sejarahMadrasah);
}
export function saveSejarah(data: TimelineEvent[]): void {
  saveToStorage(KEYS.sejarah, data);
  if (USE_API) data.forEach((item) => apiPost('sejarah', item));
  notify();
}

// ===== Tata Tertib =====
export function getTataTertib() {
  return loadFromStorage(KEYS.tataTertib, tataTertib);
}
export function saveTataTertib(data: typeof tataTertib): void {
  saveToStorage(KEYS.tataTertib, data);
  if (USE_API) apiPost('schoolsetting', { key: 'tataTertib', value: JSON.stringify(data) });
  notify();
}

// ===== Program Unggulan =====
export function getProgramUnggulan() {
  return loadFromStorage(KEYS.programUnggulan, programUnggulan);
}
export function saveProgramUnggulan(data: typeof programUnggulan): void {
  saveToStorage(KEYS.programUnggulan, data);
  if (USE_API) data.forEach((item) => apiPost('programunggulan', item));
  notify();
}

// ===== Nilai Unggulan =====
export function getNilaiUnggulan(): NilaiUnggulan[] {
  return loadFromStorage<NilaiUnggulan[]>(KEYS.nilaiUnggulan, nilaiUnggulan);
}
export function saveNilaiUnggulan(items: NilaiUnggulan[]): void {
  saveToStorage(KEYS.nilaiUnggulan, items);
  if (USE_API) items.forEach((item) => apiPost('nilaiunggulan', item));
  notify();
}

// ===== Reset All =====
export function resetAllData(): void {
  Object.values(KEYS).forEach((key) => {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  });
  notify();
}

// ===== Sync from API to localStorage =====
export async function syncFromApi(): Promise<boolean> {
  if (!USE_API) return false;
  try {
    const tables = ['berita', 'galeri', 'testimoni', 'fasilitas', 'ekstrakurikuler', 'guru', 'pengumuman', 'agenda', 'sejarah', 'programunggulan', 'nilaiunggulan'] as const;
    for (const table of tables) {
      const data = await apiGet<any[]>(table);
      if (data && data.length > 0) {
        localStorage.setItem(`mtsn_admin_${table}`, JSON.stringify(data));
      }
    }
    notify();
    return true;
  } catch {
    return false;
  }
}
