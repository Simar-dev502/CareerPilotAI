import { Navigate } from 'react-router-dom'
import { getToken } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getToken()
  return token ? children : <Navigate to="/login" replace />
}
