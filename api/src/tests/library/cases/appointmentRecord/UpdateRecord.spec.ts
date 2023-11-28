import { CreateAppointmentDTO } from "../../../../common/dtos/appointmentRecord/CreateAppointmentRecordDTO";
import { UpdateAppointmentRecordDTO } from "../../../../common/dtos/appointmentRecord/UpdateAppointmentRecordDTO";
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

let appointmentToBeCreated: CreateAppointmentDTO

let updatePayload: UpdateAppointmentRecordDTO

describe("Update Record", () => {
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
     
    //Creating User
    await userService.create(firstUser)
    await userService.create(secondUser)
    await userService.create(thirdUser)
    firstUserByEmail = await userRepository.findByEmail(firstUser.email)
    secondUserByEmail = await userRepository.findByEmail(secondUser.email)
    thirdUserByEmail = await userRepository.findByEmail(thirdUser.email)

    await userService.changeAccess({ id: firstUserByEmail.id, access_level: 2})
    admin = firstUserByEmail

    //Creating Patient
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

    updatePayload = {
      psychologist_id: secondUserByEmail.id!,
      supervisor_id: thirdUserByEmail.id!,
      appointment_date: new Date('2023-09-22 00:00:00').toISOString(),
      duration: 600,
      done: false,
      psychologist_done: false,
      supervisor_done: false,
      done_description: 'Patient canceled',
      done_date: new Date('2023-09-22 00:00:00').toISOString(),
      verified: true,
    }

    createdAppointment = await appointmentService.create(appointment)
    appointmentToBeCreated = {}
  })

  it("Should be able to Update a Record", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    const updatedRecord = await recordService.update(
      updatePayload,
      record.id!,
      admin.id!
    )

    expect(updatedRecord.done_description).toBe(updatePayload.done_description)
    expect(updatedRecord.psychologist_id).toBe(updatePayload.psychologist_id)
    expect(updatedRecord.supervisor_id).toBe(updatePayload.supervisor_id)
    expect(updatedRecord.appointment_date).toBe(updatePayload.appointment_date)
    expect(updatedRecord.duration).toBe(updatePayload.duration)
    expect(updatedRecord.done).toBe(updatePayload.done)
    expect(updatedRecord.psychologist_done).toBe(updatePayload.psychologist_done)
    expect(updatedRecord.supervisor_done).toBe(updatePayload.supervisor_done)
    expect(updatedRecord.done_description).toBe(updatePayload.done_description)
    expect(updatedRecord.done_date).toBe(updatePayload.done_date)
    expect(updatedRecord.verified).toBe(updatePayload.verified)
    expect(updatedRecord.verified_by).toBe(admin.name)
  })

  it("Should not be able to update a Record when appointment_id is null", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    await expect(
      recordService.update(
        updatePayload,
        "",
        admin.id!
      )
    ).rejects.toEqual(new AppError("Something went wrong"))
  })

  it("Should not be able to update a Record that don't exists", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    await expect(
      recordService.update(
        updatePayload,
        "1234",
        admin.id!
      )
    ).rejects.toEqual(new AppError("Record not found"))
  })

  it("Should not be able to update a Record using a psychologist that doesn't exists", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    updatePayload.psychologist_id = '1234'

    await expect(
      recordService.update(
        updatePayload,
        record.id!,
        admin.id!
      )
    ).rejects.toEqual(new AppError("User don't exist"))
  })

  it("Should not be able to update a Record using a supervisor that doesn't exists", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    updatePayload.supervisor_id = '1234'

    await expect(
      recordService.update(
        updatePayload,
        record.id!,
        admin.id!
      )
    ).rejects.toEqual(new AppError("User don't exist"))
  })

  it("Should not be able to update a Record using a userLogged that doesn't exists", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    await expect(
      recordService.update(
        updatePayload,
        record.id!,
        '1234'
      )
    ).rejects.toEqual(new AppError("User don't exist"))
  })

  it("Should not be able to update a Record when you are not an Admin, neither the psychologist or the supervisor", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    admin.access_level = 0

    await expect(
      recordService.update(
        updatePayload,
        record.id!,
        admin.id!
      )
    ).rejects.toEqual(new AppError("You cannot perform this action"))
  })
})