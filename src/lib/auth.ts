import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

// ─── Validate required env vars at startup ───────────────────────
function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val || val.trim() === '') {
    throw new Error(
      `❌ ${name} tidak diset! Tambahkan ke file .env.local\n` +
      `   Contoh: ${name}=your-value-here`
    );
  }
  return val;
}

const JWT_SECRET = new TextEncoder().encode(requireEnv('JWT_SECRET'));
const ADMIN_USERNAME = requireEnv('ADMIN_USERNAME');
// Hash password saat startup (plain text → bcrypt, menghindari $ expansion di dotenv)
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(requireEnv('ADMIN_PASSWORD'), 12);

// ─── Token lifespan ───────────────────────────────────────────────
const TOKEN_EXPIRY = '24h';
const COOKIE_NAME = 'session';

// ─── JWT sign ─────────────────────────────────────────────────────
export async function signToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

// ─── JWT verify ───────────────────────────────────────────────────
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

// ─── Validate credentials ─────────────────────────────────────────
export async function validateCredentials(
  username: string,
  password: string
): Promise<boolean> {
  if (username !== ADMIN_USERNAME) return false;
  try {
    return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  } catch {
    return false;
  }
}

// ─── Defense-in-depth: validate token from request cookie ────────
import type { NextRequest } from 'next/server';

export async function requireAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export { COOKIE_NAME };
