import { CreateAppointmentDTO } from "../../../../common/dtos/appointmentRecord/CreateAppointmentRecordDTO";
import { AppError } from "../../../../config/errors/AppError";
import { Appointment } from "../../../../library/entities/Appointment";
import { User } from "../../../../library/entities/User";
import { AppointmentRecordService } from "../../../../library/services/AppointmentRecordService";
import { AppointmentService } from "../../../../library/services/AppointmentService";
import { PatientService } from "../../../../library/services/PatientService";
import { UserService } from "../../../../library/services/UserService";
import { firstPatient, secondPatient, thirdPatient } from "../../models/Patient.model";
import { firstUser, secondUser, thirdUser } from "../../models/User.model";
import { AppointmentRecordRepositoryMock } from "../../repositories/AppointmentRecord.mock";
import { AppointmentRepositoryMock } from "../../repositories/AppointmentRepository.mock";
import { PatientRepositoryMock } from "../../repositories/PatientRepository.mock";
import { UserRepositoryMock } from "../../repositories/UserRepository.mock";

let appointmentRepository: AppointmentRepositoryMock
let userRepository: UserRepositoryMock
let patientRepository: PatientRepositoryMock
let recordRepository: AppointmentRecordRepositoryMock

let userService: UserService
let patientService: PatientService
let appointmentService: AppointmentService
let recordService: AppointmentRecordService

let firstUserByEmail: any
let secondUserByEmail: any
let thirdUserByEmail: any

let firstPatientByPhone: any
let secondPatientByPhone: any
let thirdPatientByPhone: any

let admin: User

let appointment: any

let sundayAppointment: any
let mondayAppointment: any
let tuesdayAppointment: any
let wednesdayAppointment: any
let thursdayAppointment: any
let fridayAppointment: any
let saturdayAppointment: any
let mondayEveningAppointmentAsPsy: any

let createdAppointment: Appointment
let createdAppointmentAtMondayEveningAsPsy: Appointment
let record: any

let appointmentToBeCreated: CreateAppointmentDTO

describe("List Records", () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    patientRepository = new PatientRepositoryMock()
    appointmentRepository = new AppointmentRepositoryMock()
    recordRepository = new AppointmentRecordRepositoryMock()
    
    userService = new UserService(userRepository)
    patientService = new PatientService(patientRepository)
    appointmentService = new AppointmentService(
      appointmentRepository, userRepository, patientRepository
    )
    recordService = new AppointmentRecordService(
      recordRepository, userRepository, appointmentRepository 
    )
     
    await userService.create(firstUser)
    await userService.create(secondUser)
    await userService.create(thirdUser)
    firstUserByEmail = await userRepository.findByEmail(firstUser.email)
    secondUserByEmail = await userRepository.findByEmail(secondUser.email)
    thirdUserByEmail = await userRepository.findByEmail(thirdUser.email)

    await userService.changeAccess({ id: firstUserByEmail.id, access_level: 2})
    admin = firstUserByEmail

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
      hour: 9,
      minute: 0,
      duration: 120,
    }
    sundayAppointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Domingo",
      hour: 16,
      minute: 0,
      duration: 120,
    }
    mondayAppointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Segunda",
      hour: 16,
      minute: 0,
      duration: 120,
    }
    tuesdayAppointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Terca",
      hour: 16,
      minute: 0,
      duration: 120,
    }
    wednesdayAppointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Quarta",
      hour: 16,
      minute: 0,
      duration: 120,
    }
    thursdayAppointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Quinta",
      hour: 16,
      minute: 0,
      duration: 120,
    }
    fridayAppointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Sexta",
      hour: 16,
      minute: 0,
      duration: 120,
    }
    saturdayAppointment = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: firstUserByEmail.id,
      supervisor_id: secondUserByEmail.id,
      day: "Sabado",
      hour: 16,
      minute: 0,
      duration: 120,
    }
    mondayEveningAppointmentAsPsy = {
      patient_id: firstPatientByPhone.id,
      psychologist_id: secondUserByEmail.id,
      supervisor_id: firstUserByEmail.id,
      day: "Segunda",
      hour: 21,
      minute: 0,
      duration: 120,
    }

    createdAppointment = await appointmentService.create(appointment)
    sundayAppointment = await appointmentService.create(sundayAppointment)
    mondayAppointment = await appointmentService.create(mondayAppointment)
    tuesdayAppointment = await appointmentService.create(tuesdayAppointment)
    wednesdayAppointment = await appointmentService.create(wednesdayAppointment)
    thursdayAppointment = await appointmentService.create(thursdayAppointment)
    fridayAppointment = await appointmentService.create(fridayAppointment)
    saturdayAppointment = await appointmentService.create(saturdayAppointment)
    createdAppointmentAtMondayEveningAsPsy = await appointmentService.create(mondayEveningAppointmentAsPsy)

    appointmentToBeCreated = {}

    record = await recordService.create(createdAppointment.id!, admin.id!, appointmentToBeCreated)
    await recordService.create(mondayAppointment.id!, admin.id!, appointmentToBeCreated)
    await recordService.create(tuesdayAppointment.id!, admin.id!, appointmentToBeCreated)
    await recordService.create(wednesdayAppointment.id!, admin.id!, appointmentToBeCreated)
    await recordService.create(thursdayAppointment.id!, admin.id!, appointmentToBeCreated)
    await recordService.create(fridayAppointment.id!, admin.id!, appointmentToBeCreated)
    await recordService.create(saturdayAppointment.id!, admin.id!, appointmentToBeCreated)
    await recordService.create(sundayAppointment.id!, admin.id!, appointmentToBeCreated)
  })

  it("Should be able to list one Record using ID", async () => {
    const recordById = await recordService.listOne(record.id!)

    expect(record).toBe(recordById)
  })

  it("Should be able to list unverified Records", async () => {
    await recordService.verify(record.id!, admin.id!)
    const unverified = await recordService.listUnverified()

    expect(unverified.length).toBe(7)
  })

  it("Should be able to list records using User ID", async () => {
    await recordService.create(createdAppointmentAtMondayEveningAsPsy.id!, admin.id!, appointmentToBeCreated)
    const userRecords = await recordService.listUnverifiedByUser(secondUserByEmail.id!)

    const recordAsPsy = userRecords.appointmentsUnverifiedAsPsy
    const recordAsSup = userRecords.appointmentsUnverifiedAsSup

    expect(recordAsPsy.length).toBe(1)
    expect(recordAsSup.length).toBe(8)
  })

  it("Should be able to get Month Record", async () => {
    const recordAsPsy = await recordService.create(createdAppointmentAtMondayEveningAsPsy.id!, admin.id!, appointmentToBeCreated)

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    await recordService.verify(record.id!, admin.id!)
    await recordService.verify(recordAsPsy.id!, admin.id!)

    const monthRecord = await recordService.getMonthRecord(
      month,
      year,
      secondUserByEmail.id!,
      admin.id!
    )

    expect(monthRecord.salaryAsPsy).toBe((recordAsPsy.duration! / 60)  * secondUserByEmail.hourlywage)
    expect(monthRecord.salaryAsSup).toBe((record.duration! / 60) * secondUserByEmail.supervisorhourlywage)
  })
})