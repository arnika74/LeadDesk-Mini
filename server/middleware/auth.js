import { verifyToken } from '../utils/jwt.js'
import { AppError } from '../utils/AppError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import prisma from '../config/db.js'

export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    throw new AppError('Authentication required', 401)
  }

  const token = header.slice(7)

  let decoded
  try {
    decoded = verifyToken(token)
  } catch {
    throw new AppError('Invalid or expired token', 401)
  }

  const admin = await prisma.admin.findUnique({
    where: { id: decoded.sub },
    select: { id: true, email: true },
  })

  if (!admin) {
    throw new AppError('Invalid or expired token', 401)
  }

  req.admin = admin
  next()
})
