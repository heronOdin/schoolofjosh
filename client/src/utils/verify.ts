import { useQuery } from '@tanstack/react-query'
import useAuthStore from '../store/auth.store'
import apiClient from '../api/axios'

const useVerifyToken = (url: string) => {
  const { logout } = useAuthStore()

  return useQuery({
    queryKey: ['verify-token', url],
    queryFn: async () => {
      try {
        await apiClient.get(url)

        return true
      } catch (error) {
        console.error('Token verification failed:', error)
        logout()
        return false
      }
    },
    refetchOnMount: true,
    retry: false
  })
}

export default useVerifyToken
