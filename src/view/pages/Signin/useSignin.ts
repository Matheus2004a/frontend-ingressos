import { UserSigninRequest } from '@/app/entities/User'
import useAuth from '@/app/hooks/useAuth'
import AuthService from '@/app/services/AuthService'
import { FormData, schemaSignin } from '@/app/validations/schemaSignin'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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
  const { toast } = useToast()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: UserSigninRequest) => AuthService.signin(data),
    onError: (error: Error) => {
      toast({ title: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      toast({ title: 'Usuário logado com sucesso' })
      navigate('/')
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
