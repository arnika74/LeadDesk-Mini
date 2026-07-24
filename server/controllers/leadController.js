import prisma from '../config/db.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const createLead = asyncHandler(async (req, res) => {
  const { name, email, budget, message } = req.body

  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      budget,
      message,
    },
  })

  res.status(201).json({
    message: 'Lead submitted successfully',
    data: {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      budget: lead.budget,
      status: lead.status,
      createdAt: lead.createdAt,
    },
  })
})
