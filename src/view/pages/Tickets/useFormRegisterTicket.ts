import { Ticket } from '@/app/entities/Ticket'
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

export default function useFormRegisterTicket() {
  const { eventSelected } = useEvent()

  const form = useForm<TypeSchemaRegisterTicket>({
    resolver: zodResolver(schemaRegisterTicket),
  })

  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Ticket) => TicketServices.create(data),
    onError: (error: Error) => {
      toast({ title: error.message || 'Erro interno', variant: 'destructive' })
    },
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
      toast({ title: 'Ticket cadastrado com sucesso' })
    },
  })

  async function onSubmit(values: Ticket) {
    const payload = {
      eventId: eventSelected?.id,
      type: values.type,
      price: currencyStringToNumber(values.price),
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
