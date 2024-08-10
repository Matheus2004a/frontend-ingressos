export interface CreateSaleTicketRequest {
  ticketId: string
  userId: string
  amountTotal: string | number
}

export interface ListSaleTicketResponse {
  id: string
  userId: string
  ticketId: string
  amountTotal: number
  dateSale: Date
  confirmationCode: string
  user: {
    name: string
  }
  ticket: {
    price: string
    event: {
      name: string
      dtStart: Date
      dtEnd: Date
    }
  }
}

export type Sale = CreateSaleTicketRequest
