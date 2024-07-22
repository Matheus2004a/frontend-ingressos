import { Event } from '@/app/entities/Event'
import TicketServices from '@/app/services/TicketServices'
import { useQuery } from '@tanstack/react-query'

export default function useTickets(event: Event) {
  const { data, isPending } = useQuery({
    queryKey: ['tickets', event.id],
    queryFn: async () => TicketServices.listAll(event.id),
  })

  return {
    tickets: data ?? [],
    isLoading: isPending,
  }
}
