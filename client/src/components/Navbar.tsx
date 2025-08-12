import { LogOutIcon, Moon, Sun } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/auth.store'

const Navbar: React.FC = () => {
  const { isLoggedIn, logout, isDark, toggleIsDark } = useAuthStore()

  return (
    <nav className='flex flex-col sm:flex-row w-full justify-between items-center text-center container mx-auto p-4 bg-[var(--bg-light)] text-[var(--mustard-yellow)] rounded-lg shadow-md mt-4 dark:bg-[var(--bg-light)] dark:text-[var(--text-dark)] '>
      <div className='flex items-center space-x-4 mb-4 sm:mb-0'>
        <img
          src='../assets/school-logo-design-template_731136-234.webp'
          alt='react logo'
          className='h-8'
        />
        <span className='text-xl font-bold'>School</span>
      </div>

      <div className='flex items-center space-x-4 align-items-center justify-center gap-3'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
          <Link to='/'>Home</Link>
          <Link to='/courses'>Courses</Link>
          <Link to='/about'>About</Link>
          {isLoggedIn ? (
            <LogOutIcon className='cursor-pointer' onClick={() => logout()} />
          ) : (
            <Link
              className='p-2 m-1 hover:text-[var(--hover-light)]'
              to='/auth'
            >
              Auth
            </Link>
          )}
        </div>
        <div
          onClick={() => toggleIsDark()}
          className='cursor-pointer text-[var(--text-dark)]'
        >
          {isDark ? <Sun /> : <Moon />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
