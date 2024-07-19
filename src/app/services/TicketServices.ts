import { Ticket } from '../entities/Ticket'
import { httpClient } from './httpClient'

class TicketServices {
  async listAll(eventId: string): Promise<Ticket[]> {
    const { data } = await httpClient.get(`/ticket/findAll/${eventId}`)
    return data
  }

  async create(credentials: Ticket) {
    return httpClient.post('/ticket/create', credentials)
  }
}

export default new TicketServices()
