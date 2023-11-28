interface IUpdateUserDTO {
  id: string
  user: {
    name: string
    email: string
    password: string
    hourlywage: number
    supervisorhourlywage: number
  }
} 

export { IUpdateUserDTO }