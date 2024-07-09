import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../app/hooks/useAuth'
import { httpClient } from '../../../app/services/httpClient'
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

  const handleSubmit = hookFormSubmit(async (credentials) => {
    const { data } = await httpClient.post('/user/session', credentials)

    if (!data) return null

    signin(data.token)
    navigate('/events')
  })

  return {
    register,
    errors,
    handleSubmit,
  }
}
