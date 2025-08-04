import { Router, Request, Response } from 'express'
import { getUser, getUsers, updateUser, deleteUser } from '../controllers/user'
import passport from '../middleware/passport'

const userRoute = Router()

userRoute.get('/', getUsers)
userRoute.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

userRoute.get(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    res
      .status(200)
      .json({ valid: true, message: 'Token is valid', user: req.user })
  }
)

export default userRoute
