import useAuth from '@/app/hooks/useAuth'
import EventsServices from '@/app/services/EventsServices'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useModalRemoveEvent() {
  const { user } = useAuth()

  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (eventId: string) => EventsServices.remove(eventId),
    onError: (error: Error) => {
      toast({ title: error.message || 'Erro interno', variant: 'destructive' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', user?.id] })
      toast({ title: 'Evento removido com sucesso' })
    },
  })

  async function removeEvent(eventId: string) {
    mutateAsync(eventId)
  }

  return {
    removeEvent,
    isPending,
  }
}
