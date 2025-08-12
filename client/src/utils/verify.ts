import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'
import useAuthStore from '../store/auth.store'

const useVerifyToken = () => {
  const { token, logout } = useAuthStore()

  return useQuery({
    queryKey: ['verify-token'],
    queryFn: async () => {
      if (!token) return false

      try {
        const { data } = await axios.get('/users/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return data.valid as boolean
      } catch (error) {
        console.error('Token verification failed:', error)
        logout()
        return false
      }
    },
    enabled: !!token,
    retry: 1,
    staleTime: 5 * 60 * 1000
  })
}

export default useVerifyToken
