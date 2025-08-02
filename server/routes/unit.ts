import { Router } from 'express'
import {
  createUnit,
  getUnits,
  getUnit,
  updateUnit,
  deleteUnit
} from '../controllers/unit'

const unitRouter = Router()

unitRouter.route('/').get(getUnits).post(createUnit)

unitRouter.route('/:id').get(getUnit).put(updateUnit).delete(deleteUnit)

export default unitRouter
