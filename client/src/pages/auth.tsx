import { Eye, EyeClosed } from 'lucide-react'
import React, { useState } from 'react'
import OverLay from '../components/Overlay'
import {
  useLogin,
  useRegister,
  type LoginPayload,
  type RegisterPayload
} from '../api/auth.api'
import { useNavigate } from 'react-router-dom'

const Auth: React.FC = () => {
  const [isLogin, setLogin] = useState(true)
  const [isHidden, setHidden] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  })

  const navigate = useNavigate()
  const {
    mutate: login,
    isPending: isLoggingIn,
    isError: isLoginError,
    error: loginError
  } = useLogin(navigate)
  const {
    mutate: register,
    isPending: isRegistering,
    isError: isRegisterError,
    error: registerError
  } = useRegister(navigate)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'student'
    })

    if (isLogin) {
      console.log(`Logging in`, formData)
      const loginInfo: LoginPayload = {
        password: formData.password,
        email: formData.email
      }
      login(loginInfo)
    } else {
      console.log(`Registering`, formData)
      const registerInfo: RegisterPayload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      }
      register(registerInfo)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const isLoading = isLoggingIn || isRegistering

  return (
    <main className='flex flex-row justify-center items-center h-screen w-full'>
      {/* This will be the login view */}
      {isLogin ? (
        <>
          <OverLay isLogin={isLogin} setLogin={setLogin} />
          <div className='flex-1 max-w-md mx-auto'>
            <form onSubmit={handleSubmit}>
              <h2 className='text-2xl font-bold mb-4 text-center'>Log in</h2>
              <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  placeholder='Please input your email'
                  disabled={isLoading}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-4 relative'>
                <label htmlFor='password'>Password</label>
                <input
                  type={isHidden ? 'password' : 'text'}
                  disabled={isLoading}
                  placeholder='Please input your password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setHidden(!isHidden)}
                  className='absolute right-3 top-10 cursor-pointer text-[var(--dark-teal)]'
                >
                  {isHidden ? <Eye /> : <EyeClosed />}
                </span>
              </div>
              <button type='submit' disabled={isLoading} className='w-full'>
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
            {isLoginError && (
              <div className='text-red-500 mt-2'>
                {loginError?.message || 'Login failed. Please try again.'}
              </div>
            )}
          </div>
        </>
      ) : (
        // This will be the register view
        <>
          <div className='flex-1 max-w-md mx-auto'>
            <form onSubmit={handleSubmit}>
              <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
              <div className='mb-4'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  name='username'
                  placeholder='Please input your username'
                  disabled={isLoading}
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  placeholder='Please input your email'
                  disabled={isLoading}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-4 relative'>
                <label htmlFor='password'>Password</label>
                <input
                  type={isHidden ? 'password' : 'text'}
                  disabled={isLoading}
                  placeholder='Please input your password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setHidden(!isHidden)}
                  className='absolute right-3 top-10 cursor-pointer text-[var(--dark-teal)]'
                >
                  {isHidden ? <Eye /> : <EyeClosed />}
                </span>
              </div>

              <div className='mb-4 relative'>
                <label htmlFor='role'>Role</label>
                <select
                  onChange={handleChange}
                  name='role'
                  disabled={isLoading}
                  value={formData.role}
                  className='w-full'
                >
                  <option className='' value='student'>
                    Student
                  </option>
                  <option value='admin'>Admin</option>
                  <option value='teacher'>Teacher</option>
                </select>
              </div>
              <button type='submit' disabled={isLoading} className='w-full'>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
            {isRegisterError && (
              <div className='text-red-500 mt-2'>
                {registerError?.message ||
                  'Registration failed. Please try again.'}
              </div>
            )}
          </div>

          <OverLay isLogin={isLogin} setLogin={setLogin} />
        </>
      )}
    </main>
  )
}

export default Auth
