import { Router } from 'express'
import { createLead } from '../controllers/leadController.js'
import { createLeadValidation } from '../validations/leadValidation.js'
import { validate } from '../middleware/validate.js'
import { leadSubmitLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/', leadSubmitLimiter, createLeadValidation, validate, createLead)

export default router
