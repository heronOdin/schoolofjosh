/* import { useEffect, useState } from 'react'
 */ import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

/* import useAuthStore from './store/auth.store'
import useVerifyToken from './utils/verify'
 */ import Navbar from './components/Navbar'
import Home from './pages/home'
import Auth from './pages/auth'
import Courses from './pages/courses'
import Course from './pages/course'
import ProtectedRoute from './components/Protected'

const App: React.FC = () => {
  /*    const { isDark, user } = useAuthStore()
  const { data: isValidToken } = useVerifyToken()
  const [isHydrated, setIsHydrated] = useState(false)

 useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  console.log(isValidToken)

  useEffect(() => {
    const unsubHydration = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true)
      console.log(user)
    })
    return () => {
      unsubHydration()
    }
  }, [user])

  if (!isHydrated) {
    return null
  } */

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
