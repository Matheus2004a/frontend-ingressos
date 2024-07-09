import { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../contexts/AuthContext'

export default function useAuth(): AuthContextProps {
  return useContext(AuthContext)
}
