import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Allowed table names
const TABLES = [
  'berita', 'pengumuman', 'agenda', 'fasilitas', 'guru',
  'ekstrakurikuler', 'galeri', 'testimoni', 'nilaiunggulan',
  'sejarah', 'programunggulan', 'schoolsetting',
] as const;

type TableName = (typeof TABLES)[number];

function isValidTable(table: string): table is TableName {
  return TABLES.includes(table as TableName);
}

function getPrismaTable(table: TableName) {
  const map: Record<TableName, string> = {
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
    schoolsetting: 'schoolSetting',
  };
  return map[table] as keyof typeof prisma;
}

// GET: List all items
export async function GET(
  req: NextRequest,
  { params }: { params: { table: string } }
) {
  const { table } = params;
  if (!isValidTable(table)) {
    return NextResponse.json({ error: 'Table tidak valid' }, { status: 400 });
  }

  try {
    const modelName = getPrismaTable(table);
    const data = await (prisma[modelName] as any).findMany({ orderBy: { id: 'desc' } });
    return NextResponse.json(data);
  } catch (e) {
    console.error('DB Error:', e);
    return NextResponse.json({ error: 'Database tidak tersedia' }, { status: 500 });
  }
}

// POST: Create OR Update item
// - If body has `id`: update existing record
// - If body has `key` (schoolsetting): upsert (create or update)
// - Otherwise: create new record
export async function POST(
  req: NextRequest,
  { params }: { params: { table: string } }
) {
  const { table } = params;
  if (!isValidTable(table)) {
    return NextResponse.json({ error: 'Table tidak valid' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const modelName = getPrismaTable(table);
    
    let item;
    // Handle SchoolSetting upsert (unique key constraint)
    if (table === 'schoolsetting' && body.key) {
      item = await (prisma[modelName] as any).upsert({
        where: { key: body.key },
        update: { value: body.value },
        create: { key: body.key, value: body.value },
      });
    } else if (body.id != null) {
      // Update existing by id
      const { id, ...data } = body;
      item = await (prisma[modelName] as any).update({ 
        where: { id: Number(id) }, 
        data 
      });
    } else {
      // Create new
      item = await (prisma[modelName] as any).create({ data: body });
    }
    
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    console.error('DB Error:', e);
    return NextResponse.json({ error: 'Database tidak tersedia' }, { status: 500 });
  }
}

// DELETE: Delete item by id (pass id in body or query)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { table: string } }
) {
  const { table } = params;
  if (!isValidTable(table)) {
    return NextResponse.json({ error: 'Table tidak valid' }, { status: 400 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID diperlukan' }, { status: 400 });
    }
    const modelName = getPrismaTable(table);
    await (prisma[modelName] as any).delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('DB Error:', e);
    return NextResponse.json({ error: 'Database tidak tersedia' }, { status: 500 });
  }
}
