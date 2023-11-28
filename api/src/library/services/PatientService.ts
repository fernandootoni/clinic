import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IPatientDTO } from "../../common/dtos/IPatientDTO";
import { IPatientRepository } from "../../common/interface/repositories/IPatientRepository";
import { Patient } from "../entities/Patient";
import { AppError } from "../../config/errors/AppError";

@injectable()
class PatientService {
  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ) {}

  async create(patient: IPatientDTO) {
    const phoneAlreadyTaken = await this.patientRepository.findByPhone(patient.phone!)
    if(phoneAlreadyTaken) {
      throw new AppError("Phone already taken")
    }
    
    await this.patientRepository.create(patient)
  }

  async list() {
    const allPatients = await this.patientRepository.list()

    return allPatients
  }

  async listPatient(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findById(id)

    return patient
  }

  async listEnabled() {
    const enabledPatients = await this.patientRepository.listEnabled()

    return enabledPatients
  }

  async toggleEnable(id: string): Promise<void> {
    await this.patientRepository.toggleEnable(id)
  }
}

export { PatientService }