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

let firstAppointment: any
let secondAppointment: any
let thirdAppointment: any

describe("List Appointment", () => {
  beforeEach(async () => {
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

    firstAppointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Segunda",
      hour: 9,
      minute: 0,
      duration: 120,
    }

    secondAppointment = {
      patient_id: secondPatientByPhone.id,
      psychologist_id: secondUserByEmail.id,
      supervisor_id: firstUserByEmail.id,
      day: "Segunda",
      hour: 12,
      minute: 0,
      duration: 120,
    }

    thirdAppointment = {
      patient_id: thirdPatientByPhone.id,
      psychologist_id: secondUserByEmail.id,
      supervisor_id: firstUserByEmail.id,
      day: "Segunda",
      hour: 16,
      minute: 0,
      duration: 120,
    }

    await appointmentService.create(firstAppointment)
    firstAppointment.day = 'Terca'
    await appointmentService.create(firstAppointment)
    firstAppointment.day = 'Quarta'
    await appointmentService.create(firstAppointment)
    firstAppointment.day = 'Quinta'
    await appointmentService.create(firstAppointment)
    firstAppointment.day = 'Sexta'
    await appointmentService.create(firstAppointment)


    await appointmentService.create(secondAppointment)

    await appointmentService.create(thirdAppointment)
  })

  it("List all appointments", async () => {
    const allAppointments = await appointmentService.list()

    expect(allAppointments?.length).toBe(7)
  })

  it("Should be able to list one appointment", async () => {
    const appointment = {
      patient_id: secondPatientByPhone.id,
      psychologist_id: secondUserByEmail.id,
      supervisor_id: firstUserByEmail.id,
      day: "Segunda",
      hour: 18,
      minute: 0,
      duration: 60,
    }
    const appointmentCreated = await appointmentService.create(appointment)

    const appointmentById = await appointmentService.listAppointment(appointmentCreated.id!)

    expect(appointmentById?.patient_id).toEqual(appointment.patient_id)
    expect(appointmentById?.psychologist_id).toEqual(appointment.psychologist_id)
    expect(appointmentById?.supervisor_id).toEqual(appointment.supervisor_id)
    expect(appointmentById?.day).toEqual(appointment.day)
    expect(appointmentById?.hour).toEqual(appointment.hour)
    expect(appointmentById?.minute).toEqual(appointment.minute)
    expect(appointmentById?.duration).toEqual(appointment.duration)
  })

  it("Should be able to list only enabled appointments", async () => {
    const appointment = {
      patient_id: secondPatientByPhone.id,
      psychologist_id: secondUserByEmail.id,
      supervisor_id: firstUserByEmail.id,
      day: "Segunda",
      hour: 18,
      minute: 0,
      duration: 60,
    }
    const appointmentCreated = await appointmentService.create(appointment)
    await appointmentService.toggleEnable(appointmentCreated!.id!)

    const allEnabledAppointments = await appointmentService.listEnable()

    expect(allEnabledAppointments.length).toBe(7)
  })

  it("Should be able to list appointments using patient ID", async () => {
    const allAppointmentsByPatient = await appointmentService.listByPatient(firstPatientByPhone.id)

    expect(allAppointmentsByPatient.length).toBe(5)
  })

  it("Should be able to list appointments by psychologist ID", async () => {
    const allAppointmentsByPsychologist = await appointmentService.listByPsychologist(firstUserByEmail.id)

    expect(allAppointmentsByPsychologist.length).toBe(5)
  })

  it("Should be able to list appointments by supervisor ID", async () => {
    const allAppointmentsByPsychologist = await appointmentService.listBySupervisor(firstUserByEmail.id)

    expect(allAppointmentsByPsychologist.length).toBe(2)
  })

  it("Should be able to list appointments by user ID", async () => {
    const allAppointmentsByUser = await appointmentService.listByUser(firstUserByEmail.id)

    expect(allAppointmentsByUser.length).toBe(7)
  })
})