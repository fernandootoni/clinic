import { Repository, SelectQueryBuilder, getManager, getRepository } from "typeorm";
import { IAppointmentDTO } from "../../common/dtos/IAppointmentDTO";
import { Appointment } from "../entities/Appointment";
import { IAppointmentRepository } from "../../common/interface/repositories/IAppointmentRepository";
import { AppError } from "../../config/errors/AppError";

class AppointmentRepository implements IAppointmentRepository {
  private repository: Repository<Appointment>

  constructor() {
    this.repository = getRepository(Appointment)
  }

  async create(appointment: IAppointmentDTO): Promise<Appointment> {
    const newAppointment = this.repository.create(appointment)

    return await this.repository.save(newAppointment)
  }

  async findById(id: string): Promise<Appointment | undefined> {
    const appointment = this.repository.findOne(id)
    if(!appointment)
      return undefined

    return appointment
  }

  async list(): Promise<Appointment[] | undefined> {
    const appointments = await this.repository.find()

    return appointments
  }

  async listEnable(): Promise<Appointment[]> {
    const enabledAppointments = await this.repository.find({ enabled: true, repeats: true })

    return enabledAppointments
  }

  async toggleEnable(id: string): Promise<void> {
    const appointment = await this.repository.findOne(id)
    if(!appointment)
      throw new AppError("Appointment not found")

    appointment.enabled = !appointment.enabled

    await this.repository.save(appointment)
  }

  async listByPatient(id: string): Promise<Appointment[]> {
    const appointments = await this.repository.find({ patient_id: id })
    if(!appointments)
      throw new AppError("Patient's appointment not found not")

    return appointments
  }

  async listByPsychologist(id: string): Promise<Appointment[]> {
    const appointments = await this.repository.find({ psychologist_id: id, enabled: true })
    if(!appointments)
      throw new AppError("Psychologist's appointment not found not")

    return appointments
  }

  async listBySupervisor(id: string): Promise<Appointment[]> {
    const appointments = await this.repository.find({ supervisor_id: id, enabled: true })
    
    if(!appointments)
      throw new AppError("Supervisor's appointment not found not")

    return appointments
  }

  async listByUser(id: string): Promise<Appointment[]> {
    const queryBuilder: SelectQueryBuilder<Appointment> = 
      getManager().createQueryBuilder(Appointment, "appointments")

    queryBuilder.where("(appointments.supervisor_id = :id OR appointments.psychologist_id = :id) AND appointments.enabled = :enabled", { id, enabled: true })

    const appointments = await queryBuilder.getMany()

    return appointments
  }

  async listByDay(id: string, day: string): Promise<Appointment[]> {
    const queryBuilder: SelectQueryBuilder<Appointment> = 
      getManager().createQueryBuilder(Appointment, "appointments")

    queryBuilder.where("(appointments.supervisor_id = :id OR appointments.psychologist_id = :id OR appointments.patient_id = :id) AND appointments.day = :day AND appointments.enabled = :enabled", { id, day, enabled: true })

    const appointments = await queryBuilder.getMany()

    return appointments
  }
}

export { AppointmentRepository }