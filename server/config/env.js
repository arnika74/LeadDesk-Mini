import dotenv from 'dotenv'

dotenv.config()

const required = ['DATABASE_URL', 'JWT_SECRET', 'CLIENT_URL']

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

const nodeEnv = process.env.NODE_ENV || 'development'

if (process.env.JWT_SECRET.length < 32) {
  const message =
    'JWT_SECRET must be at least 32 characters for production-quality signing'
  if (nodeEnv === 'production') {
    throw new Error(message)
  }
  console.warn(`[env] Warning: ${message}`)
}

const env = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  clientUrl: process.env.CLIENT_URL,
  nodeEnv,
}

export default env
