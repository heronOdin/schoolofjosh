import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  userId: string
  username: string
  email: string
  role: 'student' | 'teacher' | 'admin'
}

interface AuthState {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  isDark: boolean
  login: (user: User, token: string) => void
  logout: () => void
  toggleIsDark: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isDark: false,
      login: (user, token) => {
        localStorage.setItem('token', token)
        set({ user, token, isLoggedIn: true })
      },
      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isLoggedIn: false })
      },
      toggleIsDark: () => set((state) => ({ isDark: !state.isDark }))
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        isDark: state.isDark
      }),
      version: 1
    }
  )
)

export default useAuthStore
