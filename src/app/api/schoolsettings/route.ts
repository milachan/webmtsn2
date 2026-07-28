import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { parseBody, errorResponse, successResponse } from '@/lib/api-helper';
import { requireAdmin } from '@/lib/auth';

// ─── GET /api/schoolsettings — List all settings ──────────────────
export async function GET() {
  try {
    const settings = await prisma.schoolSetting.findMany();
    // Convert to key-value object
    const result: Record<string, any> = {};
    for (const setting of settings) {
      try {
        result[setting.key] = JSON.parse(setting.value);
      } catch {
        result[setting.key] = setting.value;
      }
    }
    return successResponse(result);
  } catch (e: any) {
    return errorResponse(e.message || 'Internal server error', 500);
  }
}

// ─── POST /api/schoolsettings — Upsert a setting ──────────────────
export async function POST(request: NextRequest) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) return errorResponse('Unauthorized', 401);

    const body = await parseBody(request);
    if (!body) return errorResponse('Invalid JSON body');
    if (!body.key || typeof body.key !== 'string') {
      return errorResponse('Missing required field: key');
    }

    const value = typeof body.value === 'string'
      ? body.value
      : JSON.stringify(body.value);

    const setting = await prisma.schoolSetting.upsert({
      where: { key: body.key },
      update: { value },
      create: { key: body.key, value },
    });

    return successResponse(setting, 201);
  } catch (e: any) {
    return errorResponse(e.message || 'Internal server error', 500);
  }
}

// ─── DELETE /api/schoolsettings — Delete by key ───────────────────
export async function DELETE(request: NextRequest) {
  try {
    const authed = await requireAdmin(request);
    if (!authed) return errorResponse('Unauthorized', 401);

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    if (!key) return errorResponse('Missing query param: key');

    await prisma.schoolSetting.delete({ where: { key } });
    return successResponse({ deleted: true });
  } catch (e: any) {
    if (e.code === 'P2025') {
      return errorResponse('Setting not found', 404);
    }
    return errorResponse(e.message || 'Internal server error', 500);
  }
}
