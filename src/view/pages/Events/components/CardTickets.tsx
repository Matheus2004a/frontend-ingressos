import { Event } from '@/app/entities/Event'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import useTickets from '@/view/pages/Tickets/useTickets'

export function CardTicket({ event }: { event: Event }) {
  const { tickets, isLoading } = useTickets(event)

  if (isLoading) {
    return <p>Carregando ingressos...</p>
  }

  if (!isLoading && tickets.length === 0) {
    return <Badge variant="destructive">Nenhum ingresso disponível</Badge>
  }

  return (
    <ul className="flex flex-wrap gap-4">
      {tickets?.map((ticket) => (
        <Card key={ticket.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex justify-between items-center">
            <p className="font-bold">Tipo: {ticket.type}</p>
            <Badge color="primary">{ticket.qtTicket} disponíveis</Badge>
          </div>
          <small className="mt-2">
            Encerra em: {formatDate(new Date(ticket.dtAvailability))}
          </small>
        </Card>
      ))}
    </ul>
  )
}
