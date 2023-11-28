import { AppError } from "../../../../config/errors/AppError"
import { PatientService } from "../../../../library/services/PatientService"
import { firstPatient } from "../../models/Patient.model"
import { PatientRepositoryMock } from "../../repositories/PatientRepository.mock"

let patientRepository: PatientRepositoryMock
let patientService: PatientService
let patientCreated: any

describe("Create patient", () => {
  beforeEach(async () => {
    patientRepository = new PatientRepositoryMock()
    patientService = new PatientService(patientRepository)

    await patientService.create(firstPatient)
    patientCreated = await patientRepository.findByPhone(firstPatient.phone)
  })

  it("Should be able to create a patient", async () => {
    expect(patientCreated).toHaveProperty("id")
  })

  it("Should not be able to create a patient with a phone number that's already in use", async () => {
    await expect(
      patientService.create(firstPatient)
    ).rejects.toEqual(new AppError("Phone already taken"))
  })

  it("Patient must have property 'enabled'", async () => {
    expect(patientCreated).toHaveProperty("enabled")
  })

  it("Patient'enabled' must be true", async () => {
    expect(patientCreated?.enabled).toBe(true)
  })
})