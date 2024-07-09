import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserSigninRequest } from '../../../app/entities/User'
import useAuth from '../../../app/hooks/useAuth'
import AuthService from '../../../app/services/AuthService'
import { FormData, schemaSignin } from '../../../app/validations/schemaSignin'

export default function useSignin() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaSignin),
  })

  const { signin } = useAuth()
  const navigate = useNavigate()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: UserSigninRequest) => AuthService.signin(data),
    onError: (error: Error) => {
      console.error(error.message)
    },
    onSuccess: () => {
      navigate('/events')
    },
  })

  const handleSubmit = hookFormSubmit(async (userData) => {
    const { data } = await mutateAsync(userData)

    signin(data.token)
  })

  return {
    register,
    errors,
    handleSubmit,
    isLoading: isPending,
  }
}
