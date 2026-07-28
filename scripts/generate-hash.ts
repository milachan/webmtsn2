/**
 * Generate bcrypt hash untuk password admin.
 * Cara pakai: npx ts-node scripts/generate-hash.ts "passwordku123"
 * Atau:       npx tsx scripts/generate-hash.ts "passwordku123"
 */
import bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password) {
  console.error('Usage: npx tsx scripts/generate-hash.ts <password>');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(12);
const hash = bcrypt.hashSync(password, salt);

console.log('\n=== COPY INI KE .env.local ===');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('===============================\n');
