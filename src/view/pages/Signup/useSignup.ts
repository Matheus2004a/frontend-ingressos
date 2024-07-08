import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { httpClient } from '../../../app/axios'
import { FormData, schemaSignup } from '../../../app/validations/schemaSignup'

export default function useSignup() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaSignup),
  })

  const handleSubmit = hookFormSubmit(async (credentials) => {
    await httpClient.post('/user/register', credentials)
  })

  return {
    register,
    errors,
    handleSubmit,
  }
}
