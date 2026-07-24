import prisma from '../config/db.js'
import { AppError } from '../utils/AppError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getStats = asyncHandler(async (_req, res) => {
  const [total, newCount, contacted, closed] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: 'CONTACTED' } }),
    prisma.lead.count({ where: { status: 'CLOSED' } }),
  ])

  res.status(200).json({
    message: 'Stats fetched successfully',
    data: {
      total,
      new: newCount,
      contacted,
      closed,
    },
  })
})

export const getLeads = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number.parseInt(String(req.query.page ?? '1'), 10) || 1)
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(String(req.query.limit ?? '10'), 10) || 10),
  )
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''
  const status = typeof req.query.status === 'string' ? req.query.status : undefined

  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {}),
  }

  const skip = (page - 1) * limit

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ])

  res.status(200).json({
    message: 'Leads fetched successfully',
    data: leads,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 0,
    },
  })
})

export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const existing = await prisma.lead.findUnique({ where: { id } })

  if (!existing) {
    throw new AppError('Lead not found', 404)
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: { status },
  })

  res.status(200).json({
    message: 'Lead status updated successfully',
    data: lead,
  })
})
