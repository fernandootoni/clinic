import "reflect-metadata"

import { Request, Response } from "express"
import { container } from "tsyringe"

import { AppointmentService } from "../../library/services/AppointmentService"

class AppointmentController {
  async create(request: Request, response: Response): Promise<Response> {
    const { appointment } = request.body

    const appointmentService = container.resolve(AppointmentService)

    await appointmentService.create(appointment)

    return response.status(201).json()
  }

  async listAll(request: Request, response: Response): Promise<Response> {
    const appointmentService = container.resolve(AppointmentService)

    const appointments = await appointmentService.list()

    return response.status(200).json(appointments)
  }

  async listAppointment(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const appointmentService = container.resolve(AppointmentService)

    const appointment = await appointmentService.listAppointment(id)

    return response.status(200).json(appointment)
  }

  async listEnable(request: Request, response: Response): Promise<Response> {
    const appointmentService = container.resolve(AppointmentService)

    const enabledAppointments = await appointmentService.listEnable()

    return response.status(200).json(enabledAppointments)
  }

  async listByPatient(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const appointmentService = container.resolve(AppointmentService)

    const appointments = await appointmentService.listByPatient(id)

    return response.status(200).json(appointments)
  }

  async listByPsychologist(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const appointmentService = container.resolve(AppointmentService)

    const appointments = await appointmentService.listByPsychologist(id)

    return response.status(200).json(appointments)
  }

  async listBySupervisor(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const appointmentService = container.resolve(AppointmentService)

    const appointments = await appointmentService.listBySupervisor(id)

    return response.status(200).json(appointments)
  }

  async listByUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const appointmentService = container.resolve(AppointmentService)

    const appointments = await appointmentService.listByUser(id)

    return response.status(200).json(appointments)
  }

  async toggleEnable(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const appointmentService = container.resolve(AppointmentService)

    const appointment = await appointmentService.toggleEnable(id)

    return response.status(200).json(appointment)
  }
}

export { AppointmentController }