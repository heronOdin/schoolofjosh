import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/auth.store'
import useVerifyToken from '../utils/verify'
import { Loader2Icon } from 'lucide-react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore()
  const { data: isValid, isPending } = useVerifyToken()

  if (isPending) {
    return <Loader2Icon className='' />
  }
  if (!isLoggedIn && !isValid) {
    return <Navigate to='/auth' replace />
  }

  return children
}

export default ProtectedRoute
