import { ICreateUserDTO } from "../../../common/dtos/user/IUserCreateDTO";
import { IUpdateUserDTO } from "../../../common/dtos/user/IUserUpdateDTO";
import { IUsersRepository } from "../../../common/interface/repositories/IUsersRepository";
import { AppError } from "../../../config/errors/AppError";
import { User } from "../../../library/entities/User";

class UserRepositoryMock implements IUsersRepository {
  users: User[] = []

  async create(user: ICreateUserDTO): Promise<void> {
    const newUser = new User()
    Object.assign(newUser, user)

    this.users.push(newUser)
  }

  async update({ id, user }: IUpdateUserDTO): Promise<void> {
    const userToBeUpdated = this.users.find(user => user.id === id)
    if(!userToBeUpdated) {
      throw new AppError("User don't exist")
    }

    Object.assign(userToBeUpdated, user)
    return
  }

  async updateAccess(id: string, access: number): Promise<void> {
    const user = this.users.find(user => user.id === id)
    if(!user){
      throw new AppError("User don't exist")
    }

    user.access_level = access
  }

  async list(): Promise<User[]> {
    return this.users
  }

  async listEnable(): Promise<User[]> {
    return this.users.filter(user => user.enable)
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id)
    if(!user) {
      throw new AppError("User don't exist")
    }

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    if(!user) {
      return
    }

    return user
  }
  
  async getName(id: string): Promise<string> {
    const user = this.users.find(user => user.id === id)
    if(!user){
      throw new AppError("User don't exist")
    }
    if(!user.name) {
      throw new AppError("User don't have a name")
    }

    return user.name
  }
  
  async toggleEnable(id: string): Promise<void> {
    const user = this.users.find(user => user.id === id)
    if(!user){
      throw new AppError("User don't exist")
    }

    user.enable = !user.enable
  }
}

export { UserRepositoryMock }