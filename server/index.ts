import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

import connectDB from './utils/connectDB'
import enrollmentRoutes from './routes/enrollmentRoutes'
import passport from './middleware/passport'
import userRouter from './routes/userRoutes'
import courseRoutes from './routes/courseRoutes'
import unitRouter from './routes/unit'
import userRoutes from './routes/userRoutes'

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

app.use(passport.initialize())
;(async () => {
  await connectDB(MONGO_URI)
})()

app.use('/users', userRouter)
app.use('/api', passport.authenticate('jwt', { session: false }))
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/units', unitRouter)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the School of Josh API' + new Date().toISOString())
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
