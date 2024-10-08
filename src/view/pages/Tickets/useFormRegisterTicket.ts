import { CreateTicketRequest } from '@/app/entities/Ticket'
import useEvent from '@/app/hooks/useEvent'
import TicketServices from '@/app/services/TicketServices'
import {
  schemaRegisterTicket,
  TypeSchemaRegisterTicket,
} from '@/app/validations/schemaRegisterTicket'
import { toast } from '@/components/ui/use-toast'
import { currencyStringToNumber } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function useFormRegisterTicket() {
  const { eventSelected } = useEvent()

  const form = useForm<TypeSchemaRegisterTicket>({
    resolver: zodResolver(schemaRegisterTicket),
  })

  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateTicketRequest) =>
      TicketServices.create(data),
    onError: (error: Error) => {
      toast({ title: error.message || 'Erro interno', variant: 'destructive' })
    },
    onSuccess: () => {
      form.reset()
      navigate('/')
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
      toast({ title: 'Ticket cadastrado com sucesso' })
    },
  })

  async function onSubmit(values: CreateTicketRequest) {
    const payload = {
      eventId: eventSelected?.id,
      type: values.type,
      price: Number(values.price),
      qtTicket: currencyStringToNumber(values.qtTicket),
      dtAvailability: new Date(values.dtAvailability).toISOString(),
    }

    mutateAsync(payload)
  }

  return {
    form,
    onSubmit,
    isLoading: isPending,
    eventSelected,
  }
}
