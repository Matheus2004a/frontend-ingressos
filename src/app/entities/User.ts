export interface UserSigninRequest {
  email: string
  password: string
}

export interface UserSignupRequest extends UserSigninRequest {
  name: string
}

export interface UserSigninResponse {
  id: string
  email: string
  token: string
}

export interface UserSignupResponse {
  id: string
  email: string
  tokenJwt: string
}
