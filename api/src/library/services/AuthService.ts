import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
const bcrypt = require('bcryptjs')
import { verify } from "jsonwebtoken";

import { IUsersRepository } from '../../common/interface/repositories/IUsersRepository'
import { AppError } from '../../config/errors/AppError'
import { Token } from '../helper/Token'
import { User } from '../entities/User';

interface IRequestAuth {
  email: string
  password: string
}

interface IPayload {
  sub: string
}

interface IResponseAuth {
  user: {
    name: string,
    email: string,
    id: string,
    accessLevel: number
  },
  token: string
}

@injectable()  
class AuthService {
  constructor(
    @inject("UsersRepository")
    private usersRepository : IUsersRepository
  ) {}

  async login({email, password}: IRequestAuth): Promise<IResponseAuth> {
    const user = await this.usersRepository.findByEmail(email)
    if(!user) 
      throw new AppError("Invalid data")

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch)
      throw new AppError("Invalid data")

    const tokenService = new Token()
    
    const token = await tokenService.createUserToken(user)
    const userId = tokenService.getUserByToken(token)

    const tokenReturn: IResponseAuth = {
      user: {
        name: user.name || "",
        email: user.email || "",
        id: userId || "",
        accessLevel: user.access_level! || 0
      },
      token
    }

    return tokenReturn
  }

  async checkUser(token: string): Promise<User> {
    if(!token) throw new AppError("Missing Token")

    const { sub: userId } = 
      verify(token, "11d954242f79ea09f3585c7dea4f9d46") as IPayload

    const user = await this.usersRepository.findById(userId)
    if(!user)
      throw new AppError("User not found")

    return user
  }
}

export { AuthService }