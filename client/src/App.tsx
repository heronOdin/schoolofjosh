import type React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Courses from './pages/courses'
import Home from './pages/home'
import Auth from './pages/auth'
import ProtectedRoute from './pages/Protected'
import Course from './pages/course'

const App: React.FC = () => {
  return (
    <main className='bg-[var(--bg-light)] dark:bg-[var(--bg-light)] '>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />{' '}
          <Route path='/auth' element={<Auth />} />
          <Route path='/courses/:courseId' element={<Course />} />
          <Route
            path='/courses'
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      <footer className='text-center text-[var(--text-dark)] dark:text-[var(--text-light)] p-4 mt-4'>
        &copy; {new Date().getFullYear()} School of Josh
      </footer>
    </main>
  )
}

export default App
