import "server-only";

import { createRequire } from "node:module";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";

type PrismaClientInstance = Record<PropertyKey, unknown>;

type PrismaClientConstructor = new (options: { adapter: PrismaMariaDb }) => PrismaClientInstance;

declare global {
  var prismaGlobal: PrismaClientInstance | undefined;
}

function loadPrismaClientConstructor() {
  const require = createRequire(import.meta.url);
  const prismaModule = require("@prisma/client") as {
    PrismaClient?: PrismaClientConstructor;
  };

  if (!prismaModule.PrismaClient) {
    throw new Error(
      "Prisma client is not generated. Run `pnpm prisma:generate` after configuring the backend environment.",
    );
  }

  return prismaModule.PrismaClient;
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Prisma client is available only after the backend environment is set up.",
    );
  }

  const PrismaClient = loadPrismaClientConstructor();

  return new PrismaClient({
    adapter: new PrismaMariaDb(databaseUrl),
  });
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPrismaClient() {
  if (globalThis.prismaGlobal) {
    return globalThis.prismaGlobal;
  }

  const prismaClient = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prismaClient;
  }

  return prismaClient;
}

const prisma = new Proxy({} as PrismaClientInstance, {
  get(_target, property, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, property, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
  set(_target, property, value, receiver) {
    const client = getPrismaClient();
    return Reflect.set(client, property, value, receiver);
  },
});

export default prisma;
