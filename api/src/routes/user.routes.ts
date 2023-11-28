import { Router } from 'express'

import { UserController } from '../endpoints/user/UserController'
import { admin } from '../middlewares/AccessLevel'
import { ensureAuthenticate } from '../middlewares/EnsureAuthenticate'
import { UserValidator } from '../library/validators/UserValidator'

const userRoutes = Router()
const userController = new UserController()
const validator = new UserValidator()

userRoutes.get("/:id", userController.listUser)
userRoutes.use(admin)
userRoutes.get("/", userController.listAll)
userRoutes.get("/enable", userController.listEnable)
userRoutes.post(
  "/", 
  validator.basicFields(),
  userController.create
)
userRoutes.put(
  "/:id", 
  validator.basicFields(),
  userController.update
)
userRoutes.patch("/:id/access", userController.changeAccess)
userRoutes.patch("/:id/enable", userController.toggleEnable)

export { userRoutes }