import { CreateEventRequest, Event } from '../entities/Event'
import { httpClient } from './httpClient'

class EventsServices {
  async listAll(userId: string) {
    const { data } = await httpClient.get<Event[]>(`/event/findAll/${userId}`)
    return data
  }

  async create(credentials: CreateEventRequest) {
    return httpClient.post('/event/create', credentials)
  }

  async remove(eventId: string) {
    return httpClient.delete(`/event/delete/${eventId}`)
  }
}

export default new EventsServices()
