export interface LoginResponse {
  status: number
  message: string
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export interface UserData {
  name: string
  avatar: string | null
  role: string
}

export interface Login {
  email: string
  password: string
}

export interface Register {
  email: string
  password: string
  password_confirmation: string
  name: string
}

export interface ForgotPassword {
  email: string
  time: string
  device: string
}

export interface ResetPassword {
  email: string
  password: string
  password_confirmation: string
  token: string
}
