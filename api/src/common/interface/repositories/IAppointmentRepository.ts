import { Appointment } from "../../../library/entities/Appointment";
import { IAppointmentDTO } from "../../dtos/IAppointmentDTO";

interface IAppointmentRepository {
  create(appointment: IAppointmentDTO): Promise<Appointment>
  findById(id: string): Promise<Appointment | undefined>
  list(): Promise<Appointment[] | undefined>
  listEnable(): Promise<Appointment[]>
  listByPatient(id: string): Promise<Appointment[]>
  listByPsychologist(id: string): Promise<Appointment[]>
  listBySupervisor(id: string): Promise<Appointment[]>
  listByUser(id: string): Promise<Appointment[]>
  listByDay(id: string, day: string): Promise<Appointment[]>
  toggleEnable(id: string): Promise<void>
}

export { IAppointmentRepository }