import { Request, Response } from "express";
import { UserService } from "../../library/services/UserService";
import "reflect-metadata";
import { container } from 'tsyringe'

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user } = request.body

    const userService = container.resolve(UserService)

    await userService.create(user)
    
    return response.status(201).send()
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { user } = request.body

    const userService = container.resolve(UserService)

    await userService.update({ id, user })

    return response.status(200).send()
  }

  async listUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const userService = container.resolve(UserService)

    const user = await userService.listUser(id)

    return response.status(200).send(user)
  }

  async listAll(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService)

    const users = await userService.list()
    
    return response.status(200).json(users)
  }

  async changeAccess(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { access_level } = request.body

    const userService = container.resolve(UserService)

    await userService.changeAccess({id, access_level})

    return response.status(200).json()
  }

  async toggleEnable(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const userService = container.resolve(UserService)

    const user = await userService.toggleEnable(id)

    return response.status(200).json(user)
  }

  async listEnable(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService)

    const usersEnable = await userService.listEnable()

    return response.status(200).json(usersEnable)
  }
}

export { UserController }