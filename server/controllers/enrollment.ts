import { Request, Response } from 'express'
import Enrollment, { IEnrollment } from '../models/Enrollment'
import { ClientSession, Types } from 'mongoose'
import Course from '../models/course'
import transactione from '../utils/session'

const enrollment = async (
  session: ClientSession,
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId } = req.params

  const { courseId, semester } = req.body as Partial<IEnrollment>

  const course = await Course.findById({ courseId })

  if (!course) {
    res.status(404).json({ message: `Course does not exist` })
    return
  }

  try {
    const currentCount = await Enrollment.countDocuments({
      studentId: new Types.ObjectId(studentId),
      semester
    })

    if (currentCount > 2) {
      res.status(400).json({
        message: 'Student already enrolled in 2 courses for this semester'
      })
      return
    }

    const enrolled = await Enrollment.findById({ courseId, studentId })

    if (enrolled) {
      res.status(400).json({ message: `Already enrolled in this course` })
      return
    }

    const enrollment = new Enrollment({
      studentId: new Types.ObjectId(studentId),
      courseId: new Types.ObjectId(courseId),
      semester
    })

    await enrollment.save()

    res.status(201).json({
      message: 'Enrollment successful',
      enrollment
    })

    return
  } catch (error) {
    console.error('Error enrolling student:', error)
    res.status(500).json({ message: 'Internal server error' })
    return
  }
}

const Enrollments = async (
  session: ClientSession,
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId } = req.params

  try {
    const enrollments = await Enrollment.find({
      studentId: new Types.ObjectId(studentId)
    })
      .populate('courseId', 'name description')
      .populate('studentId', 'name email')

    if (!enrollments || enrollments.length === 0) {
      res.status(404).json({ message: 'No enrollments found for this student' })
      return
    }
    res.status(200).json(enrollments)
    return
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
    console.error('Error fetching enrollments:', error)
    return
  }
}

const unEnroll = async (
  session: ClientSession,
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const enrolled = await Enrollment.findById({ id })
    if (!enrolled) {
      res.status(400).json({ message: `Not enrolled to this` })
      return
    }

    await Enrollment.findByIdAndDelete({ id })

    res.status(200).json({ message: `Unenrolled successful` })
  } catch (err: any) {
    console.error(`Error ${err.message} `)
    res
      .status(400)
      .json({
        message: `Unenrollment unsuccessfully ${err.stack},${err.code} `
      })
    return
  }
}

export const enroll = transactione(enrollment)
export const myEnrollments = transactione(Enrollments)
export const unEnrollment = transactione(unEnroll)
