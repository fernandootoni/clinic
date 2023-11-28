export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  hourlywage: number,
  supervisorhourlywage: number
  created_at: Date,
  access_level: number,
  enable?: boolean
}