import { Router, Request, Response, NextFunction } from 'express'
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  signOut
} from '../controllers/user'
import passport from '../middleware/passport'
import { IUser } from '../models/User'
import jwt from 'jsonwebtoken'

const userRoute = Router()

userRoute.get('/', getUsers)
userRoute.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
userRoute.post('/logout', signOut)

interface VerifyResponse {
  valid: boolean
  message: string
  user?: IUser
}

userRoute.get(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = req.cookies?.auth
    if (!token) return res.send({ auth: false })
    try {
      jwt.verify(token, process.env.JWT_SECRET as string)

      res.status(200).json({ valid: true }).send({ auth: true })
    } catch (error) {
      res.status(401).json({ valid: false }).send({ auth: false })
    }
  }
)

export default userRoute
