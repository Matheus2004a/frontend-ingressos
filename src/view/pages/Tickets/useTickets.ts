import { Event } from '@/app/entities/Event'
import useEvent from '@/app/hooks/useEvent'
import TicketServices from '@/app/services/TicketServices'
import { useQuery } from '@tanstack/react-query'

export default function useTickets(event: Event) {
  const { data, isPending } = useQuery({
    queryKey: ['tickets', event.id],
    queryFn: async () => TicketServices.listAll(event.id),
  })

  const { ticketTypeSelected, handleTicketTypeSelected } = useEvent()

  const { data: ticketsByEvent, isPending: isLoadingTicketsByEvent } = useQuery(
    {
      queryKey: ['controlleTicket', event.id, ticketTypeSelected],
      queryFn: async () =>
        TicketServices.listAllByEventId(event.id, ticketTypeSelected!),
      enabled: !!ticketTypeSelected,
    },
  )

  return {
    tickets: data ?? [],
    isLoading: isPending,
    ticketsByEvent,
    isLoadingTicketsByEvent,
    handleTicketTypeSelected,
  }
}
