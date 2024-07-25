import { CreateSaleTicketRequest } from '../entities/Sale'
import { httpClient } from './httpClient'

class SaleService {
  async create(credentials: CreateSaleTicketRequest) {
    return httpClient.post('/sale/create', credentials)
  }
}

export default new SaleService()
