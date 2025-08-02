import { Request, Response } from 'express'
import { ClientSession } from 'mongoose'
import Course from '../models/course'
import transactione from '../utils/session'

const newCourse = async (
  session: ClientSession,
  req: Request,
  res: Response
) => {
  const { title, duration } = req.body

  try {
    const existingCourse = await Course.findOne({ title }).session(session)

    if (existingCourse) {
      res.status(400).json({ message: 'Course with this title already exists' })
      return
    }

    const course = new Course({ title, duration })
    await course.save({ session })

    res.status(201).json({
      message: 'Course created successfully',
      course
    })
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
  }
}

const allCourses = async (
  session: ClientSession,
  req: Request,
  res: Response
) => {
  try {
    const courses = await Course.find().session(session)

    res.status(200).json(courses)
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
  }
}

const thisCourse = async (
  session: ClientSession,
  req: Request,
  res: Response
) => {
  const { courseId } = req.params

  try {
    const course = await Course.findById(courseId).session(session)

    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }

    res.status(200).json(course)
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
  }
}

const updateCourse = async (
  session: ClientSession,
  req: Request,
  res: Response
) => {
  const { courseId } = req.params
  const { title, duration } = req.body

  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { title, duration },
      { new: true }
    ).session(session)

    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }

    res.status(200).json(course)
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
  }
}

const deleteCourse = async (
  session: ClientSession,
  req: Request,
  res: Response
) => {
  const { courseId } = req.params

  try {
    const course = await Course.findByIdAndDelete(courseId).session(session)

    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }

    res.status(200).json({ message: 'Course deleted successfully' })
  } catch (error: any) {
    res.status(500).json({
      message: `Internal server error ${error.message} ${error.code}`
    })
  }
}

export const newCourseController = transactione(newCourse)
export const allCoursesController = transactione(allCourses)
export const thisCourseController = transactione(thisCourse)
export const updateCourseController = transactione(updateCourse)
export const deleteCourseController = transactione(deleteCourse)
