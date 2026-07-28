import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { requireAdmin } from '@/lib/auth';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// ─── POST /api/upload — Upload & process image ──────────────────
export async function POST(request: NextRequest) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Format tidak didukung. Gunakan: JPG, PNG, atau WEBP` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Ukuran file maksimal 5 MB` },
        { status: 400 }
      );
    }

    // Get resize params: ?resize=false to skip resizing (for logos)
    const shouldResize = request.nextUrl.searchParams.get('resize') !== 'false';
    const width = parseInt(request.nextUrl.searchParams.get('width') || '800', 10);
    const height = parseInt(request.nextUrl.searchParams.get('height') || '600', 10);

    // Generate unique filename
    const ext = path.extname(file.name) || '.jpg';
    const safeExt = ALLOWED_EXTENSIONS.includes(ext.toLowerCase()) ? ext.toLowerCase() : '.jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${random}${safeExt}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    if (shouldResize) {
      // Process with sharp: resize + center crop to exact dimensions
      await sharp(buffer)
        .resize(width, height, {
          fit: 'cover',
          position: 'center',
          withoutEnlargement: false,
        })
        .toFile(filePath);
    } else {
      // Save as-is (for logos with transparent backgrounds)
      await fs.writeFile(filePath, buffer);
    }

    const publicPath = `/uploads/${filename}`;

    return NextResponse.json({
      url: publicPath,
      width,
      height,
      size: file.size,
    });
  } catch (e: any) {
    console.error('[UPLOAD ERROR]', e);
    return NextResponse.json(
      { error: e.message || 'Gagal mengupload gambar' },
      { status: 500 }
    );
  }
}
