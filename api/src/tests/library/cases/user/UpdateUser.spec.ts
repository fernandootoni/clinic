import { AppError } from "../../../../config/errors/AppError";
import { UserService } from "../../../../library/services/UserService";
import { firstUser, secondUser } from "../../models/User.model";
import { UserRepositoryMock } from "../../repositories/UserRepository.mock";

let userService: UserService
let userRepository: UserRepositoryMock

describe("Update user", () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    userService = new UserService(userRepository)

    await userService.create(firstUser)
  })

  it("Should be able to update a user", async () => {
    const userCreated = await userRepository.findByEmail(firstUser.email)
    const id = userCreated?.id
    if(!id) {
      throw new AppError("User not found")
    }

    const updatePayload = {
      name: "User updated",
      email: "user.updated@hotmail.com",
      password: "1234",
      hourlywage: 60,
      supervisorhourlywage: 60
    }

    await userService.update({ id, user: updatePayload })

    const userUpdated = await userRepository.findById(id)

    expect(userUpdated.name).toBe(updatePayload.name)
    expect(userUpdated.email).toBe(updatePayload.email)
    expect(userUpdated.hourlywage).toBe(updatePayload.hourlywage)
    expect(userUpdated.supervisorhourlywage).toBe(updatePayload.supervisorhourlywage)
  })

  it("Should not be able to update a user that does not exist", async () => {
    expect(async () => {
      await userService.update({ id: "1234", user: firstUser })
    }).rejects.toEqual(new AppError("User don't exist"))
  })
  
  it("Should not be able to update to an email that is already in use by another user", async () => {
    expect(async () => {
      const createdUser = await userRepository.findByEmail(firstUser.email)
      
      await userService.create(secondUser)
  
      const updatePayload = {
        name: "Fernando Otoni",
        email: "joao.otoni@hotmail.com",
        password: "1234",
        hourlywage: 30,
        supervisorhourlywage: 30
      }
  
      await userService.update({ id: createdUser?.id!, user: updatePayload })
    }).rejects.toEqual(new AppError("Email is already been taken by another user"))
  })
})