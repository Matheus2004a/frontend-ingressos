import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '../../../app/utils/api'
import { schemaSignin } from '../../../app/validations/signin'

export default function useSignin() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaSignin),
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    const response = await api('/user/session', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const user = await response.json()
    console.log({ user })
  })

  return {
    register,
    handleSubmit,
    errors,
  }
}
