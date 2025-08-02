import { Router } from 'express'
import { getUser, getUsers, updateUser, deleteUser } from '../controllers/user'

const userRoute = Router()

userRoute.get('/', getUsers)
userRoute.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

export default userRoute
