import env from '../config/env.js'

export const notFound = (_req, res) => {
  res.status(404).json({ message: 'Route not found' })
}

export const errorHandler = (err, _req, res, _next) => {
  console.error(err)

  const status = err.statusCode || 500
  const isDev = env.nodeEnv !== 'production'
  const message =
    status === 500 && !isDev
      ? 'Internal server error'
      : err.message || 'Request failed'

  res.status(status).json({
    message,
    ...(err.errors ? { errors: err.errors } : {}),
  })
}
