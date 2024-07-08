import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { httpClient } from '../../../app/axios'
import { FormData, schemaSignin } from '../../../app/validations/schemaSignin'

export default function useSignin() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaSignin),
  })

  const handleSubmit = hookFormSubmit(async (credentials) => {
    await httpClient.post('/user/session', credentials)
  })

  return {
    register,
    errors,
    handleSubmit,
  }
}
