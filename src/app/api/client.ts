import { PrismaClient } from "../../../generated/prisma";

let prismaInit: PrismaClient;

if(process.env.NODE_ENV === "production") {
  prismaInit = new PrismaClient();
} else {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if(!(global as any).prisma) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).prisma = new PrismaClient()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaInit = (global as any).prisma
}

export const prisma = prismaInit;