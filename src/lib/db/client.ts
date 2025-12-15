import "server-only";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL env variable is missing.");
}

const adapter = new PrismaMariaDb(databaseUrl);

const prisma = globalThis.prismaGlobal ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export const getPrismaClient = () => {
  return prisma;
};

export default prisma;
