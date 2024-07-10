import {
  UserSigninRequest,
  UserSigninResponse,
  UserSignupRequest,
  UserSignupResponse,
} from '../entities/User'
import { httpClient } from './httpClient'

class AuthService {
  async signin(credentials: UserSigninRequest) {
    return httpClient.post<UserSigninResponse>('/user/session', credentials)
  }

  async signup(credentials: UserSignupRequest) {
    return httpClient.post<UserSignupResponse>('/user/register', credentials)
  }
}

export default new AuthService()
