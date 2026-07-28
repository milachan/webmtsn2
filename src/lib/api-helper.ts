import prisma from './prisma';

// ─── Table name mapping (URL slug → Prisma model) ────────────────
export const TABLE_MAP: Record<string, string> = {
  berita: 'berita',
  pengumuman: 'pengumuman',
  agenda: 'agenda',
  fasilitas: 'fasilitas',
  guru: 'guru',
  ekstrakurikuler: 'ekstrakurikuler',
  galeri: 'galeri',
  testimoni: 'testimoni',
  nilaiunggulan: 'nilaiUnggulan',
  sejarah: 'sejarah',
  programunggulan: 'programUnggulan',
  prestasi: 'prestasi',
  // schoolsettings is handled specially — it's a key-value store
};

// ─── Fields that are required (non-nullable) per model ───────────
const REQUIRED_FIELDS: Record<string, string[]> = {
  berita: ['title', 'excerpt', 'date', 'category', 'slug'],
  pengumuman: ['title', 'date', 'content', 'priority'],
  agenda: ['title', 'date', 'time', 'location', 'description'],
  fasilitas: ['name', 'description', 'icon', 'image'],
  guru: ['name', 'position', 'subject', 'image'],
  ekstrakurikuler: ['name', 'description', 'icon', 'category'],
  galeri: ['title', 'category', 'image', 'description'],
  testimoni: ['name', 'role', 'content'],
  nilaiunggulan: ['title', 'description', 'icon'],
  sejarah: ['year', 'title', 'description'],
  programunggulan: ['title', 'description', 'icon'],
  prestasi: ['tahun', 'bidang', 'prestasi', 'tingkat'],
};

// ─── Get Prisma model delegate ───────────────────────────────────
export function getModel(table: string) {
  const modelName = TABLE_MAP[table];
  if (!modelName) {
    throw new Error(`Unknown table: '${table}'. Valid tables: ${Object.keys(TABLE_MAP).join(', ')}`);
  }
  const model = (prisma as any)[modelName];
  if (!model) {
    throw new Error(`Prisma model '${modelName}' not found. Did you run 'prisma generate'?`);
  }
  return model;
}

// ─── Validate required fields ─────────────────────────────────────
export function validateRequired(table: string, body: Record<string, unknown>): string[] {
  const required = REQUIRED_FIELDS[table];
  if (!required) return [];
  const missing: string[] = [];
  for (const field of required) {
    if (body[field] === undefined || body[field] === null || String(body[field]).trim() === '') {
      missing.push(field);
    }
  }
  return missing;
}

// ─── Standard error response ──────────────────────────────────────
export function errorResponse(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

// ─── Standard success response ────────────────────────────────────
export function successResponse(data: unknown, status = 200) {
  return Response.json(data, { status });
}

// ─── Parse JSON body safely ───────────────────────────────────────
export async function parseBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
