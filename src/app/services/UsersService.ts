import { User } from '../entities/User'
import { httpClient } from './httpClient'

class UsersService {
  async me() {
    const { data } = await httpClient.get<User>('/user/me')
    return data
  }
}

export default new UsersService()
