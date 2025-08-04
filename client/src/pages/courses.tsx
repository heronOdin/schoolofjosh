import React from 'react';
import { LucideClockFading } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../api/auth.api';

interface Course {
  _id: string
  title: string
  duration: number
}

const Courses: React.FC = () => {
  const {
    data: courses,
    isError,
    error,
    isPending,
  } = useData<Course[]>('/api/courses');

  console.log(courses);
  

  if (isPending) {
    return (
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <div className="flex justify-center items-center h-screen">
            <LucideClockFading className="animate-spin text-[var(--mustard-yellow)]" size={48} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Courses</h1>
        <p className="text-lg">This is the courses page.</p>
{                    (Array.isArray(courses)? (<p>Its an array</p>  ) : <p>Its not an array</p>)
}
        {Array.isArray(courses) && courses.length > 0 ? (
          <ul className="list-disc pl-5">
            {courses.map((course) => (
              <li key={course._id} className="mb-2">
                <Link to={`/courses/${course._id}`} className="text-blue-500 hover:underline">
                  {course.title}
                </Link>
              </li>
            ))}
            {Array.isArray(courses) && courses.length === 0 && (
              <p className="text-red-500">No courses available.</p>
            )}

            (Array.isArray(courses)? (<p>Its an array</p>  ) : <p>Its not an array</p>)
          </ul>
        ) : (
          <p className="text-red-500">No courses available.</p>
        )}
        {isError && error && (
          <p className="text-red-500 mt-4">Error: {error.message}</p>
        )}
      </div>
    </main>
  );
};

export default Courses;