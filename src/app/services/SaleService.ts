import {
  CreateSaleTicketRequest,
  ListSaleTicketResponse,
} from '../entities/Sale'
import { httpClient } from './httpClient'

class SaleService {
  async create(credentials: CreateSaleTicketRequest) {
    return httpClient.post('/sale/create', credentials)
  }

  async listAll(userId: string) {
    const { data } = await httpClient.get<ListSaleTicketResponse[]>(
      `/sale/findAll/${userId}`,
    )

    return data
  }
}

export default new SaleService()
