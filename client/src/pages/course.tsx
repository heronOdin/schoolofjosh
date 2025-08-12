import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../api/auth.api'

interface Course {
  _id: string
  title: string
  duration: number
}

const Course: React.FC = () => {
  const { courseId } = useParams()
  const {
    data: course,
    isPending,
    error,
    isError
  } = useData<Course>(`${import.meta.env.VITE_APP_COURSE_URL}/${courseId}`)

  if (isPending) {
    return (
      <main>
        <div className='container mx-auto p-4'>
          <h1 className='text-2xl font-bold mb-4'>Loading...</h1>
          <div className='flex justify-center items-center h-screen'>
            <LoaderIcon
              className='animate-spin text-[var(--mustard-yellow)]'
              size={48}
            />
          </div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main>
        <div className='container mx-auto p-4'>
          <h1 className='text-2xl font-bold mb-4'>Error</h1>
          <div className='text-red-500'>{error.message}</div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>{course.title}</h1>
        <p className='text-lg'>Duration: {course.duration} hours</p>
        <p className='mt-4'>This is the course details page.</p>
      </div>
    </main>
  )
}

export default Course
