import { CreateSaleTicketRequest } from '@/app/entities/Sale'
import useAuth from '@/app/hooks/useAuth'
import SaleService from '@/app/services/SaleService'
import TicketServices from '@/app/services/TicketServices'
import {
  schemaRegisterSale,
  TypeSchemaRegisterSale,
} from '@/app/validations/schemaRegisterSale'
import { toast } from '@/components/ui/use-toast'
import { currencyStringToNumber } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function useModalConfirmationSaleTicket() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isFirstRender = useRef(true)

  const { user } = useAuth()

  const form = useForm<TypeSchemaRegisterSale>({
    resolver: zodResolver(schemaRegisterSale),
  })

  const { data: ticketsByEventId } = useQuery({
    queryKey: ['tickets', 'adb0a022-0f42-4849-bfad-47f4102e5a8d', 'PISTA'],
    queryFn: () =>
      TicketServices.listAllTicketsByType(
        'adb0a022-0f42-4849-bfad-47f4102e5a8d',
        'PISTA',
      ),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateSaleTicketRequest) =>
      SaleService.create(data),
    onSuccess: () => {
      form.reset()
      toast({ title: 'Evento cadastrado com sucesso' })
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
    if (!ticketsByEventId) {
      return toast({ title: 'Ingressos já esgotados', variant: 'destructive' })
    }

    await mutateAsync({
      ticketId: ticketsByEventId[0].id,
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
