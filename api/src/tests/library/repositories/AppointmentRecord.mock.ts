import { IAppointmentRecordDTO } from "../../../common/dtos/IAppointmentRecordDTO";
import { IAppointmentRecordRepository } from "../../../common/interface/repositories/IAppointmentRecordRepository";
import { AppError } from "../../../config/errors/AppError";
import { AppointmentRecord } from "../../../library/entities/AppointmentRecord";
import { User } from "../../../library/entities/User";

class AppointmentRecordRepositoryMock implements IAppointmentRecordRepository {
  appointmentsRecord: AppointmentRecord[] = []

  async create(record: IAppointmentRecordDTO): Promise<AppointmentRecord> {
    const { userRole, appointment_date, appointment_id } = record
    const appointmentRecord = new AppointmentRecord()
    Object.assign(appointmentRecord, record)

    if (userRole === 'admin') {
      appointmentRecord.psychologist_done = true
      appointmentRecord.supervisor_done = true
    } else if (userRole === 'psychologist') {
      appointmentRecord.psychologist_done = true
    } else if (userRole === 'supervisor') {
      appointmentRecord.supervisor_done = true
    }

    const alreadyExists = this.appointmentsRecord.find(record => {
      return (
        record.appointment_date?.toISOString() === appointment_date?.toISOString() && 
        record.appointment_id === appointment_id
      )
    })

    if(alreadyExists) {
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

      return alreadyExists
    }

    this.appointmentsRecord.push(appointmentRecord)

    return appointmentRecord
  }

  async update(appointmentUpdate: AppointmentRecord): Promise<AppointmentRecord> {
    return appointmentUpdate
  }

  async findById(id: string): Promise<AppointmentRecord> {
    const record = this.appointmentsRecord.find(record => record.id === id)
    if(!record) {
      throw new AppError("Record not found")
    }
    return record
  }
  
  async listUnverified(): Promise<AppointmentRecord[]> {
    const unverified = this.appointmentsRecord
      .filter(record => {
        return (
          record.verified === false
        )
      })

    return unverified
  }
  async listUnverifiedByUser(id: string): Promise<{ appointmentsUnverifiedAsPsy: AppointmentRecord[]; appointmentsUnverifiedAsSup: AppointmentRecord[]; }> {
    const appointmentsUnverifiedAsPsy = this.appointmentsRecord
      .filter(record => {
        return (
          record.verified === false &&
          record.psychologist_id === id
        )
      }
    )

    const appointmentsUnverifiedAsSup = this.appointmentsRecord
      .filter(record => {
        return (
          record.verified === false &&
          record.supervisor_id === id
        )
      }
    ) 

    return {
      appointmentsUnverifiedAsPsy,
      appointmentsUnverifiedAsSup
    }
  }
  async verify(record: AppointmentRecord, admin: User): Promise<AppointmentRecord> {
    record.verified = true
    record.verified_by = admin.name
    record.verified_date = new Date()

    const timeAtBrazilZone = record.verified_date.getTime() - 3 * 60 * 60 * 1000
    record.verified_date.setTime(timeAtBrazilZone)

    return record
  }
  async listMonthRecordAsPsychologist(month: number, year: number, id: string): Promise<AppointmentRecord[]> {
    const monthRecord = this.appointmentsRecord
      .filter(record => {
        return (
          record.verified === true &&
          record.psychologist_id === id &&
          record.appointment_date!.getMonth() === month &&
          record.appointment_date!.getFullYear() === year
        )
      }
    )

    return monthRecord
  }
  async listMonthRecordAsSupervisor(month: number, year: number, id: string): Promise<AppointmentRecord[]> {
    const monthRecord = this.appointmentsRecord
      .filter(record => {
        return (
          record.verified === true &&
          record.supervisor_id === id &&
          record.appointment_date!.getMonth() === month &&
          record.appointment_date!.getFullYear() === year
        )
      }
    )

    return monthRecord
  }
}

export { AppointmentRecordRepositoryMock }