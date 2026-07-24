import { PrismaClient } from '@/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/mtsn2_kebumen';
  // PrismaMariaDb accepts connection string directly (use mariadb:// prefix)
  const connectionUrl = url.replace(/^mysql:\/\//, 'mariadb://');
  const dbName = url.split('/').pop()?.split('?')[0] || 'mtsn2_kebumen';
  const adapter = new PrismaMariaDb(connectionUrl, { database: dbName });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
