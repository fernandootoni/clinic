import { AppointmentService } from "../../../../library/services/AppointmentService"
import { PatientService } from "../../../../library/services/PatientService"
import { UserService } from "../../../../library/services/UserService"
import { firstPatient, secondPatient, thirdPatient } from "../../models/Patient.model"
import { firstUser, secondUser, thirdUser } from "../../models/User.model"
import { AppointmentRepositoryMock } from "../../repositories/AppointmentRepository.mock"
import { PatientRepositoryMock } from "../../repositories/PatientRepository.mock"
import { UserRepositoryMock } from "../../repositories/UserRepository.mock"

let appointmentRepository: AppointmentRepositoryMock
let userRepository: UserRepositoryMock
let patientRepository: PatientRepositoryMock

let userService: UserService
let patientService: PatientService
let appointmentService: AppointmentService

let firstUserByEmail: any
let secondUserByEmail: any
let thirdUserByEmail: any

let firstPatientByPhone: any
let secondPatientByPhone: any
let thirdPatientByPhone: any

let appointment: any

describe("Toggle Appointment enable", () => {
  beforeAll(async () => {
    userRepository = new UserRepositoryMock()
    patientRepository = new PatientRepositoryMock()
    appointmentRepository = new AppointmentRepositoryMock()
    
    userService = new UserService(userRepository)
    patientService = new PatientService(patientRepository)
    appointmentService = new AppointmentService(
      appointmentRepository, userRepository, patientRepository
    )
      
    await userService.create(firstUser)
    await userService.create(secondUser)
    await userService.create(thirdUser)
    firstUserByEmail = await userRepository.findByEmail(firstUser.email)
    secondUserByEmail = await userRepository.findByEmail(secondUser.email)
    thirdUserByEmail = await userRepository.findByEmail(thirdUser.email)

    await patientService.create(firstPatient)
    await patientService.create(secondPatient)
    await patientService.create(thirdPatient)
    firstPatientByPhone = await patientRepository.findByPhone(firstPatient.phone)
    secondPatientByPhone = await patientRepository.findByPhone(secondPatient.phone)
    thirdPatientByPhone = await patientRepository.findByPhone(thirdPatient.phone)

    appointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Quarta",
      hour: 16,
      minute: 0,
      duration: 120,
    }
  })

  it("Should be able to toggle an appointment", async () => {
    const appointmentCreated = await appointmentService.create(appointment)

    await appointmentService.toggleEnable(appointmentCreated.id!)

    expect(appointmentCreated.enabled).toBe(false)
  })
})