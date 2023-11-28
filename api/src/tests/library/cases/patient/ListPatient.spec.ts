import { PatientService } from "../../../../library/services/PatientService"
import { firstPatient, secondPatient, thirdPatient } from "../../models/Patient.model"
import { PatientRepositoryMock } from "../../repositories/PatientRepository.mock"

let patientRepository: PatientRepositoryMock
let patientService: PatientService

describe("List patient", () => {
  beforeEach(async () => {
    patientRepository = new PatientRepositoryMock()
    patientService = new PatientService(patientRepository)

    await patientService.create(firstPatient)
    await patientService.create(secondPatient)
    await patientService.create(thirdPatient)
  })

  it("Should be able to list one patient", async () => {
    const firstPatientCreated = await patientRepository.findByPhone(firstPatient.phone)
    const patient = await patientService.listPatient(firstPatientCreated!.id!)

    expect(patient.name).toBe(firstPatient.name)
    expect(patient.responsible).toBe(firstPatient.responsible)
    expect(patient.phone).toBe(firstPatient.phone)
  })

  it("Should be able to list all patient", async () => {
    const allPatients = await patientService.list()
    const allPatientsLength = patientRepository.patients.length

    expect(allPatients.length).toBe(allPatientsLength)
  })

  it("Should be able to list only enabled patients", async () => {
    const firstPatientCreated = await patientRepository.findByPhone(firstPatient.phone)
    await patientService.toggleEnable(firstPatientCreated?.id!)

    const allPatients = await patientService.list()
    const allPatientsEnabled = await patientService.listEnabled()

    expect(allPatients.length).toBeGreaterThan(allPatientsEnabled.length)
  })
})