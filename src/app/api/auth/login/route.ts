import { NextRequest, NextResponse } from 'next/server';
import { signToken, validateCredentials, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const valid = await validateCredentials(username, password);
    if (!valid) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    const token = await signToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires,
    });

    return response;
  } catch (e: any) {
    console.error('[LOGIN ERROR]', e);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
