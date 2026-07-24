import { PrismaClient } from '@prisma/client'

// Single shared Prisma client (avoids exhausting DB connections in dev)
const prisma = new PrismaClient()

export default prisma
