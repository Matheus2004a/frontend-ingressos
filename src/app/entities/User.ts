export interface UserSigninRequest {
  email: string
  password: string
}

export interface UserSigninResponse {
  id: string
  email: string
  token: string
}
