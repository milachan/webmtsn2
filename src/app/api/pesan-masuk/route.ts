import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { parseBody, errorResponse, successResponse } from '@/lib/api-helper';
import { requireAdmin } from '@/lib/auth';

// ─── GET /api/pesan-masuk — List all messages ────────────────────
export async function GET(request: NextRequest) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) return errorResponse('Unauthorized', 401);

    const messages = await prisma.pesanMasuk.findMany({ orderBy: { id: 'desc' } });
    return successResponse(messages);
  } catch (e: any) {
    return errorResponse(e.message || 'Internal server error', 500);
  }
}

// ─── POST /api/pesan-masuk — Create a new message (public form) ──
export async function POST(request: NextRequest) {
  try {
    const body = await parseBody(request);
    if (!body) return errorResponse('Invalid JSON body');

    const { name, email, subject, message } = body as any;
    if (!name || !email || !subject || !message) {
      return errorResponse('Missing required fields: name, email, subject, message');
    }

    const created = await prisma.pesanMasuk.create({
      data: { name, email, subject, message },
    });

    return successResponse(created, 201);
  } catch (e: any) {
    console.error('[POST /api/pesan-masuk] ERROR:', e);
    return errorResponse(e.message || 'Internal server error', 500);
  }
}

// ─── PATCH /api/pesan-masuk — Mark as read ───────────────────────
export async function PATCH(request: NextRequest) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) return errorResponse('Unauthorized', 401);

    const body = await parseBody(request);
    if (!body) return errorResponse('Invalid JSON body');

    const { id, read } = body as any;
    if (!id) return errorResponse('Missing required field: id');

    const updated = await prisma.pesanMasuk.update({
      where: { id: Number(id) },
      data: { read: read === true },
    });

    return successResponse(updated);
  } catch (e: any) {
    return errorResponse(e.message || 'Internal server error', 500);
  }
}

// ─── DELETE /api/pesan-masuk — Delete by id ──────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) return errorResponse('Unauthorized', 401);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return errorResponse('Missing query param: id');

    await prisma.pesanMasuk.delete({ where: { id: Number(id) } });
    return successResponse({ deleted: true });
  } catch (e: any) {
    if (e.code === 'P2025') {
      return errorResponse('Message not found', 404);
    }
    return errorResponse(e.message || 'Internal server error', 500);
  }
}
