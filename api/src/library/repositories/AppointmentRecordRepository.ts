import { IsNull, Repository, SelectQueryBuilder, getManager, getRepository } from "typeorm";
import { AppointmentRecord } from "../entities/AppointmentRecord";
import { IAppointmentRecordDTO } from "../../common/dtos/IAppointmentRecordDTO";
import { IAppointmentRecordRepository } from "../../common/interface/repositories/IAppointmentRecordRepository";
import { AppError } from "../../config/errors/AppError";
import { User } from "../entities/User";

class AppointmentRecordRepository implements IAppointmentRecordRepository {
  private repository: Repository<AppointmentRecord>

  constructor() {
    this.repository = getRepository(AppointmentRecord)
  }

  async create(record: IAppointmentRecordDTO): Promise<AppointmentRecord> {
    const { userRole, appointment_date, appointment_id } = record
    const appointmentRecord = this.repository.create(record)

    if (userRole === 'admin') {
      appointmentRecord.psychologist_done = true
      appointmentRecord.supervisor_done = true
    } else if (userRole === 'psychologist') {
      appointmentRecord.psychologist_done = true
    } else if (userRole === 'supervisor') {
      appointmentRecord.supervisor_done = true
    }

    const alreadyExists = await this.repository.findOne({ appointment_date, appointment_id })
    if (alreadyExists) {
      if (!appointmentRecord.psychologist_done) {
        appointmentRecord.psychologist_done = alreadyExists.psychologist_done
      }
      if (!appointmentRecord.supervisor_done) {
        appointmentRecord.supervisor_done = alreadyExists.supervisor_done
      }

      if (
        alreadyExists.psychologist_done === appointmentRecord.psychologist_done && 
        alreadyExists.supervisor_done === appointmentRecord.supervisor_done
      ) {
        throw new AppError("Nothing to be changed in this Record")
      }

      alreadyExists.psychologist_done = appointmentRecord.psychologist_done
      alreadyExists.supervisor_done = appointmentRecord.supervisor_done
      alreadyExists.verified = false
      alreadyExists.verified_by = ''

      const updatedAppointment = await this.repository.save(alreadyExists)

      return updatedAppointment
    }

    const newAppointmentRecord = await this.repository.save(appointmentRecord)

    return newAppointmentRecord
  }

  async update(appointmentUpdate: AppointmentRecord): Promise<AppointmentRecord> {
    const appointmentUpdated = await this.repository.save(appointmentUpdate)

    return appointmentUpdated
  }

  async findById(id: string): Promise<AppointmentRecord> {
    const record = await this.repository.findOne(id)
    if (!record)
      throw new AppError("Record not found")

    return record
  }

  async listUnverified(): Promise<AppointmentRecord[]> {
    const appointmentsUnverified = await this.repository.find({ verified: false })

    return appointmentsUnverified
  }

  async listUnverifiedByUser(id: string): Promise<{
    appointmentsUnverifiedAsPsy: AppointmentRecord[],
    appointmentsUnverifiedAsSup: AppointmentRecord[]
  }> {
    const [appointmentsUnverifiedAsPsy, appointmentsUnverifiedAsSup] = await Promise.all([
      this.repository.find({ verified: false, psychologist_id: id, psychologist_done: true }),
      this.repository.find({ verified: false, supervisor_id: id, supervisor_done: true })
    ]);

    return {
      appointmentsUnverifiedAsPsy,
      appointmentsUnverifiedAsSup
    };
  }

  async verify(record: AppointmentRecord, admin: User): Promise<AppointmentRecord> {
    record.verified = true
    record.verified_by = admin.name
    record.verified_date = new Date()

    const timeAtBrazilZone = record.verified_date.getTime() - 3 * 60 * 60 * 1000
    record.verified_date.setTime(timeAtBrazilZone)

    const verifiedRecord = await this.repository.save(record)

    return verifiedRecord
  }

  async listMonthRecordAsPsychologist(month: number, year: number, id: string): Promise<AppointmentRecord[]> {
    const queryBuilder: SelectQueryBuilder<AppointmentRecord> =
      getManager().createQueryBuilder(AppointmentRecord, "appointment_records")

    queryBuilder.where("EXTRACT(MONTH FROM appointment_records.appointment_date) = :month", { month })
    queryBuilder.andWhere("EXTRACT(YEAR FROM appointment_records.appointment_date) = :year", { year })
    queryBuilder.andWhere("appointment_records.psychologist_id = :id", { id })
    queryBuilder.andWhere("appointment_records.verified = :verified", { verified: true })
    queryBuilder.andWhere("appointment_records.psychologist_done = :done", { done: true })
    queryBuilder.andWhere("appointment_records.done_description != :done_description", { done_description: 'Psychologist canceled' })

    const monthRecords = await queryBuilder.getMany()

    return monthRecords
  }

  async listMonthRecordAsSupervisor(month: number, year: number, id: string): Promise<AppointmentRecord[]> {
    const queryBuilder: SelectQueryBuilder<AppointmentRecord> =
      getManager().createQueryBuilder(AppointmentRecord, "appointment_records")

    queryBuilder.where("EXTRACT(MONTH FROM appointment_records.appointment_date) = :month", { month })
    queryBuilder.andWhere("EXTRACT(YEAR FROM appointment_records.appointment_date) = :year", { year })
    queryBuilder.andWhere("appointment_records.supervisor_id = :id", { id })
    queryBuilder.andWhere("appointment_records.verified = :verified", { verified: true })
    queryBuilder.andWhere("appointment_records.supervisor_done = :done", { done: true })
    queryBuilder.andWhere("appointment_records.done_description != :done_description", { done_description: 'Psychologist canceled' })

    const monthRecords = await queryBuilder.getMany()

    return monthRecords
  }
}

export { AppointmentRecordRepository }