enum TicketType {
  PISTA = 'PISTA',
  VIP = 'VIP',
}

export interface Ticket {
  eventId?: string
  ownerId?: string
  type: TicketType
  price: number
  qtTicket: number
  dtAvailability: string
}

export interface TicketsResponse {
  id: string
  eventId: string
  ownerId: string | undefined
  type: TicketType
  price: number
  qtTicket: number
  dtAvailability: string
}
