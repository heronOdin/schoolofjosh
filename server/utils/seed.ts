import dotenv from 'dotenv'
dotenv.config()

import connectDB from './connectDB'
import Course from '../models/course'
import User from '../models/User'
import Unit from '../models/Units'
import Enrollment from '../models/Enrollment'

const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) {
  throw new Error('MONGO_URI not set in environment variables')
}

const seed = async () => {
  try {
    await connectDB(MONGO_URI)

    // Clear collections
    await Promise.all([
      User.deleteMany(),
      Course.deleteMany(),
      Unit.deleteMany(),
      Enrollment.deleteMany()
    ])

    // Seed users
    const [, , , , , teacher, student] = await User.create([
      {
        username: 'Josh',
        email: 'josh@gmail.com',
        password: 'qweras12',
        role: 'student'
      },
      {
        username: 'eli',
        email: 'eli@gmail.com',
        password: 'qweras12',
        role: 'teacher'
      },
      {
        username: 'Joshua',
        email: 'josh@example.com',
        password: 'qweras12',
        role: 'student'
      },
      {
        username: 'Zoro',
        email: 'zoro@example.com',
        password: 'santoryu',
        role: 'student'
      },
      {
        username: 'Alice Admin',
        email: 'alice@school.com',
        password: 'Admin#1234',
        role: 'admin'
      },
      {
        username: 'Tom Teacher',
        email: 'tom@school.com',
        password: 'Teach#1234',
        role: 'teacher'
      },
      {
        username: 'Sally Student',
        email: 'sally@school.com',
        password: 'Stud#1234',
        role: 'student'
      }
    ])
    console.log('👥  Users seeded')

    // Seed units
    const unitDocs = Array.from({ length: 30 }, (_, i) => ({
      name: `Unit ${i + 1}`,
      code: `U${101 + i}`,
      description: `Description for Unit ${i + 1}`,
      credits: 1
    }))
    const units = await Unit.insertMany(unitDocs)
    console.log(`📚  ${units.length} Units seeded`)

    // Helper to pick 24 random units
    const pickUnits = () => {
      const shuffled = [...units].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 24).map(u => u._id)
    }

    // Seed courses
    const [, , courseC, courseD] = await Course.create([
      { title: 'Swordsmanship 101', duration: 10 },
      { title: 'Pirate Leadership', duration: 8 },
      { title: 'How to train your dragon', duration: 8 },
      {
        title: 'Intro to Programming',
        code: 'CS101',
        description: 'Learn the basics of programming.',
        assignedTeacher: teacher._id,
        units: pickUnits(),
        duration: 14
      },
      {
        title: 'Data Structures',
        code: 'CS201',
        description: 'Explore common data structures.',
        assignedTeacher: teacher._id,
        units: pickUnits(),
        duration: 4
      }
    ])
    console.log('🏫  Courses seeded')

    // Enroll student in two courses
    await Enrollment.create([
      { studentId: student._id, courseId: courseC._id, semester: 'Fall 2025' },
      { studentId: student._id, courseId: courseD._id, semester: 'Fall 2025' }
    ])
    console.log('✍️  Enrollments seeded')

    console.log('✅  Seed complete')
    process.exit(0)
  } catch (err) {
    console.error('❌  Seed failed:', err)
    process.exit(1)
  }
}

seed()
