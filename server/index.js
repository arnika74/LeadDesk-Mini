import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import env from './config/env.js'
import apiRoutes from './routes/index.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()

// Needed so rate limiting sees the real client IP behind Render/Vercel proxies
app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)
app.use(express.json({ limit: '10kb' }))

app.use('/api', apiRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`)
})
