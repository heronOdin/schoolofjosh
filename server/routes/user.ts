import { Router, Request, Response, NextFunction } from 'express'
import { getUser, getUsers, updateUser, deleteUser } from '../controllers/user'
import passport from '../middleware/passport'
import { IUser } from '../models/User'

const userRoute = Router()

userRoute.get('/', getUsers)
userRoute.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

interface VerifyResponse {
  valid: boolean
  message: string
  user?: IUser
}

userRoute.get(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    try {
      res.status(200).json({ valid: true })
    } catch (error) {
      res.status(401).json({ valid: false })
    }
  }
)

export default userRoute
