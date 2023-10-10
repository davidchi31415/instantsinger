import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const prismadb = (typeof globalThis !== "undefined") ? (globalThis.prisma || new PrismaClient())
    : (global.prisma || new PrismaClient());
if (process.env.VERCEL_ENV !== "production") {
    if (typeof globalThis !== "undefined") {
        globalThis.prisma = prismadb;
    } else {
        global.prisma = prismadb;
    }
}

export default prismadb;