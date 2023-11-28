import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IAppointmentRecordRepository } from "../../common/interface/repositories/IAppointmentRecordRepository";
import { IUsersRepository } from "../../common/interface/repositories/IUsersRepository";
import { IAppointmentRepository } from "../../common/interface/repositories/IAppointmentRepository";
import { AppError } from "../../config/errors/AppError";
import { DateProvider } from "../helper/DateProvider";
import { AppointmentRecord } from "../entities/AppointmentRecord";
import { Token } from "../helper/Token";
import { Income } from "../helper/Income";
import { UpdateAppointmentRecordDTO } from "../../common/dtos/appointmentRecord/UpdateAppointmentRecordDTO";
import { CreateAppointmentDTO } from "../../common/dtos/appointmentRecord/CreateAppointmentRecordDTO";
import { RecordHelper } from "../helper/RecordHelper";

@injectable()
class AppointmentRecordService {
  private income: Income
  private dateProvider: DateProvider
  private recordHelper: RecordHelper

  constructor(
    @inject("AppointmentRecordRepository")
    private appointmentRecordRepository: IAppointmentRecordRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("AppointmentRepository")
    private appointmentRepository: IAppointmentRepository
  ) {
    this.income = new Income()
    this.dateProvider = new DateProvider()
    this.recordHelper = new RecordHelper()
  }

  async create(appointment_id: string, userLoggedId: string, appointmentToBeCreated: CreateAppointmentDTO): Promise<AppointmentRecord> {
    let { supervisor_id, psychologist_id, duration, done, done_description } = appointmentToBeCreated
    if(!appointment_id) throw new AppError("Appointment ID is missing")

    const appointment = await this.appointmentRepository.findById(appointment_id)
    if(!appointment) throw new AppError("Appointment not found")
      
    done_description = this.recordHelper.defineDescription(done_description!)
    done = this.recordHelper.defineDone(done_description)

    psychologist_id = psychologist_id || appointment.psychologist_id!
    supervisor_id = supervisor_id || appointment.supervisor_id!
    duration = duration || appointment.duration

    const [ psychologist, supervisor, userLogged ] = await Promise.all([
      this.usersRepository.findById(psychologist_id),
      this.usersRepository.findById(supervisor_id),
      this.usersRepository.findById(userLoggedId)
    ])
    if(!psychologist || !supervisor || !userLogged) throw new AppError("User not found")

    const doneDateInTimeZone = this.dateProvider.formatToTimeZone(new Date())
    const appointmentDateFormatted = this.dateProvider.SelectedDayOfCurrentWeek(new Date(), appointment.day!)
    const userRole = this.recordHelper.defineRole(userLogged, psychologist.id!, supervisor.id!)

    const appointmentRecord = {
      appointment_id: appointment.id,
      patient_id: appointment.patient_id,
      psychologist_id,
      supervisor_id,
      patient_name: appointment.patient_name,
      psychologist_name: psychologist.name,
      supervisor_name: supervisor.name,
      appointment_date: appointmentDateFormatted,
      duration,
      done,
      userRole,
      done_description,
      done_date: doneDateInTimeZone
    }

    const appointmentRecordCreated = await this.appointmentRecordRepository.create(appointmentRecord)

    return appointmentRecordCreated
  }

  async update(updatePayload: UpdateAppointmentRecordDTO, record_id: string, userLoggedId: string) {
    if(!record_id) throw new AppError("Something went wrong")
    let { 
      psychologist_id, supervisor_id, appointment_date, duration, done, psychologist_done, 
      supervisor_done, done_description, done_date, verified, verified_by, verified_date
    } = updatePayload
    
    const record = await this.appointmentRecordRepository.findById(record_id)
    if(!record) throw new AppError("Record don't exist")
    
    psychologist_id = psychologist_id || record.psychologist_id!
    supervisor_id = supervisor_id || record.supervisor_id!

    const [ psychologist, supervisor, userLogged ] = await Promise.all([
      this.usersRepository.findById(psychologist_id),
      this.usersRepository.findById(supervisor_id),
      this.usersRepository.findById(userLoggedId)
    ])
    if(!psychologist || !supervisor || !userLogged) throw new AppError("User not found")
    if(userLogged.access_level! < 2) throw new AppError("You cannot perform this action")

    duration = duration || record.duration!
    done === undefined ? done = record.done : done
    psychologist_done === undefined ? psychologist_done = record.psychologist_done : psychologist_done
    supervisor_done === undefined ? supervisor_done = record.supervisor_done : supervisor_done
    done_description = done_description || record.done_description!
    appointment_date = appointment_date || record.appointment_date!.toISOString()
    done_date = done_date || record.done_date!.toISOString()
    done_description = this.recordHelper.defineDescription(done_description)
    appointment_date = this.dateProvider.validateTimestamp(appointment_date).toISOString()
    done_date = this.dateProvider.validateTimestamp(done_date).toISOString()
    verified_date = new Date().toISOString()
    verified = verified || record.verified!
    verified_by = userLogged.name!

    Object.assign(record, {
      psychologist_id: psychologist.id,
      supervisor_id: supervisor.id,
      psychologist_name: psychologist.name,
      supervisor_name: supervisor.name,
      appointment_date,
      duration,
      done,
      psychologist_done,
      supervisor_done,
      done_description,
      done_date, 
      verified,
      verified_by,
      verified_date
    })

    return await this.appointmentRecordRepository.update(record)
  }

  async getMonthRecord(month: number, year: number, user_id: string, userLoggedId: string) {
    const [user, userLogged] = await Promise.all([
      this.usersRepository.findById(user_id),
      this.usersRepository.findById(userLoggedId),
    ])
    if(!user || !userLogged)
      throw new AppError("Something went wrong")

    if(userLogged.access_level! < 1 && userLogged.id !== user.id) 
      throw new AppError("You cannot access here")

    const [ psyRecords, supRecords ] = await Promise.all([
      this.appointmentRecordRepository.listMonthRecordAsPsychologist(month, year, user_id),
      this.appointmentRecordRepository.listMonthRecordAsSupervisor(month, year, user_id)
    ])

    const salaryAsPsy = this.income.asPsychologist(psyRecords, user.hourlywage!)
    const salaryAsSup = this.income.asSupervisor(supRecords, user.supervisorhourlywage!)

    return {
      psyRecords,
      supRecords,
      salaryAsPsy,
      salaryAsSup
    }
  }

  async listUnverified(): Promise<AppointmentRecord[]> {
    const appointmentsUnverified = await this.appointmentRecordRepository.listUnverified()

    return appointmentsUnverified
  }

  async listUnverifiedByUser(id: string): Promise<{ 
    appointmentsUnverifiedAsPsy: AppointmentRecord[],
    appointmentsUnverifiedAsSup: AppointmentRecord[]
  }> {
    const appointments = await this.appointmentRecordRepository.listUnverifiedByUser(id)
    
    return appointments
  }

  async verify(record_id: string, userLoggedId: string): Promise<AppointmentRecord> {
    const userLogged = await this.usersRepository.findById(userLoggedId)
    if(!userLogged) throw new AppError("User logged not found")
    if(userLogged.access_level! < 2) throw new AppError("You cannot perform this action")

    const record = await this.appointmentRecordRepository.findById(record_id)
    if(record.verified) throw new AppError("Record already verified")
    
    const verified = await this.appointmentRecordRepository.verify(record, userLogged!)

    return verified
  }

  async listOne(record_id: string): Promise<AppointmentRecord> {
    const record = await this.appointmentRecordRepository.findById(record_id)

    return record
  }
}

export { AppointmentRecordService }