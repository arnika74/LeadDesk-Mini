import bcrypt from 'bcrypt'
import prisma from '../config/db.js'
import { signToken } from '../utils/jwt.js'
import { AppError } from '../utils/AppError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await prisma.admin.findUnique({ where: { email } })

  // Same message for missing user or bad password (no account enumeration)
  if (!admin) {
    throw new AppError('Invalid email or password', 401)
  }

  const passwordMatch = await bcrypt.compare(password, admin.password)

  if (!passwordMatch) {
    throw new AppError('Invalid email or password', 401)
  }

  const token = signToken({
    sub: admin.id,
    email: admin.email,
  })

  res.status(200).json({
    message: 'Login successful',
    data: {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    },
  })
})
