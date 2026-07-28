import { NextRequest } from 'next/server';
import {
  getModel, validateRequired, parseBody,
  errorResponse, successResponse,
} from '@/lib/api-helper';
import { requireAdmin } from '@/lib/auth';
import type { PrismaClient } from '@/generated/prisma/client';

// ─── GET /api/data/[table] — List all records ────────────────────
export async function GET(
  _request: NextRequest,
  { params }: { params: { table: string } },
) {
  try {
    const model = getModel(params.table);
    const data = await model.findMany({ orderBy: { id: 'desc' } });
    return successResponse(data);
  } catch (e: any) {
    console.error(`[GET /api/data/${params.table}] ERROR:`, e);
    return errorResponse(e.message || 'Internal server error', 500);
  }
}

// ─── POST /api/data/[table] — Create a record ────────────────────
export async function POST(
  request: NextRequest,
  { params }: { params: { table: string } },
) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) return errorResponse('Unauthorized', 401);

    const body = await parseBody(request);
    if (!body) return errorResponse('Invalid JSON body');

    const missing = validateRequired(params.table, body);
    if (missing.length > 0) {
      return errorResponse(`Missing required fields: ${missing.join(', ')}`);
    }

    const { id, ...createData } = body as any;

    const model = getModel(params.table);
    const created = await model.create({ data: createData });
    return successResponse(created, 201);
  } catch (e: any) {
    console.error(`[POST /api/data/${params.table}] ERROR:`, e);
    return errorResponse(e.message || 'Internal server error', 500);
  }
}

