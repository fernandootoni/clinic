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

  it("Should be able to change User 'access_level'", async () => {
    const access_level = 2

    await userService.changeAccess({ id: userCreated.id, access_level })

    expect(userCreated!.access_level).toBe(access_level)
  })
})