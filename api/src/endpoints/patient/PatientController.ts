import { Request, Response } from "express";
import "reflect-metadata"
import { container } from "tsyringe";
import { PatientService } from "../../library/services/PatientService";

class PatientController {
  async create(request: Request, response: Response): Promise<Response> {
    const { patient } = request.body

    const patientService = container.resolve(PatientService)

    await patientService.create(patient)

    return response.status(201).json()
  }

  async list(request: Request, response: Response): Promise<Response> {
    const patientService = container.resolve(PatientService)

    const allPatients = await patientService.list()

    return response.status(200).json(allPatients)
  }

  async listPatient(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const patientService = container.resolve(PatientService)

    const patient = await patientService.listPatient(id)

    return response.status(200).json(patient)
  }

  async getEnabled(request: Request, response: Response): Promise<Response> {
    const patientService = container.resolve(PatientService)

    const patientsEnabled = await patientService.listEnabled()

    return response.status(200).json(patientsEnabled)
  }

  async toggleEnabled(request: Request, response: Response): Promise<Response> {
    const { id: patientId } = request.params

    const patientService = container.resolve(PatientService)

    await patientService.toggleEnable(patientId)

    return response.status(200).json()
  }
}

export { PatientController }