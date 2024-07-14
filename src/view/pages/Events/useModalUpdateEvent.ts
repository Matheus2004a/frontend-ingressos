import { Event } from '@/app/entities/Event'
import { formatDateToDateTimeLocal } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../app/hooks/useAuth'
import EventsServices from '../../../app/services/EventsServices'
import {
  schemaRegisterEvent,
  TypeSchemaRegisterEvent,
} from '../../../app/validations/schemaRegisterEvent'
import { toast } from '../../../components/ui/use-toast'

export default function useModalUpdateEvent(event: Event) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isFirstRender = useRef(true)

  const { user, signout } = useAuth()
  const form = useForm<TypeSchemaRegisterEvent>({
    resolver: zodResolver(schemaRegisterEvent),
    defaultValues: {
      name: event.name,
      location: event.location,
      dtStart: formatDateToDateTimeLocal(event.dtStart),
      dtEnd: formatDateToDateTimeLocal(event.dtEnd),
    },
  })

  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Event) => EventsServices.update(data),
    onError: (error: Error) => {
      toast({ title: error.message || 'Erro interno', variant: 'destructive' })
      signout()
    },
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['events', user?.id] })
      toast({ title: 'Evento atualizado com sucesso' })
      setIsDialogOpen(false)
    },
  })

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!isDialogOpen && !form.formState.isValid) {
      form.clearErrors()
    }
  }, [form, isDialogOpen])

  async function onSubmit(eventId: string, values: TypeSchemaRegisterEvent) {
    const dtEndIsBeforeDtStart = values.dtEnd < values.dtStart
    if (dtEndIsBeforeDtStart) {
      form.setError('dtEnd', {
        message: 'A data de término deve ser maior a data de início',
      })
      return null
    }

    const payload = {
      ...values,
      id: eventId,
      userId: user?.id,
      dtStart: new Date(values.dtStart).toISOString(),
      dtEnd: new Date(values.dtEnd).toISOString(),
    }

    mutateAsync(payload)
  }

  return {
    form,
    onSubmit,
    isLoading: isPending,
    isDialogOpen,
    setIsDialogOpen,
  }
}
