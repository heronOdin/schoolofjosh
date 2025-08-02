import { LogOutIcon, Moon, Sun } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/auth.store'

const Navbar: React.FC = () => {
 
  const { isLoggedIn, logout,isDark,toggleIsDark } = useAuthStore()

  return (
    <nav className='flex flex-col sm:flex-row w-full justify-between items-center text-center container mx-auto p-4 bg-[var(--bg-light)] text-[var(--text-dark)] rounded-lg shadow-md mt-4'>
      <div className='flex items-center space-x-4 mb-4 sm:mb-0'>
        <img src='../assets/react.svg' alt='react logo' className='h-8' />
        <span className='text-xl font-bold'>School</span>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='flex flex-col sm:flex-row'>
          <Link className='p-2 m-1 hover:text-[var(--hover-light)]' to='/'>
            Home
          </Link>
          <Link
            className='p-2 m-1 hover:text-[var(--hover-light)]'
            to='/courses'
          >
            Courses
          </Link>
          <Link className='p-2 m-1 hover:text-[var(--hover-light)]' to='/about'>
            About
          </Link>
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
