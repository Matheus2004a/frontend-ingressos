import { Event } from '@/app/entities/Event'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import useTickets from '@/view/pages/Tickets/useTickets'

interface CardTicketProps {
  event: Event
  onSelectedTicketId(ticketId: string): void
}

export function CardTicket({ event, onSelectedTicketId }: CardTicketProps) {
  const { tickets, isLoading } = useTickets(event)

  if (isLoading) {
    return <p>Carregando ingressos...</p>
  }

  if (!isLoading && tickets.length === 0) {
    return <Badge variant="destructive">Nenhum ingresso disponível</Badge>
  }

  return tickets?.map((ticket) => (
    <Card
      key={ticket.id}
      className="w-full md:w-3/5 p-4"
      onClick={() => onSelectedTicketId(ticket.id)}
    >
      <div className="flex justify-between items-center gap-4">
        <p className="font-bold">Tipo: {ticket.type}</p>
        <Badge color="primary">{ticket.qtTicket} disponíveis</Badge>
      </div>
    </Card>
  ))
}
