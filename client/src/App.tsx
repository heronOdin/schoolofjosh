import type React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Courses from './pages/course'
import Home from './pages/home'
import Auth from './pages/auth'

const App: React.FC = () => {
  return (
  <main className='bg-color-[var(--bg-light)] dark:bg-color-[var(--bg-dark)] ' >
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Router>
    </main>
  )
}

export default App
