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
