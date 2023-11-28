import { Router } from 'express'
import { AuthController } from '../endpoints/authenticate/AuthController'
import { ensureAuthenticate } from '../middlewares/EnsureAuthenticate'

const authRoutes = Router()
const authController = new AuthController()

authRoutes.post("/", authController.login)
authRoutes.get("/checkuser", ensureAuthenticate, authController.checkUser)

export { authRoutes }