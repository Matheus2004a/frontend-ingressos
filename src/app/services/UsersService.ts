import { User } from '../contexts/AuthContext'
import { httpClient } from './httpClient'

class UsersService {
  async me() {
    return httpClient.get<User>('/user/me')
  }
}

export default new UsersService()
