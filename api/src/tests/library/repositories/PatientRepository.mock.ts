import { isArrayTypeNode } from "typescript";
import { IPatientDTO } from "../../../common/dtos/IPatientDTO";
import { IPatientRepository } from "../../../common/interface/repositories/IPatientRepository";
import { AppError } from "../../../config/errors/AppError";
import { Patient } from "../../../library/entities/Patient";

class PatientRepositoryMock implements IPatientRepository {
  patients: Patient[] = []
  
  async create(patient: IPatientDTO): Promise<void> {
    const newPatient = new Patient()
    Object.assign(newPatient, patient)

    this.patients.push(newPatient)
  }

  async list(): Promise<Patient[]> {
    return this.patients
  }

  async listEnabled(): Promise<Patient[]> {
    return this.patients.filter(patient => patient.enabled)
  }

  async findByPhone(phone: string): Promise<Patient | undefined> {
    const patient = this.patients.find(patient => patient.phone === phone)
    if(!patient) {
      return undefined
    }

    return patient
  }

  async findById(id: string): Promise<Patient> {
    const patient = this.patients.find(patient => patient.id === id)
    if(!patient) {
      throw new AppError("Patient don't exist")
    }

    return patient
  }

  async toggleEnable(id: string): Promise<void> {
    const patient = this.patients.find(patient => patient.enabled)
    if(!patient) {
      throw new AppError("Patient don't exist")
    }

    patient.enabled ? patient.disable_date = new Date() : undefined 
    patient.enabled = !patient.enabled
  }
}

export { PatientRepositoryMock }