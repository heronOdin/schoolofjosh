import { Router } from 'express'

const enrollmentRoutes = Router()
import { enroll, myEnrollments, unEnrollment } from '../controllers/enrollment'

enrollmentRoutes.post('/enroll', enroll)
enrollmentRoutes
  .route('/my-enrollments/:studentId')
  .get(myEnrollments)
  .delete(unEnrollment)

export default enrollmentRoutes
