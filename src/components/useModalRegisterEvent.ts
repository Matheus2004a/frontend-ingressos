import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateEventRequest } from '../app/entities/Event'
import useAuth from '../app/hooks/useAuth'
import EventsServices from '../app/services/EventsServices'
import {
  schemaRegisterEvent,
  TypeSchemaRegisterEvent,
} from '../app/validations/schemaRegisterEvent'
import { toast } from './ui/use-toast'

export default function useModalRegisterEvent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { user } = useAuth()
  const form = useForm<TypeSchemaRegisterEvent>({
    resolver: zodResolver(schemaRegisterEvent),
  })

  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateEventRequest) => EventsServices.create(data),
    onError: (error: Error) => {
      toast({ title: error.message, variant: 'destructive' })
    },
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['events', user?.id] })
      toast({ title: 'Evento cadastrado com sucesso' })
      setIsDialogOpen(false)
    },
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
