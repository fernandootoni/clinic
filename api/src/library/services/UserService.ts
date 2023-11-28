import "reflect-metadata";
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { AppError } from "../../config/errors/AppError";
import { User } from "../entities/User"
import { IUsersRepository } from "../../common/interface/repositories/IUsersRepository"
import { ICreateUserDTO } from "../../common/dtos/user/IUserCreateDTO";
import { IUpdateUserDTO } from "../../common/dtos/user/IUserUpdateDTO";
import { IUserChangeAccessDTO } from "../../common/dtos/user/IUserChangeAccessDTO";
import { Token } from "../helper/Token";

@injectable()
class UserService {
  private token: Token

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    this.token = new Token()
  }

  async create(user: ICreateUserDTO): Promise<void> {
    const { email } = user
    const emailAlreadyTaken = await this.usersRepository.findByEmail(email)
    if(emailAlreadyTaken) {
      throw new AppError("Email already taken")
    }

    const passwordHash = await hash(user.password, 8)
    user.password = passwordHash

    await this.usersRepository.create(user)
  }

  async update({ id, user }: IUpdateUserDTO): Promise<void> {
    const { password } = user
    
    const [ userById, userByEmail ] = await Promise.all([
      this.usersRepository.findById(id),
      this.usersRepository.findByEmail(user.email)
    ])
    
    if(userByEmail){
      if(userByEmail.id !== userById.id) {
        throw new AppError("Email is already been taken by another user")
      }
    }
    
    const hashPassword = await hash(password!, 8)
    user.password = hashPassword

    await this.usersRepository.update({id, user})
  }

  async list(): Promise<User[]> {
    const users = await this.usersRepository.list()
    return users
  }

  async listUser(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id)
    if(!user) {
      throw new AppError("User not found")
    }

    return user
  }

  async changeAccess({id, access_level}: IUserChangeAccessDTO) {
    await this.usersRepository.updateAccess(id, access_level)
  }

  async toggleEnable(id: string): Promise<void> {
    await this.usersRepository.toggleEnable(id)
  }

  async listEnable() {
    const enabledUsers = await this.usersRepository.listEnable()
    return enabledUsers
  }
}

export { UserService }