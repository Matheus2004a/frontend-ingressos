import { CreateTicketRequest, TicketsResponse } from '../entities/Ticket'
import { httpClient } from './httpClient'

class TicketServices {
  async listAll(eventId: string) {
    const { data } = await httpClient.get<TicketsResponse[]>(
      `/controlleTicket/find/${eventId}`,
    )
    return data
  }

  async create(credentials: CreateTicketRequest) {
    return httpClient.post('/ticket/create', credentials)
  }
}

export default new TicketServices()
