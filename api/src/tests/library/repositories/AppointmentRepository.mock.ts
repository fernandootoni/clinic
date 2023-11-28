import { IAppointmentDTO } from "../../../common/dtos/IAppointmentDTO";
import { IAppointmentRepository } from "../../../common/interface/repositories/IAppointmentRepository";
import { Appointment } from "../../../library/entities/Appointment";

class AppointmentRepositoryMock implements IAppointmentRepository {
  appointments: Appointment[] = []

  async create(appointment: IAppointmentDTO): Promise<Appointment> {
    const newAppointment = new Appointment()
    Object.assign(newAppointment, appointment)

    this.appointments.push(newAppointment)

    return newAppointment
  }

  async findById(id: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appointment => appointment.id === id)
    if(!appointment) {
      return
    }

    return appointment
  }

  async list(): Promise<Appointment[] | undefined> {
    return this.appointments
  }

  async listEnable(): Promise<Appointment[]> {
    const enabledAppointments = this.appointments.filter(appointment => appointment.enabled)

    return enabledAppointments
  }

  async listByPatient(id: string): Promise<Appointment[]> {
    const appointmentsByPatient = this.appointments
      .filter(appointment => {
        return (
          appointment.patient_id === id &&
          appointment.enabled === true
        )
      })

    return appointmentsByPatient
  }

  async listByPsychologist(id: string): Promise<Appointment[]> {
    const appointmentsByPsychologist = this.appointments
      .filter(appointment => {
        return ( 
          appointment.psychologist_id === id &&
          appointment.enabled === true
        )
      })

    return appointmentsByPsychologist
  }

  async listBySupervisor(id: string): Promise<Appointment[]> {
    const appointmentsBySupervisor = this.appointments
      .filter(appointment => {
        return (
          appointment.supervisor_id === id &&
          appointment.enabled === true
        )
      })

    return appointmentsBySupervisor
  }

  async listByUser(id: string): Promise<Appointment[]> {
    const appointmentsByUser = this.appointments
      .filter(appointment => {
        return (
          (
            appointment.supervisor_id === id ||
            appointment.psychologist_id === id 
          ) &&
          appointment.enabled === true
        )
      })

    return appointmentsByUser
  }

  async listByDay(id: string, day: string): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.day === day &&
        (
          appointment.supervisor_id === id || 
          appointment.psychologist_id === id || 
          appointment.patient_id === id
        )
      )
    }) 

    return appointments
  }

  async toggleEnable(id: string): Promise<void> {
    const appointment = this.appointments.find(appointment => appointment.id === id)
    if(!appointment) {
      return
    }

    appointment.enabled = !appointment.enabled
  }
}

export { AppointmentRepositoryMock }