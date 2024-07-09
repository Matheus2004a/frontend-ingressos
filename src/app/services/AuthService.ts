import { UserSigninRequest, UserSigninResponse } from '../entities/User'
import { httpClient } from './httpClient'

class AuthService {
  async signin(credentials: UserSigninRequest) {
    return httpClient.post<UserSigninResponse>('/user/session', credentials)
  }
}

export default new AuthService()
