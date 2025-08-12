import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

import connectDB from './utils/connectDB'
import enrollmentRoutes from './routes/enrollmentRoutes'
import passport from './middleware/passport'
import userRouter from './routes/userRoutes'
import userRoute from './routes/user'
import courseRoutes from './routes/courseRoutes'
import unitRouter from './routes/unit'

const app = express()

const MONGO_URI = process.env.MONGO_URI as string
const PORT = process.env.PORT
const FRONTEND_URL = process.env.FRONTEND_URL

if (!PORT) {
  throw new Error('PORT is not defined in environment variables')
}

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)
app.use(express.json())
app.use(cookieParser())

app.use(passport.initialize())
;(async () => {
  await connectDB(MONGO_URI)
})()

app.get('/', (req, res) => {
  console.log('Welcome to the School of Josh API')
  res.send('Welcome to the School of Josh API' + new Date().toISOString())
})

app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${
        req.originalUrl
      } - Body: ${JSON.stringify(req.body)} - Status: ${
        res.statusCode
      } - Duration: ${duration}ms`
    )
  })
  next()
})

app.use('/users', userRouter)
app.use('/', userRoute)
app.use('/api', passport.authenticate('jwt', { session: false }))
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/units', unitRouter)
app.use('/api/users', userRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
