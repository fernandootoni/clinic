import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IAppointmentDTO } from "../../common/dtos/IAppointmentDTO";
import { IAppointmentRepository } from "../../common/interface/repositories/IAppointmentRepository";
import { IUsersRepository } from "../../common/interface/repositories/IUsersRepository";
import { IPatientRepository } from "../../common/interface/repositories/IPatientRepository";
import { AppError } from "../../config/errors/AppError";
import { DateProvider } from "../helper/DateProvider";
import { Appointment } from "../entities/Appointment";

@injectable()
class AppointmentService {
  private dateProvider: DateProvider

  constructor(
    @inject("AppointmentRepository")
    private appointmentRepository: IAppointmentRepository,
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository,
    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ) {
    this.dateProvider = new DateProvider()
  }

  async create(appointment: IAppointmentDTO): Promise<Appointment> {
    const { psychologist_id, supervisor_id, patient_id } = appointment
    if(!psychologist_id || !supervisor_id || !patient_id)
      throw new AppError("ID not found")

    const [ patient, psychologist, supervisor ] = await Promise.all([
      this.patientRepository.findById(patient_id),
      this.usersRepository.findById(psychologist_id),
      this.usersRepository.findById(supervisor_id)
    ])
    
    if(!patient || !supervisor || !psychologist) throw new AppError("ID provided was not correct")

    appointment.psychologist_name = psychologist.name
    appointment.supervisor_name = supervisor.name
    appointment.patient_name = patient.name
    appointment.minute = appointment.minute || 0

    const [ 
      AllAppointmentsFromPsyAtThisDay, 
      AllAppointmentsFromSupAtThisDay, 
      AllAppointmentsFromPatAtThisDay 
    ] = await Promise.all([
      this.appointmentRepository.listByDay(psychologist_id, appointment.day!),
      this.appointmentRepository.listByDay(supervisor_id, appointment.day!),
      this.appointmentRepository.listByDay(patient_id, appointment.day!)
    ])

    const patientIsAvailable = 
      this.dateProvider.verifyDisponibility(AllAppointmentsFromPatAtThisDay, appointment)
    if(!patientIsAvailable) throw new AppError("Patient is not available at this moment")
    
    const psychologistIsAvailable = 
      this.dateProvider.verifyDisponibility(AllAppointmentsFromPsyAtThisDay, appointment)
    if(!psychologistIsAvailable) throw new AppError("Psychologist is not available at this moment")
    
    const supervisorIsAvailable = 
      this.dateProvider.verifyDisponibility(AllAppointmentsFromSupAtThisDay, appointment)
    if(!supervisorIsAvailable) throw new AppError("Supervisor is not available at this moment")
    
    const appointmentCreated = await this.appointmentRepository.create(appointment)

    return appointmentCreated
  }

  async list() {
    const appointments = this.appointmentRepository.list()

    return appointments
  }

  async listAppointment(id: string) {
    const appointment = this.appointmentRepository.findById(id)

    return appointment
  }

  async listEnable() {
    const enabledAppointments = this.appointmentRepository.listEnable()

    return enabledAppointments
  }

  async toggleEnable(id: string) {
    const appointment = this.appointmentRepository.toggleEnable(id)

    return appointment
  }

  async listByPatient(id: string) {
    const appointmentByPatient = this.appointmentRepository.listByPatient(id)

    return appointmentByPatient
  }

  async listByPsychologist(id: string) {
    const appointmentByPatient = this.appointmentRepository.listByPsychologist(id)

    return appointmentByPatient
  }

  async listBySupervisor(id: string) {
    const appointmentByPatient = this.appointmentRepository.listBySupervisor(id)

    return appointmentByPatient
  }

  async listByUser(id: string) {
    const appointmentByPatient = this.appointmentRepository.listByUser(id)

    return appointmentByPatient
  }
}

export { AppointmentService }