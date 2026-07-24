import { Router } from 'express'
import { login } from '../controllers/authController.js'
import { loginValidation } from '../validations/authValidation.js'
import { validate } from '../middleware/validate.js'
import { loginLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/login', loginLimiter, loginValidation, validate, login)

export default router
