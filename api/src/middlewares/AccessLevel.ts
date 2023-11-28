import { NextFunction, Request, Response } from "express";
import { AppError } from "../config/errors/AppError";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../library/repositories/UsersRepository";

interface IPayload {
  sub: string
}

export async function admin(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization
  if(!authHeader)
    throw new AppError("Token missing", 401)

  const [ , token] = authHeader.split(" ")

  request.headers.token = token

  try {
    const { sub: userId } = verify(token, "11d954242f79ea09f3585c7dea4f9d46") as IPayload
    
    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId)
    if(!user)
      throw new AppError("User does not exists!", 401)

    if(user.access_level! < 1) 
      throw new AppError("Not permitted to access")

    request.body.userLoggedId = user.id

    next()
  } catch (error) {
    throw new AppError("You cannot perform this action", 401)
  }
}