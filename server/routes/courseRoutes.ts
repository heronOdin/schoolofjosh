import { Router } from 'express'
import {
  newCourseController,
  allCoursesController,
  thisCourseController,
  updateCourseController,
  deleteCourseController
} from '../controllers/course'

const courseRouter = Router()

courseRouter.post('/new', newCourseController)
courseRouter.get('/', allCoursesController)
courseRouter.get('/:courseId', thisCourseController)
courseRouter.put('/:courseId', updateCourseController)
courseRouter.delete('/:courseId', deleteCourseController)

export default courseRouter
