import { Router } from 'express'
import leadRoutes from './leadRoutes.js'
import authRoutes from './authRoutes.js'
import adminRoutes from './adminRoutes.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'LeadDesk Mini API is running' })
})

router.use('/auth', authRoutes)
router.use('/leads', leadRoutes)
router.use('/admin', adminRoutes)

export default router
