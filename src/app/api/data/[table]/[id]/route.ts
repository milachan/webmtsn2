import { NextRequest } from 'next/server';
import {
  getModel, parseBody,
  errorResponse, successResponse,
} from '@/lib/api-helper';
import { requireAdmin } from '@/lib/auth';

// ─── PUT /api/data/[table]/[id] — Update a record ────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: { table: string; id: string } },
) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) return errorResponse('Unauthorized', 401);

    const body = await parseBody(request);
    if (!body) return errorResponse('Invalid JSON body');

    const model = getModel(params.table);
    const { id: _, ...updateData } = body as any;
    const updated = await model.update({
      where: { id: Number(params.id) },
      data: updateData,
    });
    return successResponse(updated);
  } catch (e: any) {
    console.error(`[PUT /api/data/${params.table}/${params.id}] ERROR:`, e);
    return errorResponse(e.message || 'Internal server error', 500);
  }
}

// ─── DELETE /api/data/[table]/[id] — Delete a record ──────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: { table: string; id: string } },
) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) return errorResponse('Unauthorized', 401);

    const model = getModel(params.table);
    await model.delete({ where: { id: Number(params.id) } });
    return successResponse({ success: true });
  } catch (e: any) {
    console.error(`[DELETE /api/data/${params.table}/${params.id}] ERROR:`, e);
    if (e.code === 'P2025') {
      return errorResponse('Record not found', 404);
    }
    return errorResponse(e.message || 'Internal server error', 500);
  }
}
