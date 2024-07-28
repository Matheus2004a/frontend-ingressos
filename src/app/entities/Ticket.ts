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

export interface CreateTicketRequest {
  eventId?: string
  type: 'PISTA' | 'VIP'
  price: string | number
  qtTicket: string | number
  dtAvailability: string
}

export interface TicketsResponse {
  id: string
  qtTicket: number
  type: TicketType
  price: number
  eventId: string
}
