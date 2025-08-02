import { Request, Response } from 'express'
import { ClientSession } from 'mongoose'
import transactione from '../utils/session'
import Units from '../models/Units'

const newUnit = async (session: ClientSession, req: Request, res: Response) => {
  try {
    const { code, name, description } = req.body

    if (!code || !name) {
      res.status(400).json({ error: 'Code and name are required.' })
      return
    }

    const existingUnit = await Units.findOne({ code, name })
    if (existingUnit) {
      res
        .status(400)
        .json({ error: 'Unit with this code or name already exists.' })
      return
    }

    const unit = new Units({
      code,
      name,
      description
    })

    res.status(201).json(unit)
    return
  } catch (error: any) {
    console.error('Error creating unit:', error)
    res.status(500).json({ error: 'Internal server error.' })
    return
  }
}

const units = async (session: ClientSession, req: Request, res: Response) => {
  try {
    const units = await Units.find().sort({ createdAt: -1 }).select('-__v')

    res.status(200).json(units)
    return
  } catch (error: any) {
    console.error('Error fetching units:', error)
    res.status(500).json({ error: 'Internal server error.' })
    return
  }
}

const unit = async (session: ClientSession, req: Request, res: Response) => {
  try {
    const { id } = req.params

    const unit = await Units.findById(id).select('-__v')

    if (!unit) {
      res.status(404).json({ error: 'Unit not found.' })
      return
    }

    res.status(200).json(unit)
    return
  } catch (error: any) {
    console.error('Error fetching unit:', error)
    res.status(500).json({ error: 'Internal server error.' })
    return
  }
}

const update = async (session: ClientSession, req: Request, res: Response) => {
  const { id } = req.params
  const { code, name, description } = req.body

  try {
    const updates: { [key: string]: any } = {}

    if (code) updates.code = code
    if (name) updates.name = name
    if (description) updates.description = description

    const update = await Units.findByIdAndUpdate({ id }, updates)

    if (!update) {
      res.status(404).json({ error: 'Unit not found.' })
      return
    }

    res.status(200).json({ message: 'Unit updated successfully.' })
    return
  } catch (error: any) {
    console.error(`Error updating unit ${error.stack}`)

    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid data provided.' })
      return
    }

    res.status(500).json({
      error: `Internal server error ${error.message} ${error.code}`
    })
    return
  }
}

const deleter = async (session: ClientSession, req: Request, res: Response) => {
  const { id } = req.params

  try {
    const unit = await Units.findByIdAndDelete(id)

    if (!unit) {
      res.status(404).json({ error: 'Unit not found.' })
      return
    }

    res.status(200).json({ message: 'Unit deleted successfully.' })
    return
  } catch (error: any) {
    console.error(`Error deleting unit ${error.stack}`)

    if (error.name === 'CastError') {
      res.status(400).json({ error: 'Invalid unit ID.' })
      return
    }

    if (error.name === 'MongoError' && error.code === 11000) {
      res
        .status(400)
        .json({ error: 'Unit cannot be deleted due to dependencies.' })
      return
    }
  }
}

export const createUnit = transactione(newUnit)
export const getUnits = transactione(units)
export const getUnit = transactione(unit)
export const updateUnit = transactione(update)
export const deleteUnit = transactione(deleter)
