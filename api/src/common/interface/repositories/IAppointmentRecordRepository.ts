import { AppointmentRecord } from "../../../library/entities/AppointmentRecord"
import { User } from "../../../library/entities/User"
import { IAppointmentRecordDTO } from "../../dtos/IAppointmentRecordDTO"

interface IAppointmentRecordRepository {
  create(record: IAppointmentRecordDTO): Promise<AppointmentRecord>
  update(appointmentUpdate: AppointmentRecord): Promise<AppointmentRecord>
  findById(id: string): Promise<AppointmentRecord>
  listUnverified(): Promise<AppointmentRecord[]>
  listUnverifiedByUser(id: string): Promise<{ appointmentsUnverifiedAsPsy: AppointmentRecord[], appointmentsUnverifiedAsSup: AppointmentRecord[]}>
  verify(record: AppointmentRecord, admin: User): Promise<AppointmentRecord>
  listMonthRecordAsPsychologist(month: number, year: number, id: string): Promise<AppointmentRecord[]>
  listMonthRecordAsSupervisor(month: number, year: number, id: string): Promise<AppointmentRecord[]>
}

export { IAppointmentRecordRepository }