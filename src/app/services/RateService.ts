import { RateRequest } from '../entities/Rate'
import { httpClient } from './httpClient'

class RateService {
  async create(rate: RateRequest) {
    return httpClient.post('/rates/create', rate)
  }
}

export default new RateService()
