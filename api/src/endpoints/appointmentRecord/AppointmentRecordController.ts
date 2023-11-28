import "reflect-metadata"
import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppointmentRecordService } from "../../library/services/AppointmentRecordService";

class AppointmentRecordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.params
    const { userLoggedId } = request.body
    const { appointment } = request.body

    const appointmentRecordService = container.resolve(AppointmentRecordService)

    const appointmentRecord = await appointmentRecordService.create(
      appointment_id,
      userLoggedId,
      appointment
    )
    
    return response.status(201).json(appointmentRecord)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { record_id } = request.params
    const { appointment } = request.body
    const { userLoggedId } = request.body

    const appointmentRecordService = container.resolve(AppointmentRecordService)

    const appointmentRecord = await appointmentRecordService.update(appointment, record_id, userLoggedId)

    return response.status(200).json(appointmentRecord)
  }

  async getMonthRecord(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params
    const { month, year, userLoggedId } = request.body

    const appointmentRecordService = container.resolve(AppointmentRecordService)

    const { 
      psyRecords,
      supRecords,
      salaryAsPsy,
      salaryAsSup 
    } = await appointmentRecordService.getMonthRecord(
      month, year, user_id, userLoggedId
    )

    return response.status(200).json({
      psyRecords,
      supRecords,
      salaryAsPsy,
      salaryAsSup 
    })
  }

  async listUnverified(request: Request, response: Response): Promise<Response> {
    const appointmentRecordService = container.resolve(AppointmentRecordService)

    const appointmentsUnverified = await appointmentRecordService.listUnverified()

    return response.status(200).json(appointmentsUnverified)
  }
  
  async verify(request: Request, response: Response): Promise<Response> {
    const { record_id } = request.params
    const { userLoggedId } = request.body

    const appointmentRecordService = container.resolve(AppointmentRecordService)

    const appointmentRecord = await appointmentRecordService.verify(record_id, userLoggedId)

    return response.status(200).json(appointmentRecord)
  }

  async listOne(request: Request, response: Response): Promise<Response> {
    const { record_id } = request.params

    const appointmentRecordService = container.resolve(AppointmentRecordService)

    const appointmentRecord = await appointmentRecordService.listOne(record_id)

    return response.status(200).json(appointmentRecord)
  }

  async listVerified(request: Request, response: Response): Promise<Response> {

    return response.status(200)
  }

  async listUnverifiedByUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const appointmentRecordService = container.resolve(AppointmentRecordService)

    const appointmentsUnverified = await appointmentRecordService.listUnverifiedByUser(id)

    return response.status(200).json(appointmentsUnverified)
  }
}

export { AppointmentRecordController }