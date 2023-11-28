import { UserService } from "../../../../library/services/UserService"
import { firstUser } from "../../models/User.model"
import { UserRepositoryMock } from "../../repositories/UserRepository.mock"

let userService: UserService
let userRepository: UserRepositoryMock
let userCreated: any

describe("Create user", () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    userService = new UserService(userRepository)

    await userService.create(firstUser)
    userCreated = await userRepository.findByEmail(firstUser.email)
  })

  it("Should be able to toggle a User 'enable' to false", async () => {
    await userService.toggleEnable(userCreated?.id!)
  
    expect(userCreated?.enable).toBe(false)
  })

  it("Should be able to toggle a User 'enable' to true", async () => {
    await userService.toggleEnable(userCreated?.id!)
    await userService.toggleEnable(userCreated?.id!)
  
    expect(userCreated?.enable).toBe(true)
  })
})