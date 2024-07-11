import useAuth from '@/app/hooks/useAuth'
import EventsServices from '@/app/services/EventsServices'
import { useQuery } from '@tanstack/react-query'

export default function useEvents() {
  const { user } = useAuth()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['events', user?.id],
    queryFn: async () => EventsServices.listAll(user?.id ?? ''),
    enabled: !!user,
  })

  return {
    events: data ?? [],
    isError,
    error,
    isLoading,
  }
}
