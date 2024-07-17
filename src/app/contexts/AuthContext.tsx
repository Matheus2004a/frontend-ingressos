import { useQuery } from '@tanstack/react-query'
import { createContext, useCallback, useEffect, useState } from 'react'
import { storage } from '../config/storage'
import { User } from '../entities/User'
import UsersService from '../services/UsersService'

export interface AuthContextProps {
  user: User | undefined
  signedIn: boolean
  isAdmin: boolean
  signin(token: string): void
  signout(): void
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setIsSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(storage.ACCESS_TOKEN)

    return !!storedAccessToken
  })

  const { data, isError, isFetched, refetch } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => UsersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  })

  const [isAdmin, setIsAdmin] = useState(false)

  const isAllowed = data?.role === 'admin' && signedIn

  useEffect(() => {
    setIsAdmin(isFetched && isAllowed)

    if (signedIn && isFetched) {
      refetch()
    }
  }, [isAllowed, signedIn, isFetched, refetch])

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(storage.ACCESS_TOKEN, accessToken)

    setIsSignedIn(true)
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(storage.ACCESS_TOKEN)

    setIsSignedIn(false)
  }, [])

  useEffect(() => {
    if (isError) {
      signout()
    }
  }, [isError, signout])

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isAdmin,
        signedIn,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
