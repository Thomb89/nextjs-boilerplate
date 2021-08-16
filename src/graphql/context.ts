import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

type global = typeof globalThis & { prisma: any };

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as global).prisma) {
    (global as global).prisma = new PrismaClient();
  }

  prisma = (global as global).prisma;
}

export type Context = {
  prisma: PrismaClient;
  authorized: boolean;
};

export const createContext = async (user?: User): Promise<Context> => {
  // todo: logic to check if user is authorized
  const authorized = user?.name !== undefined;

  return {
    prisma,
    authorized,
  };
};
