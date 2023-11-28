import { AppError } from "../../../../config/errors/AppError"
import { UserService } from "../../../../library/services/UserService"
import { firstUser } from "../../models/User.model"
import { UserRepositoryMock } from "../../repositories/UserRepository.mock"

let userRepository: UserRepositoryMock
let userService: UserService
let userWithTheSameEmail: any
let userCreated: any

describe("Create user", () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    userService = new UserService(userRepository)

    await userService.create(firstUser)
    userCreated = await userRepository.findByEmail(firstUser.email)

    userWithTheSameEmail = {
      name: "Joao Otoni",
      email: "fernando.otoni@hotmail.com",
      password: "1234",
      hourlywage: 30,
      supervisorhourlywage: 30
    }
  })

  it("Should be able to create a new User", async () => {
    expect(userCreated).toHaveProperty("id")
  })

  it("Should not be able to create a new User with the same Email", async () => {
    await expect(
      userService.create(userWithTheSameEmail)
    ).rejects.toEqual(new AppError("Email already taken"))
  })

  it("User must have property 'access_level'", async () => {
    expect(userCreated).toHaveProperty("access_level")
  })

  it("User property 'access_level' must be '0'", async () => {
    expect(userCreated?.access_level!).toEqual(0)
  })

  it("User must have property 'enable'", async () => {
    expect(userCreated).toHaveProperty("enable")
  })

  it("User property 'enable' must be 'true'", async () => {
    expect(userCreated!.enable).toBe(true)
  })
})