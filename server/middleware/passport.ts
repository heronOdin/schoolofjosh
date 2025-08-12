import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

const JWT_SECRET = process.env.JWT_SECRET as string

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email: string, password: string, done: Function) => {
      try {
        const user = await User.findOne({ email })

        if (!user) return done(null, false, { message: 'Incorrect email' })

        const isMatch = await user.comparePassword(password)

        if (!isMatch)
          return done(null, false, { message: 'Incorrect password' })

        return done(null, user)
      } catch (error: any) {
        return done(error, false, { message: 'Internal server error' })
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: req => {
        let token = req.cookies.jwt

        if (!token && req.headers.authorization?.startsWith(`Bearer`)) {
          token = req.headers.authorization?.split(' ')[1]
        }
        return token
      },
      secretOrKey: JWT_SECRET
    },
    async (payload: any, done: any) => {
      try {
        const user = await User.findById(payload.userId)
        if (!user) return done(null, false, { message: 'User not found' })

        return done(null, user)
      } catch (error: any) {
        return done(error, false, { message: 'Internal server error' })
      }
    }
  )
)

export default passport
