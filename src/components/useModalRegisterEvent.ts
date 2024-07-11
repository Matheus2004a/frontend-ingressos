import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useAuth from '../app/hooks/useAuth'
import {
  schemaRegisterEvent,
  TypeSchemaRegisterEvent,
} from '../app/validations/schemaRegisterEvent'
import EventsServices from '../app/services/EventsServices'

export default function useModalRegisterEvent() {
  const { user } = useAuth()
  const form = useForm<TypeSchemaRegisterEvent>({
    resolver: zodResolver(schemaRegisterEvent),
  })

  async function onSubmit(values: TypeSchemaRegisterEvent) {
    const dtEndIsBeforeDtStart = values.dtEnd < values.dtStart
    if (dtEndIsBeforeDtStart) {
      form.setError('dtEnd', {
        message: 'A data de término deve ser maior a data de início',
      })
      return null
    }

    const payload = {
      ...values,
      userId: user.id,
      dtStart: new Date(values.dtStart).toISOString(),
      dtEnd: new Date(values.dtEnd).toISOString(),
    }

    await EventsServices.create(payload)
  }

  return { form, onSubmit }
}
