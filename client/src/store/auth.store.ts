import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IUser {
  id: string
  email: string
  username: string
  role: 'user' | 'admin' | 'teacher'
}

export interface IAuth {
  isLoggedIn: boolean
  user: IUser | null
  isDark: boolean
  toggleIsDark: () => void
  login: (user: IUser) => void
  logout: () => void
}

const useAuthStore = create<IAuth>()(
  persist(
    set => ({
      user: null,
      isLoggedIn: false,
      setUser: (user: IUser | null) => set({ user }),
      isDark: false,

      toggleIsDark: () => {
        const darkness = !document.documentElement.classList.contains('dark')

        if (darkness) {
          document.documentElement.classList.add('dark')
          localStorage.setItem('theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.remove('theme')
        }
        set(state => ({
          isDark: !state.isDark
        }))
      },
      login: (user: IUser) => {
        set({ user, isLoggedIn: true })
      },
      logout: () => set({ user: null, isLoggedIn: false })
    }),
    { name: 'auth', storage: createJSONStorage(() => localStorage) }
  )
)

export default useAuthStore
