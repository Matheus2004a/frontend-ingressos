import { CreateEventRequest, Event } from '../entities/Event'
import { httpClient } from './httpClient'

class EventsServices {
  async listAll() {
    const { data } = await httpClient.get<Event[]>('/event/findAll')
    return data
  }

  async create(credentials: CreateEventRequest) {
    return httpClient.post('/event/create', credentials)
  }

  async update({ id, ...credentials }: Event) {
    return httpClient.patch(`/event/update/${id}`, credentials)
  }

  async remove(eventId: string) {
    return httpClient.delete(`/event/delete/${eventId}`)
  }
}

export default new EventsServices()
