import 'dotenv/config'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env before seeding')
  }

  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters')
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
    },
  })

  console.log(`Admin ready: ${admin.email} (id: ${admin.id})`)
}

main()
  .catch((error) => {
    console.error('Seed failed:', error.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
