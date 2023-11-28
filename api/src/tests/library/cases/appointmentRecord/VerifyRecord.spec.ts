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

let createdAppointment: Appointment
let record: any

let appointmentToBeCreated: CreateAppointmentDTO

describe("Verify Records", () => {
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

    createdAppointment = await appointmentService.create(appointment)
    sundayAppointment = await appointmentService.create(sundayAppointment)
    mondayAppointment = await appointmentService.create(mondayAppointment)
    tuesdayAppointment = await appointmentService.create(tuesdayAppointment)
    wednesdayAppointment = await appointmentService.create(wednesdayAppointment)
    thursdayAppointment = await appointmentService.create(thursdayAppointment)
    fridayAppointment = await appointmentService.create(fridayAppointment)
    saturdayAppointment = await appointmentService.create(saturdayAppointment)

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

  it("Should be able to verify a Record", async () => {
    const recordVerified = await recordService.verify(record.id, admin.id!)

    expect(recordVerified.verified).toBe(true)
  })

  it("Should be able to verify a Record that is already verified", async () => {
    await recordService.verify(record.id, admin.id!)

    await expect(
      recordService.verify(record.id, admin.id!)
    ).rejects.toEqual(new AppError("Record already verified"))
  })
})