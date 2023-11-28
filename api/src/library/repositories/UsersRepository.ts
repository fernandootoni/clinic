import { Repository, getRepository } from "typeorm"
import { IUsersRepository } from "../../common/interface/repositories/IUsersRepository"
import { User } from "../entities/User"
import { AppError } from "../../config/errors/AppError"
import { ICreateUserDTO } from "../../common/dtos/user/IUserCreateDTO"
import { IUpdateUserDTO } from "../../common/dtos/user/IUserUpdateDTO"

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(user: ICreateUserDTO): Promise<void> {
    const newUser = this.repository.create(user)
    await this.repository.save(newUser)
  }

  async update({ id, user }: IUpdateUserDTO): Promise<void> {
    const userToBeUpdated = await this.repository.findOne(id)
    if(!userToBeUpdated) {
      throw new AppError("User don't exist")
    }

    Object.assign(userToBeUpdated, user)
    await this.repository.save(userToBeUpdated)
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find()
    return users
  }

  async listEnable(): Promise<User[]> {
    const enabledUsers = await this.repository.find({enable: true})
    return enabledUsers
  }
  
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    if(!user) {
      throw new AppError("User don't exist")
    }

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({email})
    if(!user) {
      return
    }

    return user
  }

  async getName(id: string): Promise<string> {
    const user = await this.repository.findOne(id)
    if(!user){
      throw new AppError("User don't exist")
    }
    if(!user.name) {
      throw new AppError("User don't have a name")
    }

    return user.name
  }

  async updateAccess(id: string, access: number): Promise<void> {
    const user = await this.repository.findOne(id)
    if(!user)
      throw new AppError("User don't exist")

    user.access_level = access

    await this.repository.save(user)
  }

  async toggleEnable(id: string): Promise<void> {
    const user = await this.repository.findOne(id)
    if(!user)
      throw new AppError("User don't exist")

    user.enable = !user.enable

    await this.repository.save(user)
  }
}

export { UsersRepository }