// utils/prisma.ts (or lib/prisma.ts)
import { PrismaClient } from '@prisma/client'

// Global object to hold the PrismaClient instance
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma