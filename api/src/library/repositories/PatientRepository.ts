import { Repository, getRepository } from "typeorm";
import { Patient } from "../entities/Patient";
import { IPatientDTO } from "../../common/dtos/IPatientDTO";
import { IPatientRepository } from "../../common/interface/repositories/IPatientRepository";
import { AppError } from "../../config/errors/AppError";

class PatientRepository implements IPatientRepository {
  private repository: Repository<Patient>

  constructor() {
    this.repository = getRepository(Patient)
  }

  async create({name, responsible, phone}: IPatientDTO): Promise<void> {
    const patient = this.repository.create({
      name,
      responsible,
      phone
    })

    await this.repository.save(patient)
  }

  async list(): Promise<Patient[]> {
    const allPatients = await this.repository.find()

    return allPatients
  }

  async listEnabled() {
    const enabledPatients = await this.repository.find({ enabled: true })

    return enabledPatients
  }

  async findByPhone(phone: string): Promise<Patient | undefined> {
    const patient = await this.repository.findOne({ phone })
    if(!patient) {
      return undefined
    }

    return patient
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.repository.findOne(id)
    if(!patient) {
      throw new AppError("Patient don't exist")
    }

    return patient
  }

  async toggleEnable(id: string): Promise<void> {
    const patient = await this.repository.findOne(id)
    if(!patient)
      throw new AppError("Patient not found")

    patient.enabled ? patient.disable_date = new Date() : undefined 
    patient.enabled = !patient.enabled

    await this.repository.save(patient)
  }
}

export { PatientRepository }