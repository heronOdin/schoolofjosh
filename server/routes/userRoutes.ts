import { Router } from 'express'
import passport from '../middleware/passport'
import { login, register } from '../controllers/user'

const userRouter = Router()

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
)

userRouter.post('/register', register)

export default userRouter
