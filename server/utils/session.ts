import { Request, Response } from 'express'
import mongoose from 'mongoose'

const transactione = (
  fn: (
    session: mongoose.ClientSession,
    req: Request,
    res: Response
  ) => Promise<void>
) => {
  return async (req: Request, res: Response) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      await fn(session, req, res)

      if (session.inTransaction()) await session.commitTransaction()
    } catch (error) {
      if (session.inTransaction()) await session.abortTransaction()
      console.error('Transaction aborted due to error:', error)
      if (!res.headersSent)
        res.status(500).json({ message: 'Internal server error' })
    } finally {
      session.endSession()
    }
  }
}

export default transactione
