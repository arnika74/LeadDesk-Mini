import { Router } from 'express'
import {
  getLeads,
  getStats,
  updateLeadStatus,
} from '../controllers/adminController.js'
import {
  listLeadsValidation,
  updateLeadStatusValidation,
} from '../validations/adminValidation.js'
import { validate } from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.use(protect)

router.get('/stats', getStats)
router.get('/leads', listLeadsValidation, validate, getLeads)
router.patch(
  '/leads/:id',
  updateLeadStatusValidation,
  validate,
  updateLeadStatus,
)

export default router
