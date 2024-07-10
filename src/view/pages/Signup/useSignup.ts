import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserSignupRequest } from '../../../app/entities/User'
import useAuth from '../../../app/hooks/useAuth'
import AuthService from '../../../app/services/AuthService'
import { FormData, schemaSignup } from '../../../app/validations/schemaSignup'
import { useToast } from '../../../components/ui/use-toast'

export default function useSignup() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaSignup),
  })

  const { signin } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: UserSignupRequest) => AuthService.signup(data),
    onError: (error: Error) => {
      toast({ title: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      toast({ title: 'Cadastro feito com sucesso' })
      navigate('/events')
    },
  })

  const handleSubmit = hookFormSubmit(async (userData) => {
    const { data } = await mutateAsync(userData)

    signin(data.tokenJwt)
  })

  return {
    register,
    errors,
    handleSubmit,
    isLoading: isPending,
  }
}
