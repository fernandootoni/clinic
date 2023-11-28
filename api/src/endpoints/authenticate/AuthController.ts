import { Request, Response } from "express"
import { container } from 'tsyringe'
import { AuthService } from "../../library/services/AuthService"

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authService = container.resolve(AuthService)

    const userInfo = await authService.login({email, password})

    return response.status(200).send(userInfo)
  }

  async checkUser(request: Request, response: Response): Promise<Response> {
    const token = request.headers.authorization?.split(" ")[1]

    const authService = container.resolve(AuthService)

    const user = await authService.checkUser(token!)

    return response.status(200).json(user)
  }
}

export { AuthController }