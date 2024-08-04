import { Event } from '@/app/entities/Event'
import { CreateSaleTicketRequest } from '@/app/entities/Sale'
import useAuth from '@/app/hooks/useAuth'
import SaleService from '@/app/services/SaleService'
import {
  schemaRegisterSale,
  TypeSchemaRegisterSale,
} from '@/app/validations/schemaRegisterSale'
import { toast } from '@/components/ui/use-toast'
import { currencyStringToNumber } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useTickets from '../Tickets/useTickets'

export default function useModalConfirmationSaleTicket(event: Event) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isFirstRender = useRef(true)

  const { user } = useAuth()
  const { ticketsByEvent } = useTickets(event)

  const form = useForm<TypeSchemaRegisterSale>({
    resolver: zodResolver(schemaRegisterSale),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateSaleTicketRequest) =>
      SaleService.create(data),
    onSuccess: () => {
      toast({ title: 'Venda de ingresso cadastrada com sucesso' })
      setIsDialogOpen(false)
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: 'destructive' })
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

  async function onSubmit() {
    await mutateAsync({
      ticketId: ticketsByEvent!.id,
      userId: user!.id,
      amountTotal: currencyStringToNumber(form.getValues().amountTotal),
    })
  }

  return {
    form,
    onSubmit,
    isPending,
    isDialogOpen,
    setIsDialogOpen,
  }
}
