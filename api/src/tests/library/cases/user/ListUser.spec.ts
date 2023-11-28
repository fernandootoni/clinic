import { UserService } from "../../../../library/services/UserService"
import { firstUser, secondUser, thirdUser } from "../../models/User.model";
import { UserRepositoryMock } from "../../repositories/UserRepository.mock";

let userService: UserService
let userRepository: UserRepositoryMock

describe("Create user", () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    userService = new UserService(userRepository)

    await userService.create(firstUser)
    await userService.create(secondUser)
    await userService.create(thirdUser)
  })

  it("Should be able to list one user", async () => {
    const userCreated = await userRepository.findByEmail(firstUser.email)

    const userById = await userRepository.findById(userCreated!.id!)

    expect(userById.name).toBe(firstUser.name)
    expect(userById.email).toBe(firstUser.email)
  })

  it("Should be able to list all users", async () => {
    const allUsers = await userRepository.list()
    const usersRepositoryLength = userRepository.users.length

    expect(allUsers.length).toBe(usersRepositoryLength)
  })

  it("Should be able to list only enabled users", async () => {
    const secondUserCreated = await userRepository.findByEmail(secondUser.email)
    await userService.toggleEnable(secondUserCreated?.id!)

    const allUsers = await userRepository.list()
    const allUsersEnabled = await userRepository.listEnable()

    expect(allUsers.length).toBeGreaterThan(allUsersEnabled.length)
  })
})