import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// ─── Protected path groups ───────────────────────────────────────
// Note: API routes (/api/data, /api/schoolsettings, /api/pesan-masuk)
// are protected at the route level (requireAdmin on mutating methods only).
// Only /admin pages and /api/upload need middleware-level protection.
const ADMIN_PATHS = ['/admin'];

// ─── Edge-compatible JWT verify ──────────────────────────────────
async function verifyEdgeToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return false;
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

// ─── Middleware ───────────────────────────────────────────────────
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Skip public paths: auth API + login page
  if (path.startsWith('/api/auth') || path === '/admin/login') {
    return NextResponse.next();
  }

  // 2. Check if path needs protection
  const needsProtection =
    ADMIN_PATHS.some((p) => path === p || path.startsWith(p + '/'));

  if (!needsProtection) {
    return NextResponse.next();
  }

  // 3. Verify session token
  const token = request.cookies.get('session')?.value;

  if (!token) {
    // API routes → 401 JSON, web routes → redirect to login
    if (path.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }

  const valid = await verifyEdgeToken(token);
  if (!valid) {
    if (path.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });
    return response;
  }

  return NextResponse.next();
}

// ─── Matcher config ──────────────────────────────────────────────
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/upload',
  ],
};
