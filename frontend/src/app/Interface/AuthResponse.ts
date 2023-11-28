export interface AuthResponse {
  user: {
    name: string
    email: string
    id: string,
    accessLevel: number
  }
  token: string
}