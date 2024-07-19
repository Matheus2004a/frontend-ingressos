import TicketServices from '@/app/services/TicketServices'
import { useQuery } from '@tanstack/react-query'

export default function useTickets() {
  const { data, isPending } = useQuery({
    queryKey: ['tickets'],
    queryFn: async (eventId: string) => TicketServices.listAll(eventId),
  })

  return {
    tickets: data ?? [],
    isLoading: isPending,
  }
}
