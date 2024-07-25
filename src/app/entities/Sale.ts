export interface CreateSaleTicketRequest {
  ticketId: string
  userId: string
  amountTotal: string | number
}

export type Sale = CreateSaleTicketRequest
