import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;

export default db;
