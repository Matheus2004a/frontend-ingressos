import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../app/hooks/useAuth'

export default function PrivateRoutes() {
  const { signedIn } = useAuth()

  if (!signedIn) {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}
