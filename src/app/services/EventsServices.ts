import { Event } from '../entities/Event'
import { httpClient } from './httpClient'

class EventsServices {
  async listAll(userId: string) {
    const { data } = await httpClient.get<Event[]>(`/event/findAll/${userId}`)
    return data
  }
}

export default new EventsServices()
