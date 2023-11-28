import { Patient } from "../../../library/entities/Patient"
import { IPatientDTO } from "../../dtos/IPatientDTO"

interface IPatientRepository {
  create({name, responsible}: IPatientDTO): Promise<void>
  list(): Promise<Patient[]>
  listEnabled(): Promise<Patient[]>
  findByPhone(phone: string): Promise<Patient | undefined>
  findById(id: string): Promise<Patient>
  toggleEnable(id: string): Promise<void>
}

export { IPatientRepository }