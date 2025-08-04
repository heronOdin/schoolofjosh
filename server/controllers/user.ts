import { Request, Response } from 'express'
import User, { IUser } from '../models/User'
import jwt from 'jsonwebtoken'
import transactione from '../utils/session'
import { ClientSession } from 'mongoose'

const JWT_SECRET = process.env.JWT_SECRET as string

const signUp = async (session: ClientSession, req: Request, res: Response) => {
  const { username, email, password, role } = req.body as Partial<IUser>

  console.log(req.body)

  if (!username || !email || !password || !role) {
    res.status(400).json({
      message: 'All fields are required'
    })

    return
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })

    if (existingUser) {
      res.status(400).json({
        message: 'Username or email already exists'
      })

      return
    }

    const user = new User({ username, email, password, role })

    await user.save()

    res.status(201).json({
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        message: `Registered successfully. Welcome ${user.username}`
      }
    })

    return
  } catch (error: any) {
    if (error.code === 11000) {
      console.error('Error during sign up:', error)

      res.status(500).json({
        message: 'Internal server error'
      })
      return
    }

    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
    return
  }
}

const signin = async (session: ClientSession, req: Request, res: Response) => {
  console.log('hehehehe', req.user)

  try {
    const user = req.user as any as IUser

    if (!user) {
      res.status(401).json({
        message: 'Invalid email or password'
      })
      console.error('Invalid email or password')
      return
    }
    {
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h'
    })

    console.log('User authenticated successfully:', user, token)

    res.status(200).json({
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    })
    return
  } catch (error: any) {
    console.error('Error during sign in:', error)

    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
    return
  }
}

const users = async (session: ClientSession, req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })

    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
  }
}

const user = async (session: ClientSession, req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-password')

    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
  }
}

const update = async (session: ClientSession, req: Request, res: Response) => {
  const { id } = req.params
  const { username, email, role } = req.body as Partial<IUser>

  if (!username || !email || !role) {
    res.status(400).json({
      message: 'All fields are required'
    })
    return
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true, session }
    ).select('-password')

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
  }
}

const deleter = async (session: ClientSession, req: Request, res: Response) => {
  const { id } = req.params

  try {
    await User.findByIdAndDelete(id)

    res.status(200).json({ message: `Deleting account successful` })
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Deleting accout unsuccessful ${error.stack} ` })
    return
  }
}

export const deleteUser = transactione(deleter)
export const register = transactione(signUp)
export const login = transactione(signin)
export const getUsers = transactione(users)
export const getUser = transactione(user)
export const updateUser = transactione(update)
