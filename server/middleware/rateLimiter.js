import rateLimit from 'express-rate-limit'

// Stricter on login to slow brute-force attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many login attempts. Please try again in 15 minutes.',
  },
})

// Soft limit on public lead form spam
export const leadSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many submissions. Please try again later.',
  },
})
