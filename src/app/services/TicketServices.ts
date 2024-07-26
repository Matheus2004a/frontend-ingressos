import { Ticket, TicketsResponse } from '../entities/Ticket'
import { httpClient } from './httpClient'

class TicketServices {
  async listAll(eventId: string) {
    const { data } = await httpClient.get<TicketsResponse[]>(
      `/controlleTicket/find/${eventId}`,
    )
    return data
  }

  async listAllTicketsByType(eventId: string, type: 'VIP' | 'PISTA') {
    const { data } = await httpClient.get<TicketsResponse[]>(
      `/ticket/findAll/${eventId}/?type=${type}`,
    )
    return data
  }

  async create(credentials: Ticket) {
    return httpClient.post('/ticket/create', credentials)
  }
}

export default new TicketServices()
