import { User } from "../../../library/entities/User"
import { ICreateUserDTO } from "../../dtos/user/IUserCreateDTO"
import { IUpdateUserDTO } from "../../dtos/user/IUserUpdateDTO"

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>
  update({ id, user }: IUpdateUserDTO): Promise<void>
  updateAccess(id: string, access: number): Promise<void>
  list(): Promise<User[]>
  listEnable(): Promise<User[]>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User>
  getName(id: string): Promise<string>
  toggleEnable(id: string): Promise<void>
}

export { IUsersRepository }