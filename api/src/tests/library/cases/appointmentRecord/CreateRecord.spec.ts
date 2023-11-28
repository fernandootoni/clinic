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

let appointmentToBeCreated: CreateAppointmentDTO

describe("Create Record", () => {
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
    appointmentToBeCreated = {}
  })

  it("Should be able to create a Record", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    expect(record).toHaveProperty("id")
  })

  it("Should not be able to create a Record when there's nothing to be updated", async () => {
    await recordService.create(
      createdAppointment.id!,
      admin.id!,
      appointmentToBeCreated
    )

    await expect(
      recordService.create(
        createdAppointment.id!,
        admin.id!,
        appointmentToBeCreated
      )
    ).rejects.toEqual(new AppError("Nothing to be changed in this Record"))
  })
  
  // Não pode criar Record que appointment_id não exista
  it("Should not be able to create a Record when appointment_id is missing", async () => {
    await expect(
      recordService.create(
        '',
        admin.id!,
        appointmentToBeCreated
      )
    ).rejects.toEqual(new AppError("Appointment ID is missing"))
  })

  // Não pode criar um Record de um appoinment que não exista
  it("Should not be able to create a Record from a appointment that doesn't exist", async () => {
    await expect(
      recordService.create(
        '1234',
        admin.id!,
        appointmentToBeCreated
      )
    ).rejects.toEqual(new AppError("Appointment not found"))
  })

  // Não pode criar um Record onde o psicologo não exista
  it("Should not be able to create a Record when the psychologist don't exist", async () => {
    appointmentToBeCreated.psychologist_id = "0"
    
    await expect(
      recordService.create(
        createdAppointment.id!,
        admin.id!,
        appointmentToBeCreated
      )
    ).rejects.toEqual(new AppError("User don't exist"))
  })

  // Não pode criar um Record onde o supervisor não exista
  it("Should not be able to create a Record when the psychologist don't exist", async () => {
    appointmentToBeCreated.supervisor_id = "0"
    
    await expect(
      recordService.create(
        createdAppointment.id!,
        admin.id!,
        appointmentToBeCreated
      )
    ).rejects.toEqual(new AppError("User don't exist"))
  })

  // Não pode criar um Record onde o usuario logado não exista
  it("Should not be able to create a Record when the psychologist don't exist", async () => {
    await expect(
      recordService.create(
        createdAppointment.id!,
        '0',
        appointmentToBeCreated
      )
    ).rejects.toEqual(new AppError("User don't exist"))
  })

  // Verificar se os dias que sao criados batem com o dia informado
  it("When creating an appointment Record from a appointment in Sunday, appointment_date must fall on Sunday", async () => {
    const appointment = await appointmentService.create(sundayAppointment)

    const record = await recordService.create(
      appointment.id!,
      admin.id!,
      {}
    )

    const appointmentDateFormat = new Date(record.appointment_date!)
    const day = appointmentDateFormat.getDay()
    
    expect(day).toBe(0)
  })

  it("When creating an appointment Record from a appointment in Monday, appointment_date must fall on Monday", async () => {
    const appointment = await appointmentService.create(mondayAppointment)

    const record = await recordService.create(
      appointment.id!,
      admin.id!,
      {}
    )

    const appointmentDateFormat = new Date(record.appointment_date!)
    const day = appointmentDateFormat.getDay()
    
    expect(day).toBe(1)
  })

  it("When creating an appointment Record from a appointment in Tuesday, appointment_date must fall on Tuesday", async () => {
    const appointment = await appointmentService.create(tuesdayAppointment)

    const record = await recordService.create(
      appointment.id!,
      admin.id!,
      {}
    )

    const appointmentDateFormat = new Date(record.appointment_date!)
    const day = appointmentDateFormat.getDay()
    
    expect(day).toBe(2)
  })

  it("When creating an appointment Record from a appointment in Wednesday, appointment_date must fall on Wednesday", async () => {
    const appointment = await appointmentService.create(wednesdayAppointment)

    const record = await recordService.create(
      appointment.id!,
      admin.id!,
      {}
    )

    const appointmentDateFormat = new Date(record.appointment_date!)
    const day = appointmentDateFormat.getDay()
    
    expect(day).toBe(3)
  })

  it("When creating an appointment Record from a appointment in Thursday, appointment_date must fall on Thursday", async () => {
    const appointment = await appointmentService.create(thursdayAppointment)

    const record = await recordService.create(
      appointment.id!,
      admin.id!,
      {}
    )

    const appointmentDateFormat = new Date(record.appointment_date!)
    const day = appointmentDateFormat.getDay()
    
    expect(day).toBe(4)
  })

  it("When creating an appointment Record from a appointment in Friday, appointment_date must fall on Friday", async () => {
    const appointment = await appointmentService.create(fridayAppointment)

    const record = await recordService.create(
      appointment.id!,
      admin.id!,
      {}
    )

    const appointmentDateFormat = new Date(record.appointment_date!)
    const day = appointmentDateFormat.getDay()
    
    expect(day).toBe(5)
  })

  it("When creating an appointment Record from a appointment in Saturday, appointment_date must fall on Saturday", async () => {
    const appointment = await appointmentService.create(saturdayAppointment)

    const record = await recordService.create(
      appointment.id!,
      admin.id!,
      {}
    )

    const appointmentDateFormat = new Date(record.appointment_date!)
    const day = appointmentDateFormat.getDay()
    
    expect(day).toBe(6)
  })

  it("When admin create a record, psychologist_done and supervisor_done must be true", async () => {
    const record = await recordService.create(
      createdAppointment.id!,
      admin.id!,
      {}
    )

    expect(record.psychologist_done).toBe(true)
    expect(record.supervisor_done).toBe(true)
  })

  // Quando um psicologo cria, psychologist_done === true & supervisor_done === false
  it("When psychologist create a record, psychologist_done must be true while supervisor_done false", async () => {
    //Admin and psychologist is the same user
    admin.access_level = 0
    const psychologistId = createdAppointment.psychologist_id!

    const record = await recordService.create(
      createdAppointment.id!,
      psychologistId,
      {}
    )

    expect(record.psychologist_done).toBe(true)
    expect(record.supervisor_done).toBe(false)
  })

  it("When supervisor create a record, supervisor_done must be true while psychologist_done false", async () => {
    const supervisorId = createdAppointment.supervisor_id!

    const record = await recordService.create(
      createdAppointment.id!,
      supervisorId,
      {}
    )

    expect(record.psychologist_done).toBe(false)
    expect(record.supervisor_done).toBe(true)
  })

  it("When a psychologist create a record that the supervisor already created, supervisor_done and psychologist_done must be true", async () => {
    const psychologistId = createdAppointment.psychologist_id!
    const supervisorId = createdAppointment.supervisor_id!

    await recordService.create(
      createdAppointment.id!,
      supervisorId,
      {}
    )

    const record = await recordService.create(
      createdAppointment.id!,
      psychologistId,
      {}
    )

    expect(record.psychologist_done).toBe(true)
    expect(record.supervisor_done).toBe(true)
  })

  it("When a supervisor create a record that the psychologist already created, supervisor_done and psychologist_done must be true", async () => {
    admin.access_level = 0
    const psychologistId = createdAppointment.psychologist_id!
    const supervisorId = createdAppointment.supervisor_id!

    await recordService.create(
      createdAppointment.id!,
      psychologistId,
      {}
    )

    const record = await recordService.create(
      createdAppointment.id!,
      supervisorId,
      {}
    )

    expect(record.psychologist_done).toBe(true)
    expect(record.supervisor_done).toBe(true)
  })
})